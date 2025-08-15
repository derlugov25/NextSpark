"use client";

import { useEffect, useRef, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import { presimplify, simplify, quantile } from "topojson-simplify";
// @ts-ignore – JSON import
import land110m from "world-atlas/land-110m.json";

type Spot = {
  id: string;
  cx: number; cy: number;
  rx: number; ry: number;
  color: string; opacity: number;
};

export default function WorldMap() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [landD, setLandD] = useState("");
  const [spots, setSpots] = useState<Spot[]>([]);
  const [clipBottom, setClipBottom] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  useEffect(() => {
    const render = () => {
      const svg = svgRef.current!;
      const { width, height } = svg.getBoundingClientRect();

      // --- Projection (zoom + shift up) ---
      const SHIFT_PX = 1;        // сдвиг карты вверх
      const SCALE_FACTOR = 1.3;    // +30% ближе

      // Упрощаем береговую линию → более абстрактные очертания
      const topo = presimplify(land110m as any);
      const thr = quantile(topo as any, 0.90); // 0.90..0.95 — степень сглаживания
      const simple = simplify(topo as any, thr);
      const land = feature(simple as any, (simple as any).objects.land) as GeoJSON.Feature;

      const projection = geoMercator().fitSize([width, height], { type: "Sphere" } as any);
      projection.scale(projection.scale() * SCALE_FACTOR);
      const t = projection.translate();
      projection.translate([t[0], t[1] - SHIFT_PX]);

      const path = geoPath(projection);
      setLandD(path(land) || "");

      // Клип снизу: всё ниже −60° не показываем (Антарктида)
      const ANTARCTIC_CUTOFF = -60;
      const yCut = (projection([0, ANTARCTIC_CUTOFF]) || [0, 0])[1];
      setClipBottom({ x: 0, y: 0, w: width, h: yCut });

      // Регионы (центры «пятен» и их эллипсы)
      const regions = [
        { id: "latam",  latMin: -55, latMax: 33,  lonMin: -120, lonMax: -30,  color: "#60A5FA", opacity: 0.24 },
        { id: "braarg", latMin: -55, latMax: 5,   lonMin:  -75, lonMax:  -35, color: "#A78BFA", opacity: 0.30 },
        { id: "mena",   latMin:  10, latMax: 36,  lonMin:  -10, lonMax:   60, color: "#38BDF8", opacity: 0.42 }, // ярче
        { id: "sea",    latMin: -10, latMax: 20,  lonMin:   95, lonMax:  135, color: "#10B981", opacity: 0.26 },
        // CIS (BY/UA/KZ/UZ/GE/AM/AZ)
        { id: "cis",    latMin:  37, latMax: 55,  lonMin:   25, lonMax:   80, color: "#C084FC", opacity: 0.46 }, // ярче
      ];

      const toXY = (lat: number, lon: number) => {
        const p = projection([lon, lat]) || [0, 0];
        return { x: p[0], y: p[1] };
      };

      // немного увеличим пятна для MENA и CIS
      const BOOST: Record<string, number> = { mena: 1.18, cis: 1.22 };

      setSpots(
        regions.map((r) => {
          const cLat = (r.latMin + r.latMax) / 2;
          const cLon = (r.lonMin + r.lonMax) / 2;
          const { x, y } = toXY(cLat, cLon);
          const p1 = toXY(r.latMin, r.lonMin);
          const p2 = toXY(r.latMax, r.lonMax);
          const baseRx = Math.max(44, Math.abs(p2.x - p1.x) * 0.5);
          const baseRy = Math.max(30, Math.abs(p2.y - p1.y) * 0.5);
          const k = BOOST[r.id] ?? 1;
          return { id: r.id, cx: x, cy: y, rx: baseRx * k, ry: baseRy * k, color: r.color, opacity: r.opacity };
        })
      );
    };

    render();
    const onResize = () => render();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <svg ref={svgRef} className="fixed inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      <defs>
        {/* мягкое размытие линий + плавное исчезновение сверху */}
        <filter id="soft-outline" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.9" />
        </filter>

        <linearGradient id="fade-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="black" stopOpacity="0.00" />
          <stop offset="12%"  stopColor="black" stopOpacity="0.12" />
          <stop offset="28%"  stopColor="white" stopOpacity="1.00" />
          <stop offset="100%" stopColor="white" stopOpacity="1.00" />
        </linearGradient>
        <mask id="fade-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#fade-top)" />
        </mask>

        {/* клип снизу, чтобы убрать Антарктиду */}
        {clipBottom && (
          <clipPath id="clip-bottom">
            <rect x={clipBottom.x} y={clipBottom.y} width={clipBottom.w} height={clipBottom.h} />
          </clipPath>
        )}

        {/* радиальные градиенты для всех «пятен» */}
        {spots.map((s) => (
          <radialGradient id={`spot-${s.id}`} key={`g-${s.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={s.color} stopOpacity={s.opacity} />
            <stop offset="100%" stopColor={s.color} stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>

      {/* контур материков: без резкого среза сверху и без Антарктиды снизу */}
      {landD && clipBottom && (
        <g mask="url(#fade-mask)" clipPath="url(#clip-bottom)">
          <path
            d={landD}
            fill="none"
            stroke="rgba(255,255,255,0.16)"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#soft-outline)"
          />
        </g>
      )}

      {/* мягкие «пятна» интереса */}
      {spots.map((s) => (
        <ellipse key={s.id} cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry} fill={`url(#spot-${s.id})`} />
      ))}
    </svg>
  );
}
