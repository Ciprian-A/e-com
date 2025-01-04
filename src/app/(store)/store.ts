import {Footwear, Clothing} from '@/../sanity.types'
import {create, StateCreator, combine} from 'zustand'
import {persist} from 'zustand/middleware'
import {v4 as uuid} from 'uuid'
export interface BasketItem {
	product: Clothing | Footwear
	quantity?: number
	size?: string
	id?: string
	sizeId?: string
}

interface BasketState {
	items: BasketItem[]
	incrementItemCount: (product: Clothing | Footwear, size: string) => void
	decrementItemCount: (product: Clothing | Footwear, size: string) => void
	addNewItem: (product: Clothing | Footwear, size: string) => void
	selectItemSize: (product: Clothing | Footwear, size: string) => void
	getItem: (product: Clothing | Footwear, size: string) => BasketItem
	setItem: (product: Clothing | Footwear, size: string) => void
	removeItem: (productId: string) => void
	clearBasket: () => void
	getTotalPrice: () => number
	getItemCount: (product: Clothing | Footwear, size: string) => number
	getGroupedItems: () => BasketItem[]
	updateItems: (newItems: BasketItem[]) => void
}

const useBasketStore = create<BasketState>()(
	persist(
		(set, get) => ({
			items: [],
			updateItems: (newItems: BasketItem[]) => {
				set({
					items: newItems.map(newItem => ({
						...newItem
						// Add any necessary transformations here
						// For example:
						// quantity: newItem.quantity || 1
					}))
				})
			},
			getItem: (product, size) => {
				const item = get().items.find(
					item => item.product._id === product._id && item.size === size
				)
				// const item = get()
				// 	.items.filter(item => item.product._id === product._id && item.size)
				// 	?.at(-1)
				console.log('getItemSize---item', {item})
				return item ? item : {product, quantity: 0, size: ''}
			},
			setItem: (product, size) =>
				set(state => {
					const foundItem = state.items.find(
						item => item.product._id === product._id && item.size === size
					)
					if (foundItem) {
						return {
							items: state.items.map(item =>
								item.product._id === product._id && item.size === size
									? {...item, size}
									: item
							)
						}
					}
					return {items: []}
				}),
			// resetSizeValue: () => null,
			selectItemSize: (product, size) =>
				set(state => {
					const existingItem = state.items.find(
						item => item.product._id === product._id && item.size === size
					)
					console.log('selectItemSize---existingItem', {
						existingItem,
						product,
						size
					})
					if (existingItem) {
						return {
							items: state.items.map(item =>
								item.product._id === product._id && item.size === size
									? {
											...item,
											size,
											sizeId: item.product.sizesAndStock?.find(
												s => s.size === size
											)?._key
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
								quantity: 0,
								sizeId: product.sizesAndStock?.find(s => s.size === size)?._key
							} as BasketItem
						]
					}
				}),
			addNewItem: (product, size) =>
				set(state => {
					const foundItem = state.items.find(
						item => item.product._id === product._id && item.size === size
					)

					if (foundItem) {
						console.log('addNewItem---foundItem', {foundItem})
						return {
							items: state.items.map(item =>
								item.product._id === product._id && item.size === size
									? {...item, quantity: (item.quantity ?? 0) + 1}
									: item
							)
						}
					}
					return {items: []}
				}),
			incrementItemCount: (product, size) =>
				set(state => {
					const foundItem = state.items.find(
						item => item.product._id === product._id && item.size === size
					)
					if (foundItem) {
						return {
							items: state.items.map(item =>
								item.product._id === product._id && item.size === size
									? {...item, quantity: (item.quantity ?? 0) + 1}
									: item
							)
						}
					}
					return {items: []}
				}),
			decrementItemCount: (product, size) =>
				set(state => {
					const foundItem = state.items.find(
						item => item.product._id === product._id && item.size === size
					)
					if (foundItem) {
						return {
							items: state.items.map(item =>
								item.product._id === product._id && item.size === size
									? {...item, quantity: (item.quantity ?? 0) - 1}
									: item
							)
						}
					}
					return {items: []}
				}),
			removeItem: productId =>
				set(state => ({
					items: state.items.reduce((acc, item) => {
						if (item.product._id === productId) {
							if (item.quantity && item.quantity > 1) {
								acc.push({...item, quantity: item.quantity - 1})
							}
						} else {
							acc.push(item)
						}
						return acc
					}, [] as BasketItem[])
				})),
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
				console.log('getItemCount---item', {item, product, size})
				return item ? (item.quantity ?? 0) : 0
			},
			getGroupedItems: () => get().items //.filter(item => !item.id) as BasketItem[]
		}),
		{
			name: 'basket-store'
		}
	)
)

export default useBasketStore
