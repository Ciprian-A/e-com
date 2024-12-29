import React from 'react'
import {Button} from './ui/button'
import {HeartFilledIcon} from '@sanity/icons'

const AddToFavouritesButton = () => {
	return (
		<Button className='w-full rounded-md border-none outline-none bg-white text-black text-base hover:bg-stone-300 hover:scale-[1.01] py-6'>
			<HeartFilledIcon color='red' className='w-14 h-14 ' />
			Add to favourites
		</Button>
	)
}

export default AddToFavouritesButton
