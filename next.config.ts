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
	// Отключаем Vercel branding
	poweredByHeader: false,
	// Дополнительные настройки для отключения внешних элементов
	experimental: {
		// Отключаем автоматические оптимизации Vercel
		optimizePackageImports: [],
	},
	// Заголовки для блокировки внешних элементов
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Frame-Options',
						value: 'DENY'
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff'
					}
				]
			}
		];
	}
};

export default nextConfig;
