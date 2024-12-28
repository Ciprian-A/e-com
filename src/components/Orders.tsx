import Link from 'next/link'
import {UlistIcon} from '@sanity/icons'

const Orders = () => {
	return (
		<div>
			<Link
				href='/orders'
				className='flex flex-1 items-center space-x-2 text-black font-base rounded'>
				<UlistIcon className='w-6 h-6' />
				<div>Orders</div>
			</Link>
		</div>
	)
}

export default Orders
