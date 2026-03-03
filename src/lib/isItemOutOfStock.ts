import {ItemDTO} from '@/types/item'

export const isItemOutOfStock = (item: ItemDTO) => {
	if (item.type === 'VARIANT') {
		return !item?.variants?.some(v => v.stock > 0)
	}
	return (item.stock ?? 0) <= 0
}
