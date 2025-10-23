import { HeartIcon } from '@sanity/icons'
import Link from 'next/link'
import TooltipHeader from './TooltipHeader'

const Favourites = () => {
	return (
		<TooltipHeader description='Favourites'>
			<Link
				href='/favourites'
				className='flex flex-1 relative justify-center sm:justify-start sm:flex-none items-center hover:bg-gray-200 text-black font-bold py-1 px-2 rounded'>
				<HeartIcon className='w-6 h-6 ' />
			</Link>
		</TooltipHeader>
	)
}

export default Favourites
