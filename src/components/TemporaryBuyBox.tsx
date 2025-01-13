import React from 'react'
import AddToBasket from './AddToBasket'
import {Clothing, Footwear} from '../../sanity.types'

interface TemporaryBuyBoxProps {
	product: Footwear | Clothing
}
const TemporaryBuyBox = ({product}: TemporaryBuyBoxProps) => {
	return (
		<div className='w-[35%] flex flex-col space-y-3 border rounded-md p-3 h-max'>
			<p className='text-base'>
				To buy, select <span className='font-bold'>Size</span>
			</p>
			<AddToBasket product={product} />
		</div>
	)
}

export default TemporaryBuyBox
