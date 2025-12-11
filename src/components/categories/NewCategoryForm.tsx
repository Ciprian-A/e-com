import { createCategory } from '@/lib/categories/actions/categories'
import { redirect } from 'next/navigation'
import CategoryForm, { CategoryDataType } from './CategoriesForm'

function NewCategoryForm() {
  async function onSubmit(data: CategoryDataType) {
    'use server'
    await createCategory(data)
    redirect('/admin/categories')
  }
  return (
		<div>
			<CategoryForm
				onSubmit={onSubmit}
				formTitle='Create New Category'
				formDescription='Enter the details for your new category below.'
			/>
		</div>
	)
}

export default NewCategoryForm
