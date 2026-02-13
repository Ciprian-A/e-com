import ProductsView from '@/components/ProductsView'
import {getItemsByCategory} from '@/lib/items/items'

const CategoryPage = async ({params}: {params: Promise<{slug: string}>}) => {
	const {slug} = await params
	const products = await getItemsByCategory(slug)
	const mappedProducts = products.map(product => ({
		...product,
		createdAt: product.createdAt.toISOString(),
		updatedAt: product.updatedAt.toISOString(),
		productDetails: Array.isArray(product.productDetails)
			? (product.productDetails as {key: string; value: string}[])
			: []
	}))
	return (
		<div className='flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4 w-full'>
			<h1 className='text-2xl font-bold mb-4 self-start'>
				{slug
					.split('-')
					.map(word => word.charAt(0).toUpperCase() + word.slice(1) + ' ')}{' '}
				Collection
			</h1>
			<ProductsView products={mappedProducts} />
		</div>
	)
}

export default CategoryPage
