import React from 'react'

import {StoreItem} from '@/app/(store)/store/storeSlice'
import Image from 'next/image'
import Link from 'next/link'

const ProductThumb = ({
	product
}: {
	product: Omit<StoreItem, 'size' | 'quantity'>
}) => {
	const isOutOfStock = !product?.variants?.some(p => (p?.stock ?? 0) > 0)
	const isFavourite = product.favourite

	const handleFavouriteToggle = (
		e: React.MouseEvent<SVGSVGElement, MouseEvent>
	) => {
		e.preventDefault()
		e.stopPropagation()
	}
	return (
		<Link
			href={`/product/${product?.slug}`}
			className='flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden'>
			<div className='group relative aspect-4/3 w-full h-full overflow-hidden '>
				{product.imageUrl && (
					<div className=''>
						<Image
							className='object-cover '
							src={product.imageUrl}
							alt={product.name || 'Product image'}
							fill
							sizes='(max-width: 768px 100vw, (max-width: 1200px) 50vw, 33vw'
						/>
					</div>
				)}
			</div>
			<div className='p-4'>
				<h2 className='text=lg font-semibold text-gray-800 truncate'>
					{product.name}
				</h2>
				<p className='mt-2 text-sm text-gray-600 line-clamp-2'>
					{(product.description && product.description) ||
						'No description available'}
				</p>
				<p className='mt-2 text=lg font-bold text-gray-900'>
					£{product.price?.toFixed(2)}
				</p>
				{isOutOfStock && <p className='text-red-500'> Out of stock</p>}
			</div>
		</Link>
	)
}

export default ProductThumb
