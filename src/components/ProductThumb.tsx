import React from 'react'
import {Product} from '../../sanity.types'
import Link from 'next/link'
import Image from 'next/image'
import {imageUrl} from '@/lib/imageUrl'
import {HeartIcon} from '@sanity/icons'

const ProductThumb = ({product}: {product: Product}) => {
	const isOutOfStock = !product?.stock || product?.stock <= 0

	return (
		<Link
			href={`/product/${product?.slug?.current}`}
			className={`group flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${isOutOfStock ? 'opactity-50' : ''}`}>
			<div className='group relative aspect-[4/3] w-full h-full overflow-hidden '>
				{product.image && (
					<div>
						<Image
							className='object-cover '
							src={imageUrl(product.image).url()}
							alt={product.name || 'Product image'}
							fill
							sizes='(max-width: 768px 100vw, (max-width: 1200px) 50vw, 33vw'
						/>
						<HeartIcon className='child w-10 h-10 p-1 absolute top-6 right-2 opacity-0 group-hover:top-2 group-hover:right-2 transition-all group-hover:opacity-100 bg-white shadow hover:shadow-md rounded-full' />
					</div>
				)}
				{isOutOfStock && (
					<div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
						<span className='text-white font-bold text-large'>
							Out of Stock
						</span>
					</div>
				)}
			</div>
			<div className='p-4'>
				<h2 className='text=lg font-semibold text-gray-800 truncate'>
					{product.name}
				</h2>
				<p className='mt-2 text-sm text-gray-600 line-clamp-2'>
					{product.description
						?.map(block =>
							block._type === 'block'
								? block.children?.map(child => child.text).join('')
								: ''
						)
						.join(' ') || 'No description available'}
				</p>
				<p className='mt-2 text=lg font-bold text-gray-900'>
					£{product.price?.toFixed(2)}
				</p>
			</div>
		</Link>
	)
}

export default ProductThumb
