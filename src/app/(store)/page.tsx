import ProductsView from '@/components/ProductsView'
import PromoBanner from '@/components/PromoBanner'
import { getCategories } from '@/lib/categories/categories'
import { getItems } from '@/lib/items/items'

export const dynamic = 'force-static'
export const revalidate = 60 // revaliate at most every 60 seconds

export default async function Home() {
	const items = await getItems()
	const categories = await getCategories()
	const mappedProducts = items.map(product => ({
		...product,
		productDetails: Array.isArray(product.productDetails)
			? (product.productDetails as {key: string; value: string}[])
			: []
	}))
	console.log(
		`${crypto.randomUUID().slice(0, 5)} >>> Rendered the home page chache with ${items.length} products and ${categories.length} categories`
	)
	return (
		<div className='w-full'>
			<PromoBanner />
			<div className='flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4'>
				<ProductsView products={mappedProducts} />
			</div>
		</div>
	)
}
