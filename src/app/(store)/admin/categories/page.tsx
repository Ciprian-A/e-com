import { CategoriesTable } from '@/components/categories/CategoriesTable';
import { getCategries } from '@/lib/categories/categories';
import { Plus } from 'lucide-react';
import Link from 'next/link';

async function CategoriesPage() {
  const categoriesData = await getCategries()
  const categories = categoriesData.map(cat => ({
	...cat,
	description: cat.description ?? undefined
  }))
  console.log({categories});
  return (
			<div className=' w-full  md:w-xl lg:w-2xl p-5 rounded-lg border h-full'>
			<div className='flex items-center justify-between mb-4 '>
				<h1 className='font-bold'>Categories</h1>
				<Link
					href='/admin/promoCodes/new'
					className='bg-black text-white px-4 py-2 rounded-md'>
					<Plus className='inline-block mr-2 h-4 w-4' />
					<span>New </span>
					<span className='hidden md:inline'>Category</span>
				</Link>
			</div>
			<CategoriesTable categories={categories} />
		</div>
	)
}

export default CategoriesPage