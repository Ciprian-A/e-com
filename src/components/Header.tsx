'use client'
import useBasketStore from '@/app/(store)/store'
import {TrolleyIcon} from '@sanity/icons'
import Form from 'next/form'
import Link from 'next/link'
import {UserInfo} from './UserInfo'

const Header = () => {
	const itemCount = useBasketStore(state =>
		state.items.reduce((total, item) => total + item.quantity, 0)
	)

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
				<Link
					href='/basket'
					className='flex flex-1 relative justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
					<TrolleyIcon className='w-6 h-6' />
					<span className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>
						{itemCount}
					</span>
					<span>My Basket</span>
				</Link>
				<UserInfo />
			</div>
		</header>
	)
}

export default Header
