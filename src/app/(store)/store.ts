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

const useStore = create<BasketState>()(
	persist(
		(set, get) => ({
			items: [],
			activeSize: '',
			setActiveSize: size => {
				set(state => ({...state, activeSize: size}))
			},
			getActiveSize: () => get().activeSize,
			updateItems: product => {
				set(state => {
					const newItems = product?.sizesAndStock?.map(p => ({
						product: {...product, _id: `${product._id}-${p.size}`},
						quantity: 0,
						size: p.size,
						id: `${product._id}-${p.size}`,
						sizeId: p._key
					}))
					return {
						items: [...(newItems ?? [])]
					}
				})
			},
			getItem: (product, itemId) => {
				const item = get().items.find(
					item => item.product._id === `${product._id}-${itemId}`
				)
				return item ? item : {product, quantity: 0, size: ''}
			},
			selectItemSize: (product, size) =>
				set(state => {
					const existingItem = state.items.find(
						item => item.product._id === `${product._id}-${size}`
					)
					if (existingItem) {
						return {
							items: state.items.map(item =>
								item.product._id === `${product._id}-${size}`
									? {
											...item,
											size
										}
									: item
							)
						}
					}
					return {
						items: [
							...state.items,
							{
								product,
								size,
								quantity: 99
							}
						]
					}
				}),
			addNewItem: (product, size) =>
				set(state => {
					const foundItem = state.items.find(
						item => item.product._id === `${product._id}-${size}`
					)
					if (foundItem) {
						return {
							items: state.items.map(item =>
								item.product._id === foundItem.product._id
									? {...item, quantity: item.quantity + 1}
									: item
							)
						}
					}
					return {items: []}
				}),
			incrementItemCount: product =>
				set(state => {
					const foundItem = state.items.find(
						item => item.product._id === `${product._id}`
					)

					if (foundItem) {
						return {
							items: state.items.map(item =>
								item.product._id === `${product._id}`
									? {...item, quantity: (item.quantity ?? 0) + 1}
									: item
							)
						}
					}
					return {items: [...state.items]}
				}),
			decrementItemCount: product =>
				set(state => {
					const foundItem = state.items.find(
						item => item.product._id === `${product._id}`
					)
					if (foundItem) {
						return {
							items: state.items.map(item =>
								item.product._id === `${product._id}`
									? {...item, quantity: (item.quantity ?? 0) - 1}
									: item
							)
						}
					}
					return {items: [...state.items]}
				}),
			clearBasket: () => set({items: []}),
			getTotalPrice: () => {
				return get().items.reduce(
					(total, item) =>
						total + (item.product.price ?? 0) * (item.quantity ?? 0),
					0
				)
			},
			getItemCount: (product, size) => {
				const item = get().items.find(
					item => item.product._id === product._id && item.size === size
				)
				return item ? (item.quantity ?? 0) : 0
			},
			getGroupedItems: () => get().items
		}),
		{
			name: 'basket-store'
		}
	)
)

export default useStore
