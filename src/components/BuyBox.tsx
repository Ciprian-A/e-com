'use client'

import React from 'react'
import AddToBasket from './AddToBasket'
import {Clothing, Footwear} from '../../sanity.types'
import useStore from '@/app/(store)/store'
import QuantitySelector from './QuantitySelector'
import BuyItNow from './BuyItNow'
import AddToFavouritesButton from './AddToFavouritesButton'
import {Separator} from './ui/separator'

interface BuyBoxProps {
	product: Footwear | Clothing
}
const BuyBox = ({product}: BuyBoxProps) => {
	const {getActiveSize} = useStore()
	const isOutOfStock = !product?.sizesAndStock?.some(p => (p?.stock ?? 0) > 0)
	const activeSize = getActiveSize()
	const availableStock = product?.sizesAndStock?.find(
		p => p.size === activeSize
	)
	return (
		<div className='w-[35%] flex flex-col  border rounded-md p-3 max-h-max'>
			{!activeSize ? (
				<>
					<p className='text-base'>
						To buy, select <span className='font-bold'>Size</span>
					</p>
					<AddToBasket product={product} disabled />
				</>
			) : (
				<div className='h-full flex flex-col justify-between'>
					<div>
						<p>£ {product?.price}</p>
						<p
							className={`text-xl font-semibold ${isOutOfStock ? 'text-red-500' : 'text-green-600'}`}>
							{isOutOfStock ? 'Out of stock' : 'In stock'}
						</p>
						{!isOutOfStock && (
							<p className='text-sm text-gray-500 mt-2'>
								The delivery is estimated to take 3-5 working days.
							</p>
						)}
					</div>
					<Separator className='my-4' />

					<div className=' space-y-3 '>
						<QuantitySelector qty={availableStock?.stock ?? 0} />
						<BuyItNow product={product} />
						<AddToBasket product={product} />
						<AddToFavouritesButton />
					</div>
				</div>
			)}
		</div>
	)
}

export default BuyBox
