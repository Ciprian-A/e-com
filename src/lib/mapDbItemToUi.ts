import {Item} from '@/components/items/ItemsTable'
import {Prisma} from '../../config/db'

export function mapDbItemToUi(item: Prisma.ItemGetPayload<object>): Item {
	return {
		id: item.id,
		name: item.name,
		description: item.description ?? undefined,
		price: item.price,
		productDetails: Array.isArray(item.productDetails)
			? (item.productDetails as {key: string; value: string}[])
			: [],
		imageUrl: item.imageUrl,
		imageGallery: item.imageGallery,
		createdAt: item.createdAt,
		updatedAt: item.updatedAt
	}
}
