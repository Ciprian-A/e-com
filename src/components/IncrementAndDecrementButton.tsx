'use client'
import React, {useEffect, useState} from 'react'
// import {Footwear, Clothing} from '../../sanity.types'
import useStore from '@/app/(store)/store'

type IncrementAndDecrementButtonProps = {
	productId: string
	// product: (Clothing | Footwear) & {sizeId?: string}
	disabled: boolean
}

const IncrementAndDecrementButton = ({
	productId,
	disabled
	// itemSize
}: IncrementAndDecrementButtonProps) => {
	const {incrementItemCount, decrementItemCount, getItemCount} = useStore()
	// const item = getItem(product, itemSize ?? '')
	const itemCount = getItemCount(productId)
	const [isClient, setIsClient] = useState(false)
	useEffect(() => {
		setIsClient(true)
	}, [])

	if (!isClient) {
		return null
	}
	// console.log({itemCount})
	// console.log('AddToBasketButton>>>>>>>> item, product', {
	// 	item,
	// 	product,
	// 	itemSize
	// })
	return (
		<div className='flex items-center justify-center space-x-2'>
			<button
				onClick={() => decrementItemCount(productId)}
				// onClick={() => decrementItemCount(product, itemSize ?? '')}
				className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${itemCount === 0 ? 'bg-gray-100 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
				disabled={itemCount === 0 || disabled}>
				<span
					className={`text=xl font-bold ${itemCount === 0 ? 'text-gray-400' : 'text-gray-600'}`}>
					-
				</span>
			</button>
			<span className='w-8 text-center font-semibold'>{itemCount}</span>
			<button
				onClick={() => incrementItemCount(productId)}
				// onClick={() => incrementItemCount(product, itemSize ?? '')}
				className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
				disabled={disabled}>
				<span className='text-xl font-bold text-white'>+</span>
			</button>
		</div>
	)
}

export default IncrementAndDecrementButton
