import { getCategory } from '@/lib/categories/categories';

async function Category({params}: {params: Promise<{categoryId: string}>}) {
  const {categoryId} = await params;
	const category = await getCategory(categoryId)
  console.log({categoryId, category})
  return (
		<div>
			 {categoryId}
		</div>
	)
}

export default Category