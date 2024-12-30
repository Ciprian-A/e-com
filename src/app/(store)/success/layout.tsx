import type {Metadata} from 'next'

export const metadata: Metadata = {
	title: 'Shoppy - Success',
	description: 'Shoppy E-Commerce app'
}

export default async function SuccessLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return <>{children}</>
}
