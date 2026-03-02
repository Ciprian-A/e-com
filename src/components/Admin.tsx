import {UserStar} from 'lucide-react'
import Link from 'next/link'
import TooltipHeader from './TooltipHeader'

function Admin() {
	return (
		<TooltipHeader description='Admin Panel'>
			<Link
				href='/admin'
				className='bg-white text-black px-2 py-1 rounded-md hover:bg-gray-200'>
				<UserStar className='w-6 h-6 ' />
			</Link>
		</TooltipHeader>
	)
}

export default Admin
