import React from 'react'

import useStore from '@/app/(store)/store'
import { StoreItem } from '@/app/(store)/store/storeSlice'
// import { imageUrl } from '@/lib/imageUrl'
// import { updateFavourites } from '@/sanity/lib/client'
import { Heart } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'

const ProductThumb = ({product}: {product: Omit<StoreItem, 'size' | 'quantity'>}) => {
	const {updateFavouriteItem} = useStore()
	const isOutOfStock = !product?.variants?.some(p => (p?.stock ?? 0) > 0)
	const isFavourite = product.favourite
	console.log({product});
	const handleFavouriteToggle = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
		e.preventDefault()
		e.stopPropagation()
		updateFavouriteItem(product.id)
		// updateFavourites(product.id, !product.favourite)
	}
	return (
		<Link
			href={`/product/${product?.slug}`}
			className='group flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden'>
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
						<Heart
							className={`child w-10 h-10 p-1 absolute top-6 right-2 opacity-0 group-hover:top-2 group-hover:right-2 transition-all group-hover:opacity-100 bg-white shadow hover:shadow-md rounded-full ${isFavourite ? 'text-red-500 fill-current' : ''}`}
							onClick={handleFavouriteToggle}
						/>
					</div>
				)}
			</div>
			<div className='p-4'>
				<h2 className='text=lg font-semibold text-gray-800 truncate'>
					{product.name}
				</h2>
				<p className='mt-2 text-sm text-gray-600 line-clamp-2'>
					{product.description &&
						product.description ||
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
