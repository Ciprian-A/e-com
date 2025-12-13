import EditItemForm from '@/components/items/EditItemForm'
import { getCategories } from '@/lib/categories/categories'
import { getItem } from '@/lib/items/items'

async function EditItemPage({params}: {params: Promise<{itemId: string}>}) {
	const {itemId} = await params
	const item = await getItem(itemId)
	const categories = await getCategories()
	const normalizedItem = {
		...item,
		description: item.description ?? undefined,
		productDetails: Array.isArray(item.productDetails)
			? (item.productDetails as {key: string; value: string}[])
			: []
	}
	return (
		<div>
			<EditItemForm item={normalizedItem} categories={categories} />
		</div>
	)
}

export default EditItemPage
