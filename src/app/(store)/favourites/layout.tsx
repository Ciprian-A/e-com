import type {Metadata} from 'next'

export const metadata: Metadata = {
	title: 'Your favourite items',
	description: 'Shoppy E-Commerce app'
}

export default async function FavouritesLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return <>{children}</>
}
