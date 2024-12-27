import {UserInfo} from './UserInfo'
import {Basket} from './Basket'
import {Search} from './Search'
import Logo from './Logo'
import {getAllCategories} from '@/sanity/lib/products/getAllCategories'
import CategorySelector from './ui/category-selector'

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
				<div className='flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none'>
					<Basket />
					<UserInfo />
				</div>{' '}
			</div>
			{/** visible for screen size md lower */}
			<div className=' flex-column px-4 py-3 space-y-4 md:hidden '>
				<div className='flex flex-row justify-between'>
					<Logo />
					<div className='flex space-x-4'>
						<Basket />
						<UserInfo />
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
