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
			{/** visible for screen size md and higher */}
			<div className='hidden md:flex w-full flex-wrap justify-between items-center space-x-4 px-4 py-2'>
				<Logo />
				<div className='flex flex-1 flex-wrap space-x-4 justify-between items-center'>
					<div className='w-full  sm:w-[200px]'>
						<CategorySelector categories={categories} />
					</div>
					<Search />
				</div>
				<Favourites />
				<div className='flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none'>
					<Basket />
					<ClientOnly>
						<UserInfo />
					</ClientOnly>
				</div>{' '}
			</div>
			{/** visible for screen size md lower */}
			<div className=' flex-column px-4 py-3 space-y-4 md:hidden '>
				<div className='flex flex-row justify-between items-center'>
					<Logo />
					<div className='flex space-x-4'>
						<Favourites />
						<Basket />
						<ClientOnly>
							<UserInfo />
						</ClientOnly>
					</div>
				</div>
				<div className='flex items-center w-full h-[40px] space-x-4'>
					<div className='sm:w-[200px]'>
						<CategorySelector categories={categories} />
					</div>
					<Search />
				</div>
			</div>
		</header>
	)
}

export default Header
