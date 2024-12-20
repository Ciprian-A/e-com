import {UserInfo} from './UserInfo'
import {Basket} from './Basket'
import {Search} from './Search'
import Logo from './Logo'
import {getAllCategories} from '@/sanity/lib/products/getAllCategories'
import CategorySelectorComponent from './ui/category-selector'

const Header = async () => {
	const categories = await getAllCategories()
	return (
		<header className='flex w-full flex-wrap justify-between items-center px-4 py-2'>
			<div className='flex flex-1 flex-wrap justify-between items-center'>
				<Logo />
				<div className='w-full sm:w-[200px]'>
					<CategorySelectorComponent categories={categories} />
				</div>
				<Search />
			</div>
			<div className='flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none'>
				<Basket />
				<UserInfo />
			</div>
		</header>
	)
}

export default Header
