'use client'
import useStore from '@/app/(store)/store'
import {Minus, Plus} from 'lucide-react'
import {useEffect, useState} from 'react'

type IncrementAndDecrementButtonProps = {
	productId: string
	disabled: boolean
}

const IncrementAndDecrementButton = ({
	productId,
	disabled
}: IncrementAndDecrementButtonProps) => {
	const {incrementItemCount, decrementItemCount, getItemCount} = useStore()

	const itemCount = getItemCount(productId)
	const [isClient, setIsClient] = useState(false)
	useEffect(() => {
		setIsClient(true)
	}, [])

	if (!isClient) {
		return null
	}

	return (
		<div className='flex items-center justify-center space-x-2 border-2 rounded-full'>
			<button
				onClick={() => decrementItemCount(productId)}
				className={`w-8 h-8 flex font-bold items-center justify-center transition-colors duration-200 rounded-full hover:cursor-pointer hover:bg-gray-200 ${itemCount === 0 ? ' cursor-not-allowed' : ''}`}
				disabled={itemCount === 0 || disabled}>
				<Minus className='w-6 h-6' />
			</button>
			<span className='w-8 text-center font-semibold'>{itemCount}</span>
			<button
				onClick={() => incrementItemCount(productId)}
				className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 hover:cursor-pointer hover:bg-gray-200 ${disabled ? 'cursor-not-allowed' : ''}`}
				disabled={disabled}>
				<Plus className='w-6 h-6' />
			</button>
		</div>
	)
}

export default IncrementAndDecrementButton
