'use client'
import useStore from '@/app/(store)/store'
import { Clothing, Footwear } from '../../sanity.types'
import { Button } from './ui/button'

interface AddToBasketProps {
	product: Footwear | Clothing
	disabled?: boolean
}

const AddToBasket = ({product, disabled}: AddToBasketProps) => {
	const {
		addItemToBasket,
		getSelectedSize,
		getSelectedQuantity,
	} = useStore()
	const items = useStore().storeItems

	const handleAddToBasket = (product: Footwear | Clothing) => {
		const size = getSelectedSize(product._id)
		const selectedQty = getSelectedQuantity(product._id)
		if (disabled) {
			return
		}
		const itemToBeAddedToBasket = items.find(
			i => i._id === product._id
		)

		if (itemToBeAddedToBasket) {
			addItemToBasket(itemToBeAddedToBasket, size, selectedQty)
		}
	}

	return (
		<Button
			className={`${disabled ? 'cursor-not-allowed' : ' disabled:bg-gray-900 w-full rounded-md bg-gray-900 text-white text-base border-black border-2 hover:bg-gray-700 py-5'}`}
			onClick={() => handleAddToBasket(product)}>
			Add to basket
		</Button>
	)
}
export default AddToBasket
