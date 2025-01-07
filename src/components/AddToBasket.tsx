'use client'
import {Button} from './ui/button'
import useBasketStore from '@/app/(store)/store'
import {Clothing, Footwear} from '../../sanity.types'

interface AddToBasketProps {
	product: Footwear | Clothing
}

const AddToBasket = ({product}: AddToBasketProps) => {
	const {addNewItem, getActiveSize, setActiveSize} = useBasketStore()

	const handleAddToBasket = (product: Footwear | Clothing) => {
		const size = getActiveSize()
		console.log('getActiveSize--handleAddToBasket -->>>>', {size})
		addNewItem(product, size)
		setActiveSize('')
	}

	return (
		<Button
			className='w-full rounded-md bg-gray-900 text-white text-base border-black border-2 hover:bg-gray-700 hover:scale-[1.01] hover:shadow-[0px_10px_15px_-5px_rgba(0,0,0,0.3)] py-5'
			onClick={() => handleAddToBasket(product)}>
			Add to basket
		</Button>
	)
}
export default AddToBasket