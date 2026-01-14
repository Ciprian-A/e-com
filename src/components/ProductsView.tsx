'use client'
// import { Category, Clothing, Footwear } from '@/../sanity.types'
import { Category, Item, Variant } from '../../generated/prisma/client'
import ProductGrid from './ProductGrid'

interface ProductsViewProps {
	products: Item[]
	categories?: Category[]
	variants?: Variant[]
}
// interface ProductsViewProps {
// 	products: (Clothing | Footwear)[]
// 	categories?: Category[]
// }
export type ItemDb =  {
	items: Item[]
	categories: Category[]
	variants: Variant[]
}
const ProductsView = ({products}: ProductsViewProps) => {
	return (
		<div className='flex flex-col'>
			<div className='flex-1'>
				<div>
					<ProductGrid products={products} />
					<hr className='w-1/12 sm:w3/4' />
				</div>
			</div>
		</div>
	)
}

export default ProductsView
