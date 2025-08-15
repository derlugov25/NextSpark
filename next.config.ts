import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	eslint: {
		// Игнорировать ошибки линтера при production build (Vercel)
		ignoreDuringBuilds: true,
	},
	typescript: {
		// Не останавливать сборку из-за TypeScript-ошибок (Vercel)
		ignoreBuildErrors: true,
	},
};

export default nextConfig;
