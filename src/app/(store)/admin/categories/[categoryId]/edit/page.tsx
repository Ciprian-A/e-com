import EditCategoryForm from '@/components/categories/EditCategoryForm'
import { getCategory } from '@/lib/categories/categories'

async function Category({params}: {params: Promise<{categoryId: string}>}) {
	const {categoryId} = await params
	const categoryRaw = await getCategory(categoryId)
	const category = {
		...categoryRaw,
		description: categoryRaw?.description ?? undefined
	}
	return (
		<div>
			<EditCategoryForm category={category} />
		</div>
	)
}

export default Category