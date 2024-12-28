import Link from 'next/link'
import {HeartIcon} from '@sanity/icons'

const Favourites = () => {
	return (
		<div>
			<Link
				href='/favourites'
				className='flex flex-1 relative justify-center sm:justify-start sm:flex-none items-center space-x-2 hover:bg-gray-200 text-black font-bold py-1 px-2 rounded'>
				<HeartIcon className='w-6 h-6 ' />
			</Link>
		</div>
	)
}

export default Favourites
