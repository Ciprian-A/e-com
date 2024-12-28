import Link from 'next/link'
import {UlistIcon} from '@sanity/icons'
import TooltipHeader from './TooltipHeader'

const Orders = () => {
	return (
		<TooltipHeader description='Orders'>
			<Link
				href='/orders'
				className='flex flex-1 relative justify-center sm:justify-start sm:flex-none items-center space-x-2 hover:bg-gray-200 text-black font-bold py-1 px-2 rounded'>
				<UlistIcon className='w-6 h-6' />
			</Link>
		</TooltipHeader>
	)
}

export default Orders
