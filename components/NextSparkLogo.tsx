"use client";

type Props = {
  size?: number; // px
  label?: string;
};

export default function NextSparkLogo({ size = 32, label = "NextSpark.vc" }: Props) {
  const s = size;

  return (
    <div className="flex items-center gap-3">
      <svg
        width={s}
        height={s}
        viewBox="0 0 100 100"
        aria-label="NextSpark logo"
        className="shrink-0"
      >
        {/* glow */}
        <defs>
          <radialGradient id="ns-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A78BFA" stopOpacity="1" />
            <stop offset="50%" stopColor="#6366F1" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
          </radialGradient>
          <linearGradient id="ns-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        <circle cx="50" cy="50" r="18" fill="url(#ns-grad)" filter="url(#soft)" />

        {/* 8-лучевая искра */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI) / 4; // 0..7
          const x1 = 50 + Math.cos(angle) * 12;
          const y1 = 50 + Math.sin(angle) * 12;
          const x2 = 50 + Math.cos(angle) * 42;
          const y2 = 50 + Math.sin(angle) * 42;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#ns-stroke)"
              strokeWidth="3"
              strokeLinecap="round"
              className="ns-twinkle"
            />
          );
        })}

        {/* маленькие «искры» */}
        {[
          [78, 32],
          [25, 20],
          [18, 72],
          [84, 64],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.2" fill="#A5B4FC" className="ns-twinkle" />
        ))}
      </svg>

      <div className="flex flex-col">
        <span className="text-white tracking-tight" style={{ fontSize: `${s * 0.3}px` }}>
          <span className="font-normal">Next</span>
          <span className="font-bold">Spark</span>
        </span>
        <span className="font-normal text-white tracking-wide uppercase" style={{ fontSize: `${s * 0.22}px` }}>
          Ventures
        </span>
      </div>

      {/* мерцание */}
      <style jsx>{`
        .ns-twinkle {
          animation: nsTwinkle 2.4s ease-in-out infinite;
          animation-delay: calc(var(--i, 0) * 0.15s);
        }
        @keyframes nsTwinkle {
          0%, 100% { opacity: 0.85 }
          50% { opacity: 1 }
        }
      `}</style>
    </div>
  );
}
