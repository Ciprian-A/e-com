import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export async function generateMetadata({
	params
}: {
	params: Promise<{slug: string}>
}): Promise<Metadata> {
	const {slug} = await params
	const product = await getProductBySlug(slug)

	return {
		title: `Shoppy - ${product?.name}`,
		description: `Shoppy - Details about ${product?.name}`
	}
}

export default async function ProductLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return <Suspense>{children}</Suspense>
}
