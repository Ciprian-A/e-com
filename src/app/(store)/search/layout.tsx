import type {Metadata} from 'next'

export const metadata: Metadata = {
	title: 'Shoppy - Search result',
	description: 'Shoppy E-Commerce app'
}

export default async function SearchLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return <>{children}</>
}
