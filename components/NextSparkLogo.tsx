"use client";

import Image from "next/image";

type Props = {
  size?: number; // px
  label?: string;
};

export default function NextSparkLogo({ size = 32, label = "NextSpark.vc" }: Props) {
  const s = size;

  return (
    <div className="flex items-center gap-1">
      <Image
        src="/photo_2025-08-15_01-02-02.jpg"
        alt="NextSpark Ventures logo"
        width={s}
        height={s}
        className="shrink-0 rounded-lg"
        priority
      />

      <div className="flex flex-col">
        <span className="text-white tracking-tight" style={{ fontSize: `${s * 0.3}px` }}>
          <span className="font-normal">Next</span>
          <span className="font-bold">Spark</span>
        </span>
        <span className="font-normal text-white tracking-wide uppercase" style={{ fontSize: `${s * 0.22}px` }}>
          Ventures
        </span>
      </div>
    </div>
  );
}
