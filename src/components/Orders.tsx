import { ListIcon } from 'lucide-react'
import Link from 'next/link'

const Orders = () => {
	return (
		<div>
			<Link
				href='/orders'
				className='flex flex-1 items-center space-x-2 text-black font-base rounded'>
				<ListIcon className='w-4 h-4' />
				<div>Orders</div>
			</Link>
		</div>
	)
}

export default Orders
