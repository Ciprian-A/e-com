import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
	// webpack: (config, {isServer}) => {
	// 	if (isServer) {
	// 		config.externals.push('./generated/prisma')
	// 	}
	// 	return config
	// },
	experimental: {
		serverActions: {
			bodySizeLimit: '5mb'
		}
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: process.env.NEXT_PUBLIC_SUPABASE_HOSTNAME!
			},
			{
				protocol: 'https',
				hostname: process.env.NEXT_PUBLIC_SHOPPY_HOSTNAME!
			}
		]
	}
}

export default nextConfig
