'use client'
import {Button} from './ui/button'
import useStore from '@/app/(store)/store'
import {Clothing, Footwear} from '../../sanity.types'

interface AddToBasketProps {
	product: Footwear | Clothing
	disabled?: boolean
}

const AddToBasket = ({product, disabled}: AddToBasketProps) => {
	const {
		addItemToBasket,
		getActiveSize,
		setActiveSize,
		getSelectedQuantity,
		setSelectedQuantity
	} = useStore()
	const items = useStore().items

	const handleAddToBasket = (product: Footwear | Clothing) => {
		const size = getActiveSize()
		const selectedQty = getSelectedQuantity()
		if (disabled) {
			return
		}
		const itemToBeAddedToBasket = items.find(
			i => i._id === `${product._id}-${size}`
		)

		if (itemToBeAddedToBasket) {
			addItemToBasket(itemToBeAddedToBasket, selectedQty)
		}
		setActiveSize('')
		setSelectedQuantity(1)
	}

	return (
		<Button
			className={`${disabled ? 'cursor-not-allowed' : ' disabled:bg-gray-900 w-full rounded-md bg-gray-900 text-white text-base border-black border-2 hover:bg-gray-700 hover:scale-[1.01] hover:shadow-[0px_10px_15px_-5px_rgba(0,0,0,0.3)] py-5'}`}
			onClick={() => handleAddToBasket(product)}>
			Add to basket
		</Button>
	)
}
export default AddToBasket
