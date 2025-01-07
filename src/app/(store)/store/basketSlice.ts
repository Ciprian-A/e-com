import {StateCreator} from 'zustand'
import {Clothing, Footwear} from '../../../../sanity.types'

type BasketItem = {
	product: Footwear | Clothing
	quantity: number
}
type BasketState = {
	items: BasketItem[]
	activeSize: string
}

type BasketActions = {
	setActiveSize: (size: string) => void
	getActiveSize: () => string
	addItemTBasket: (product: Clothing | Footwear, size: string) => void
}

export type BasketSlice = BasketState & BasketActions

export const createSlice: StateCreator<BasketSlice, [], [], BasketSlice> = (
	set,
	get
) => ({
	items: [],
	activeSize: '',
	setActiveSize: size => {
		set(state => ({...state, activeSize: size}))
	},
	getActiveSize: () => get().activeSize,
	addItemTBasket: (product, size) =>
		set(state => {
			return {
				items: state.items.map(item =>
					item.product._id === `${product._id}-${size}`
						? {...item, quantity: item.quantity + 1}
						: {...item, quantity: 1}
				)
			}
		})
})
