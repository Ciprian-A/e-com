'use client'

import Link from 'next/link'
import {UserInfo} from './UserInfo'
import {Basket} from './Basket'
import {Search} from './Search'

const Header = () => {
	return (
		<header className='flex w-full flex-wrap justify-between items-center px-4 py-2'>
			<div className='flex flex-1 flex-wrap justify-between items-center'>
				<Link
					href='/'
					className='text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0'>
					Shoppy
				</Link>
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
