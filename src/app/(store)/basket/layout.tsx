import type {Metadata} from 'next'

export const metadata: Metadata = {
	title: 'Shoppy - Shopping basket',
	description: 'Shoppy E-Commerce app'
}

export default async function BasketLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return <>{children}</>
}
