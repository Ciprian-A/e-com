import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	experimental: {
		serverActions: {
			bodySizeLimit: '5mb'
		}
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io'
			},
			{
				protocol: 'https',
				hostname: 'eedsamywzhpxhjumxbcp.supabase.co'
			}
		]
	}
}

export default nextConfig
