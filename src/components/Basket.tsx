'use client'
import Link from 'next/link'
import {TrolleyIcon} from '@sanity/icons'
import useBasketStore from '@/app/(store)/store'
import TooltipHeader from './TooltipHeader'

export const Basket = () => {
	const itemCount = useBasketStore(state =>
		state.items.reduce((total, item) => total + item.quantity, 0)
	)
	return (
		<TooltipHeader description='My Basket'>
			<Link
				href='/basket'
				className='group flex flex-1 relative justify-center sm:justify-start sm:flex-none items-center space-x-2 hover:bg-gray-200 text-black font-bold py-1 px-2 rounded'>
				<TrolleyIcon className='w-6 h-6' />
				{itemCount > 0 && (
					<span className='child absolute  -top-2 -right-2 bg-red-500 group-hover:bg-red-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>
						{itemCount}
					</span>
				)}
			</Link>
		</TooltipHeader>
	)
}
