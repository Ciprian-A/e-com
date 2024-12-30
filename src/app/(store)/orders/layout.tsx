import type {Metadata} from 'next'

export const metadata: Metadata = {
	title: 'Shoppy - Your orders',
	description: 'Shoppy E-Commerce app'
}

export default async function OrdersLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return <>{children}</>
}
