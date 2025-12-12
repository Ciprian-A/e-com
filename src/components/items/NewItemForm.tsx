import { getCategories } from '@/lib/categories/categories'
import { createItem } from '@/lib/items/actions/items'
import { redirect } from 'next/navigation'
import ItemForm from './ItemForm'

async function NewItemForm() {
  const categories = await getCategories()
  async function onSubmit(data: FormData) {
		'use server'
		await createItem(data)
		redirect('/admin/items')
	}
  return (
		<div>
			<ItemForm
				onSubmit={onSubmit}
				formTitle='Create Item'
				formDescription='Enter the details for your new item below.'
				categories={categories}
			/>
		</div>
	)
}

export default NewItemForm
