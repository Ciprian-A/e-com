import React from 'react'
import Link from 'next/link'
import {TrolleyIcon} from '@sanity/icons'
import useBasketStore from '@/app/(store)/store'

export const Basket = () => {
	const itemCount = useBasketStore(state =>
		state.items.reduce((total, item) => total + item.quantity, 0)
	)
	return (
		<Link
			href='/basket'
			className='flex flex-1 relative justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
			<TrolleyIcon className='w-6 h-6' />
			<span className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>
				{itemCount}
			</span>
			<span>My Basket</span>
		</Link>
	)
}
