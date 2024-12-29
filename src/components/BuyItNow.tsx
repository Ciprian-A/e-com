import React from 'react'
import {Button} from './ui/button'
//hover:shadow-gray-500
const BuyItNow = () => {
	return (
		<Button className='w-full rounded-md bg-white text-black text-base border-black border-2 hover:bg-gray-100 hover:scale-[1.01] hover:shadow-[0px_10px_15px_-5px_rgba(0,0,0,0.3)] py-6'>
			Buy it now
		</Button>
	)
}

export default BuyItNow
