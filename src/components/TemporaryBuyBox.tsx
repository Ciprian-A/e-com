'use client'

import React from 'react'
import AddToBasket from './AddToBasket'
import {Clothing, Footwear} from '../../sanity.types'
import useStore from '@/app/(store)/store'
import QuantitySelector from './QuantitySelector'
import BuyItNow from './BuyItNow'
import AddToFavouritesButton from './AddToFavouritesButton'

interface TemporaryBuyBoxProps {
	product: Footwear | Clothing
}
const TemporaryBuyBox = ({product}: TemporaryBuyBoxProps) => {
	const {getActiveSize} = useStore()
	const isOutOfStock = !product?.sizesAndStock?.some(p => (p?.stock ?? 0) > 0)
	const activeSize = getActiveSize()
	console.log({isOutOfStock, activeSize})
	return (
		<div className='w-[35%] flex flex-col space-y-3 border rounded-md p-3 h-max'>
			{!activeSize ? (
				<>
					<p className='text-base'>
						To buy, select <span className='font-bold'>Size</span>
					</p>
					<AddToBasket product={product} disabled />
				</>
			) : (
				<>
					<p>£ {product?.price}</p>
					<p
						className={`text-xl font-semibold ${isOutOfStock ? 'text-red-500' : 'text-green-600'}`}>
						{isOutOfStock ? 'Out of stock' : 'In stock'}
					</p>
					<QuantitySelector qty={10} />
					<BuyItNow />
					<AddToBasket product={product} />
					<AddToFavouritesButton />
				</>
			)}
		</div>
	)
}

export default TemporaryBuyBox
