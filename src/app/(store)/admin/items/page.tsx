import { Item, ItemsTable } from '@/components/items/ItemsTable'
import { getItems } from '@/lib/items/items'
import { mapDbItemToUi } from '@/lib/mapDbItemToUi'
import { Plus } from 'lucide-react'
import Link from 'next/link'

async function ItemsPage() {
  const dbItems = await getItems()
	const uiItems: Item[] = dbItems.map(mapDbItemToUi)
  return (
		<div className=' w-full  md:w-xl lg:w-2xl p-5 rounded-lg border h-full'>
			<div className='flex items-center justify-between mb-4 '>
				<h1 className='font-bold'>Items</h1>
				<Link
					href='/admin/items/new'
					className='bg-black text-white px-4 py-2 rounded-md'>
					<Plus className='inline-block mr-2 h-4 w-4' />
					<span>New </span>
					<span className='hidden md:inline'>Item</span>
				</Link>
			</div>
			<ItemsTable items={uiItems} />
		</div>
	)
}

export default ItemsPage