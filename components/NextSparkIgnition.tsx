"use client";

import * as React from "react";

type Props = {
  size?: number;            // размер знака (px)
  withWordmark?: boolean;   // подпись NextSpark VC справа
  animated?: boolean;       // пульс искры + «пробег» градиента
  className?: string;
};

export default function NextSparkIgnition({
  size = 56,
  withWordmark = true,
  animated = true,
  className,
}: Props) {
  return (
    <div className={`flex items-center ${className || ""}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        role="img"
        aria-label="NextSpark monogram"
      >
        <defs>
          <linearGradient id="ns-grad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%"  stopColor="#A78BFA">
              {animated && (
                <animate attributeName="offset" values="0;0.15;0" dur="3s" repeatCount="indefinite" />
              )}
            </stop>
            <stop offset="60%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          <filter id="ns-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="spark-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#38BDF8" />
          </radialGradient>
        </defs>

        {/* Монограмма N */}
        <g stroke="url(#ns-grad)" strokeLinecap="round" filter="url(#ns-glow)">
          <path d="M20 82 L20 18" strokeWidth="10" />
          <path d="M20 18 L80 82" strokeWidth="10" />
          <path d="M80 74 L80 18" strokeWidth="10" />
        </g>

        {/* Искра */}
        <Spark cx={82} cy={16} r={7} animated={animated} />
      </svg>

      {withWordmark && (
        <span
          className="ml-3 font-semibold tracking-tight leading-none select-none"
          style={{
            background: "linear-gradient(90deg,#A78BFA 0%,#818CF8 45%,#38BDF8 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          NextSpark&nbsp;VC
        </span>
      )}
    </div>
  );
}

function Spark({ cx, cy, r, animated }: { cx: number; cy: number; r: number; animated: boolean }) {
  const arms = 8;
  const rays = Array.from({ length: arms }).map((_, i) => {
    const a = (i / arms) * Math.PI * 2;
    const x1 = cx + Math.cos(a) * (r * 0.35);
    const y1 = cy + Math.sin(a) * (r * 0.35);
    const x2 = cx + Math.cos(a) * r;
    const y2 = cy + Math.sin(a) * r;
    return { x1, y1, x2, y2 };
  });

  return (
    <g>
      {/* ядро */}
      <circle cx={cx} cy={cy} r={r * 0.4} fill="url(#spark-grad)">
        {animated && (
          <>
            <animate attributeName="r" values={`${r * 0.36};${r * 0.5};${r * 0.36}`} dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;1;0.9" dur="1.8s" repeatCount="indefinite" />
          </>
        )}
      </circle>

      {/* лучики */}
      <g stroke="url(#ns-grad)" strokeWidth={2}>
        {rays.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}>
            {animated && (
              <animate attributeName="opacity" values="0.95;0.6;0.95" dur="2.2s" begin={`${i * 0.05}s`} repeatCount="indefinite" />
            )}
          </line>
        ))}
      </g>

      {/* внешний ореол */}
      <circle cx={cx} cy={cy} r={r} fill="url(#spark-grad)" opacity="0.22" />
    </g>
  );
}
