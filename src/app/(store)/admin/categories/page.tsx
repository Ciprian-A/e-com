import { CategoriesTable } from '@/components/categories/CategoriesTable';
import { getCategories } from '@/lib/categories/categories';
import { Plus } from 'lucide-react';
import Link from 'next/link';

async function CategoriesPage() {
  const categoriesData = await getCategories()
  const categories = categoriesData.map(cat => ({
	...cat,
	description: cat.description ?? undefined
  }))
  console.log({categories});
  return (
		<>
			<div className='flex items-center justify-between mb-4 '>
				<h1 className='font-bold text-2xl'>Categories</h1>
				<Link
					href='/admin/categories/new'
					className='bg-black text-white px-4 py-2 rounded-md'>
					<Plus className='inline-block mr-2 h-4 w-4' />
					<span>New </span>
					<span className='hidden md:inline'>Category</span>
				</Link>
			</div>
			<CategoriesTable categories={categories} />
		</>
	)
}

export default CategoriesPage