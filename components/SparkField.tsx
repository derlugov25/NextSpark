"use client";

import { useEffect, useRef } from "react";
import { geoMercator } from "d3-geo";

type Particle = { x:number; y:number; vx:number; vy:number; r:number; hue:number; phase:number; };
type Ember    = { x:number; y:number; vx:number; vy:number; r:number; hue:number; lifeMs:number; maxLifeMs:number; };

export default function SparkField() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;

    // Offscreen для шлейфов
    const fx = document.createElement("canvas");
    const fctx = fx.getContext("2d")!;

    let raf = 0, last = performance.now();

    // === CONFIG ===
    const SHIFT_PX = 150;      // тот же, что в WorldMap
    const SCALE_FACTOR = 1.3;  // +30% ближе (тот же, что в WorldMap)

    const HUE_MIN = 240, HUE_MAX = 320;
    const MAX_POINTS = 20;

    // 2-я через 5s, затем до 10 — каждые 3s, потом ещё 10 — по 1s
    const FIRST_SPAWN_DELAYS_MS = [5000,3000,3000,3000,3000,3000,3000,3000,3000];
    const EXTRA_DELAY_AFTER_10_MS = 1000;

    // Рой
    const SPEED_MAX = 1.35;
    const COHESION = 0.015;
    const SEPARATION_DIST = 56;
    const SEPARATION_FORCE = 0.065;
    const JITTER = 0.08;

    const anchor = { x:0, y:0, vx:0, vy:0, tx:0, ty:0, speed:0.85, acc:0.02 };

    // Искры-эмберы
    const EMBER_RATE = 0.05;
    const EMBER_SPD_MIN = 0.45, EMBER_SPD_MAX = 1.5;
    const EMBER_R_MIN = 0.6,  EMBER_R_MAX = 1.2;
    const EMBER_LIFE_MIN = 1000, EMBER_LIFE_MAX = 2000;

    // Затухание шлейфа
    const TRAIL_FADE_ALPHA = 0.12;

    // Регионы спавна (включая CIS и MENA). Для них — повышенный вес.
    const regions = [
      { id:"latam",  latMin:-55, latMax:33,  lonMin:-120, lonMax:-30,  weight:1 },
      { id:"braarg", latMin:-55, latMax:5,   lonMin:-75,  lonMax:-35,  weight:1 },
      { id:"mena",   latMin:10,  latMax:36,  lonMin:-10,  lonMax:60,   weight:2 }, // выделяем чаще
      { id:"sea",    latMin:-10, latMax:20,  lonMin:95,   lonMax:135,  weight:1 },
      { id:"cis",    latMin:37,  latMax:55,  lonMin:25,   lonMax:80,   weight:2 }, // CIS: BY/UA/KZ/UZ/GE/AM/AZ
    ] as const;
    // ==============

    // Проекция совпадает с картой
    let projection = geoMercator();
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth, h = canvas.clientHeight;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      fx.width = Math.floor(w * dpr);
      fx.height = Math.floor(h * dpr);
      fctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      projection = geoMercator().fitSize([w, h], { type: "Sphere" } as any);
      projection.scale(projection.scale() * SCALE_FACTOR);
      const t = projection.translate();
      projection.translate([t[0], t[1] - SHIFT_PX]);
    }
    const onResize = () => resize();
    resize();
    window.addEventListener("resize", onResize);

    const W = () => canvas.clientWidth, H = () => canvas.clientHeight;
    const randHue = () => HUE_MIN + Math.random() * (HUE_MAX - HUE_MIN);

    const project = (lat:number, lon:number) => {
      const p = projection([lon, lat]) || [0,0];
      return { x: p[0], y: p[1] };
    };

    // weighted random region (MENA & CIS чаще)
    function pickRegion() {
      const sum = regions.reduce((s, r) => s + r.weight, 0);
      let r = Math.random() * sum;
      for (const it of regions) {
        r -= it.weight;
        if (r <= 0) return it;
      }
      return regions[0];
    }

    const randomPointIn = (r: typeof regions[number]) => {
      const lat = r.latMin + Math.random() * (r.latMax - r.latMin);
      const lon = r.lonMin + Math.random() * (r.lonMax - r.lonMin);
      return project(lat, lon);
    };

    // ---- state ----
    let particles: Particle[] = [];
    let embers: Ember[] = [];
    let spawnIdx = 0;
    let nextSpawnAt = performance.now() + FIRST_SPAWN_DELAYS_MS[0];

    function newWaypoint() {
      const m = 40;
      anchor.tx = m + Math.random() * Math.max(1, W() - m*2);
      anchor.ty = m + Math.random() * Math.max(1, H() - m*2);
    }
    function moveAnchor() {
      const dx = anchor.tx - anchor.x, dy = anchor.ty - anchor.y;
      anchor.vx += dx * anchor.acc; anchor.vy += dy * anchor.acc;
      const sp = Math.hypot(anchor.vx, anchor.vy);
      if (sp > anchor.speed) { anchor.vx = (anchor.vx/sp)*anchor.speed; anchor.vy = (anchor.vy/sp)*anchor.speed; }
      anchor.x += anchor.vx; anchor.y += anchor.vy;
      if (Math.hypot(dx, dy) < 36) newWaypoint();
    }

    function spawnFirst() {
      const pos = randomPointIn(pickRegion());
      particles = [{ x:pos.x, y:pos.y, vx:0.2, vy:-0.1, r:2.0, hue:randHue(), phase:Math.random()*Math.PI*2 }];
      embers = [];
      anchor.x = pos.x; anchor.y = pos.y; anchor.vx = 0; anchor.vy = 0; newWaypoint();
      spawnIdx = 0;
      nextSpawnAt = performance.now() + FIRST_SPAWN_DELAYS_MS[0];
      fctx.clearRect(0,0,W(),H());
    }

    function scheduleNextSpawn(now:number) {
      const c = particles.length;
      if (c < 10) {
        spawnIdx++;
        nextSpawnAt = now + (FIRST_SPAWN_DELAYS_MS[spawnIdx] ?? 3000);
      } else if (c < MAX_POINTS) {
        nextSpawnAt = now + EXTRA_DELAY_AFTER_10_MS;
      }
    }

    function spawnNext(now:number) {
      if (particles.length >= MAX_POINTS) return;
      const pos = randomPointIn(pickRegion());
      const dx = anchor.x - pos.x, dy = anchor.y - pos.y;
      const dist = Math.hypot(dx, dy) || 1;
      const spd = 0.9 + Math.random()*0.8;

      particles.push({
        x: pos.x, y: pos.y,
        vx: (dx/dist)*spd, vy: (dy/dist)*spd,
        r: 1.2 + Math.random()*1.6,
        hue: randHue(),
        phase: Math.random()*Math.PI*2,
      });
      scheduleNextSpawn(now);
    }

    function limitSpeed(p:Particle, max:number) {
      const s = Math.hypot(p.vx, p.vy);
      if (s > max) { const k = max/(s||1); p.vx*=k; p.vy*=k; }
    }
    function wrap(p:Particle) {
      const w=W(), h=H();
      if (p.x < -12) p.x = w + 12;
      if (p.x > w + 12) p.x = -12;
      if (p.y < -12) p.y = h + 12;
      if (p.y > h + 12) p.y = -12;
    }

    function emitEmbersFrom(p:Particle) {
      if (Math.random() < EMBER_RATE) {
        const cnt = 1 + Math.floor(Math.random()*2);
        for (let i=0;i<cnt;i++){
          const ang = Math.random()*Math.PI*2;
          const spd = EMBER_SPD_MIN + Math.random()*(EMBER_SPD_MAX-EMBER_SPD_MIN);
          embers.push({
            x:p.x, y:p.y,
            vx:Math.cos(ang)*spd, vy:Math.sin(ang)*spd,
            r:EMBER_R_MIN + Math.random()*(EMBER_R_MAX-EMBER_R_MIN),
            hue:p.hue + (Math.random()*10 - 5),
            lifeMs:0,
            maxLifeMs:EMBER_LIFE_MIN + Math.random()*(EMBER_LIFE_MAX-EMBER_LIFE_MIN),
          });
        }
      }
    }

    function updateEmbers(dtMs:number) {
      const drag = 0.985;
      for (let i=embers.length-1;i>=0;i--){
        const e = embers[i];
        e.lifeMs += dtMs;
        e.x += e.vx; e.y += e.vy;
        e.vx *= drag; e.vy *= drag;

        const alpha = Math.max(0, 1 - e.lifeMs/e.maxLifeMs);
        fctx.globalCompositeOperation = "lighter";
        fctx.beginPath();
        fctx.fillStyle = `hsla(${e.hue},95%,72%,${0.5*alpha})`;
        fctx.arc(e.x, e.y, e.r, 0, Math.PI*2);
        fctx.fill();

        fctx.strokeStyle = `hsla(${e.hue},90%,70%,${0.35*alpha})`;
        fctx.lineWidth = 1;
        fctx.beginPath();
        fctx.moveTo(e.x, e.y);
        fctx.lineTo(e.x + e.vx*3, e.y + e.vy*3);
        fctx.stroke();

        if (e.lifeMs >= e.maxLifeMs) embers.splice(i,1);
      }
    }

    function updateSwarm() {
      moveAnchor();

      for (let i=0;i<particles.length;i++){
        const p = particles[i];

        p.vx += (anchor.x - p.x) * COHESION;
        p.vy += (anchor.y - p.y) * COHESION;

        for (let j=i+1;j<particles.length;j++){
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d2 = dx*dx + dy*dy;
          if (d2 > 0 && d2 < SEPARATION_DIST*SEPARATION_DIST){
            const d = Math.sqrt(d2);
            const ux = dx/d, uy = dy/d;
            const force = (SEPARATION_DIST - d)/SEPARATION_DIST;
            p.vx += ux * SEPARATION_FORCE * force;
            p.vy += uy * SEPARATION_FORCE * force;
            q.vx -= ux * SEPARATION_FORCE * force;
            q.vy -= uy * SEPARATION_FORCE * force;
          }
        }

        p.vx += (Math.random()-0.5)*JITTER;
        p.vy += (Math.random()-0.5)*JITTER;

        limitSpeed(p, SPEED_MAX);
        p.x += p.vx; p.y += p.vy;
        wrap(p);

        emitEmbersFrom(p);
      }
    }

    function drawGlow(g:CanvasRenderingContext2D, x:number, y:number, r:number, hue:number, a=0.6){
      g.globalCompositeOperation = "lighter";
      g.beginPath();
      g.fillStyle = `hsla(${hue},95%,72%,${a})`;
      g.arc(x,y,r,0,Math.PI*2);
      g.fill();
    }
    function drawRays(g:CanvasRenderingContext2D, x:number, y:number, rays:number, len:number, hue:number, t:number){
      g.globalCompositeOperation = "lighter";
      g.lineWidth = 1;
      g.strokeStyle = `hsla(${hue},90%,70%,0.35)`;
      for (let i=0;i<rays;i++){
        const a = (i/rays)*Math.PI*2 + 0.7*Math.sin(t*0.001 + i);
        const x2 = x + Math.cos(a)*(len + Math.random()*2);
        const y2 = y + Math.sin(a)*(len + Math.random()*2);
        g.beginPath(); g.moveTo(x,y); g.lineTo(x2,y2); g.stroke();
      }
    }
    function drawSwarm(now:number){
      for (const p of particles){
        const flick = 0.85 + 0.25 * Math.sin(now*0.002 + p.phase);
        drawGlow(fctx, p.x, p.y, p.r * flick, p.hue, 0.6);
        drawRays(fctx, p.x, p.y, 4 + ((p.phase*10)%3), 5 + p.r*1.8, p.hue, now);
      }
    }

    function updateEscape(){
      const tx = W() + 80, ty = -80;
      for (const p of particles){
        const dx = tx - p.x, dy = ty - p.y;
        p.vx += dx*0.0045; p.vy += dy*0.0045;
        limitSpeed(p, SPEED_MAX*2.2);
        p.x += p.vx; p.y += p.vy;
        emitEmbersFrom(p);
      }
      if (particles.every(p => p.x > W()+60 || p.y < -60)) spawnFirst();
    }

    function loop(){
      const now = performance.now();
      const dtMs = now - last; last = now;

      if (particles.length < MAX_POINTS && now >= nextSpawnAt) spawnNext(now);
      if (particles.length >= MAX_POINTS) updateEscape();
      else updateSwarm();

      // вытравливаем прошлый кадр на FX-слое (без затемнения карты)
      fctx.globalCompositeOperation = "destination-out";
      fctx.fillStyle = `rgba(0,0,0,${TRAIL_FADE_ALPHA})`;
      fctx.fillRect(0,0,W(),H());

      drawSwarm(now);
      updateEmbers(dtMs);

      // Собираем кадр на видимый канвас с учётом HiDPI
      const w = W(), h = H();
      ctx.clearRect(0,0,w,h);
      ctx.drawImage(fx, 0, 0, fx.width, fx.height, 0, 0, w, h);

      raf = requestAnimationFrame(loop);
    }

    // старт
    (function start(){ spawnFirst(); raf = requestAnimationFrame(loop); })();

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return <canvas ref={ref} className="fixed inset-0 w-full h-full pointer-events-none" aria-hidden="true" />;
}
