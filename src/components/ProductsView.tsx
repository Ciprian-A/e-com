'use client'
import React from 'react'
import {Category, Clothing, Footwear} from '@/../sanity.types'
import ProductGrid from './ProductGrid'
// import useBasketStore from '@/app/(store)/store'
interface ProductsViewProps {
	products: (Clothing | Footwear)[]
	categories?: Category[]
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
