import {Footwear, Clothing} from '@/../sanity.types'
import {create} from 'zustand'
import {persist} from 'zustand/middleware'

import {createBasketSlice, BasketSlice} from './store/basketSlice'
import {createItemSlice, ItemSlice} from './store/itemsSlice'

export interface BasketItem {
	product: Clothing | Footwear
	quantity: number
	size?: string
	id?: string
	sizeId?: string
}

interface BasketState {
	items: BasketItem[]
	activeSize: string
	setActiveSize: (size: string) => void
	getActiveSize: () => string
	incrementItemCount: (product: Clothing | Footwear) => void
	decrementItemCount: (product: Clothing | Footwear) => void
	addNewItem: (product: Clothing | Footwear, size: string) => void
	selectItemSize: (product: Clothing | Footwear, size: string) => void
	getItem: (product: Clothing | Footwear, itemId: string) => BasketItem
	clearBasket: () => void
	getTotalPrice: () => number
	getItemCount: (product: Clothing | Footwear, size: string) => number
	getGroupedItems: () => BasketItem[]
	updateItems: (product: Clothing | Footwear) => void
}

const useStore = create<BasketSlice & ItemSlice>()(
	persist(
		(...a) => ({
			...createBasketSlice(...a),
			...createItemSlice(...a)
		}),
		{
			name: 'basket-store'
		}
	)
)

export default useStore
