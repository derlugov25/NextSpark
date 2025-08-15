"use client";

type Props = {
  size?: number; // px
  className?: string;
};

export default function NextSparkVenturesLogo({ size = 120, className = "" }: Props) {
  const s = size;
  const scale = s / 120; // базовый размер 120px

  return (
    <div className={`flex items-center gap-4 ${className}`} style={{ fontSize: `${scale * 16}px` }}>
      {/* Логотип с буквой N */}
      <div className="relative shrink-0" style={{ width: `${s * 0.6}px`, height: `${s}px` }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 72 120"
          aria-label="NextSpark Ventures logo"
        >
          <defs>
            {/* Градиент для стрелки - современный и плавный */}
            <linearGradient id="arrow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="30%" stopColor="#8B5CF6" />
              <stop offset="60%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#C4B5FD" />
            </linearGradient>
            
            {/* Градиент для звездочки */}
            <linearGradient id="star-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E0F2FE" />
            </linearGradient>
            
            {/* Фильтр для свечения */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1" />
            </filter>
          </defs>

          {/* Буква N - простая и чистая */}
          <path
            d="M25 25L25 95L70 25L70 95"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Градиентная полоса поверх N */}
          <path
            d="M22 90L68 30"
            stroke="url(#arrow-grad)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Звездочка справа вверху - маленькая четырехконечная */}
          <g transform="translate(58, 18)">
            {/* Горизонтальная линия звезды */}
            <line
              x1="-3" y1="0" x2="3" y2="0"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Вертикальная линия звезды */}
            <line
              x1="0" y1="-3" x2="0" y2="3"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>

      {/* Текст NextSpark и Ventures */}
      <div className="flex flex-col">
        <span className="text-white tracking-tight" style={{ fontSize: `${scale * 24}px` }}>
          <span className="font-normal">Next</span>
          <span className="font-bold">Spark</span>
        </span>
        <span className="font-normal text-white tracking-wide uppercase" style={{ fontSize: `${scale * 18}px` }}>
          VENTURES
        </span>
      </div>
    </div>
  );
} 