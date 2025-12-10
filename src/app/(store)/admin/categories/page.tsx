import { getCategries } from '@/lib/categories/categories';

async function CategoriesPage() {
  const categories = await getCategries()
  console.log({categories});
  return <div>CategoriesPage</div>
}

export default CategoriesPage