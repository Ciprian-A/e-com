'use client'

import Form from 'next/form'
import Link from 'next/link'
import {UserInfo} from './UserInfo'
import {Basket} from './Basket'

const Header = () => {
	return (
		<header className='flex w-full flex-wrap justify-between items-center px-4 py-2'>
			<div className='flex flex-1 flex-wrap justify-between items-center'>
				<Link
					href='/'
					className='text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0'>
					Shoppy
				</Link>
				<Form
					action='/search'
					className='w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0'>
					<input
						type='text'
						name='query'
						placeholder='Search for a product'
						className='w-full bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border max-w-4xl'
					/>
				</Form>
			</div>
			<div className='flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none'>
				<Basket />
				<UserInfo />
			</div>
		</header>
	)
}

export default Header
