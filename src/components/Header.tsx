import { getAllCategories } from '@/sanity/lib/products/getAllCategories'
import { Basket } from './Basket'
import { ClientOnly } from './ClientOnly'
import Favourites from './Favourites'
import Logo from './Logo'
import { Search } from './Search'
import CategorySelector from './ui/category-selector'
import { UserInfo } from './UserInfo'

const Header = async () => {
	const categories = await getAllCategories()
	return (
		<header className='border-b-2 '>
			<div className='grid grid-cols-3 grid-rows-3 items-center space-y-0.5 p-2 md:flex md:w-full md:flex-wrap md:items-center lg:space-x-4 lg:px-4 lg:py-2'>
				<div className='grid row-start-1 row-end-1 col-start-1 col-end-2 md:flex md:flex-row'>
					<Logo />
				</div>
				<div className='grid row-start-2 col-start-1 col-span-3 h-[40px] md:flex md:flex-row md:flex-1'>
					<div className='w-full sm:w-[200px] justify-start'>
						<CategorySelector categories={categories} />
					</div>
					<div className='w-full'>
						<Search />
					</div>
				</div>
				<div className='grid row-start-1 row-end-1 col-start-2 col-span-full lg:flex items-center justify-end'>
					<div className='flex'>
						<Favourites />
						<Basket />
						<ClientOnly>
							<UserInfo />
						</ClientOnly>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
