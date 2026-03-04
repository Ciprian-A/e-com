'use client'
import useStore from '@/store'
import {Button} from './ui/button'

interface AddToBasketProps {
	productId: string
	name: string
	slug: string
	price: number
	image: string
	productType: 'SIMPLE' | 'VARIANT'
	availableStock: number
}

const AddToBasket = ({
	productId,
	name,
	slug,
	price,
	image,
	productType,
	availableStock
}: AddToBasketProps) => {
	const activeSize = useStore(state => state.getSelectedSize(productId))
	const quantity = useStore(state => state.getSelectedQuantity(productId))
	const addToBasket = useStore(state => state.addItemToBasket)
	const isSimpleProductType = productType === 'SIMPLE'
	const isDisabled = isSimpleProductType
		? quantity < 1 || quantity > availableStock
		: !activeSize || quantity < 1 || quantity > availableStock

	const handleAddToBasket = () => {
		if (isDisabled) return

		const basketItem = {
			uniqueKey: isSimpleProductType
				? `${productId}-simple`
				: `${productId}-${activeSize}`,
			productId,
			name,
			slug,
			price,
			size: isSimpleProductType ? null : activeSize,
			quantity,
			image
		}
		addToBasket(basketItem)
	}

	return (
		<Button
			className={`${isDisabled ? 'cursor-not-allowed' : ''} disabled:bg-gray-900 w-full rounded-md bg-gray-900 text-white text-base border-black border-2 hover:bg-gray-700 py-5`}
			onClick={handleAddToBasket}>
			Add to basket
		</Button>
	)
}
export default AddToBasket
