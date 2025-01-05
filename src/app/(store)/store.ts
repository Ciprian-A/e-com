import {Footwear, Clothing} from '@/../sanity.types'
import {create} from 'zustand'
import {persist} from 'zustand/middleware'

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
	// incrementItemCount: (product: Clothing | Footwear, size: string) => void
	decrementItemCount: (product: Clothing | Footwear) => void
	// decrementItemCount: (product: Clothing | Footwear, size: string) => void
	addNewItem: (product: Clothing | Footwear, size: string) => void
	selectItemSize: (product: Clothing | Footwear, size: string) => void
	getItem: (product: Clothing | Footwear, itemId: string) => BasketItem
	// removeItem: (productId: string) => void
	clearBasket: () => void
	getTotalPrice: () => number
	getItemCount: (product: Clothing | Footwear, size: string) => number
	getGroupedItems: () => BasketItem[]
	updateItems: (product: Clothing | Footwear) => void
}

const useBasketStore = create<BasketState>()(
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
					console.log('updateItems >>>>>>', {items: state.items, newItems})
					return {
						items: [...(newItems ?? [])]
					}
				})
			},
			getItem: (product, itemId) => {
				const item = get().items.find(
					item => item.product._id === `${product._id}-${itemId}`
				)

				// const item = get()
				// 	.items.filter(item => item.product._id === product._id && item.size)
				// 	?.at(-1)
				console.log('getItem---item', {item, product, itemId})
				return item ? item : {product, quantity: 0, size: ''}
			},
			selectItemSize: (product, size) =>
				set(state => {
					console.log('selectItemSize >>>>', {updatedItems: state.items})
					const existingItem = state.items.find(
						item => item.product._id === `${product._id}-${size}`
					)
					console.log('selectItemSize---existingItem', {
						existingItem,
						product,
						size
					})
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
					console.log('addNewItem >>>>', {product, size, items: state.items})
					if (foundItem) {
						console.log('addNewItem---foundItem', {foundItem})
						return {
							items: state.items.map(item =>
								item.product._id === foundItem.product._id //`${product._id}-${size}`
									? {...item, quantity: item.quantity + 1}
									: item
							)
						}
					}
					//  else {
					// 	return {items: [...state.items, {product, quantity: 1}]}
					// }
					return {items: []}
				}),
			incrementItemCount: product =>
				// incrementItemCount: (product, size) =>
				set(state => {
					const foundItem = state.items.find(
						item => item.product._id === `${product._id}` // product._id && item.size === size
					)
					console.log('incrementItemCount >>>>>', {product})
					if (foundItem) {
						return {
							items: state.items.map(item =>
								item.product._id === `${product._id}` //product._id && item.size === size: ;
									? {...item, quantity: (item.quantity ?? 0) + 1}
									: item
							)
						}
					}
					return {items: [...state.items]}
				}),
			decrementItemCount: product =>
				// decrementItemCount: (product, size) =>
				set(state => {
					const foundItem = state.items.find(
						item => item.product._id === `${product._id}` // product._id && item.size === size
					)
					if (foundItem) {
						return {
							items: state.items.map(item =>
								item.product._id === `${product._id}` // product._id && item.size === size: ;
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
				console.log('getItemCount---item', {item, product, size})
				return item ? (item.quantity ?? 0) : 0
			},
			getGroupedItems: () => get().items
		}),
		{
			name: 'basket-store'
		}
	)
)

export default useBasketStore
