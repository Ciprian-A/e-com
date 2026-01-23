'use client'

import useStore from '@/app/(store)/store'
import {ItemSize} from '@/app/(store)/store/storeSlice'
import {getDefaultSizeIndex} from '@/lib/getDefaultSizeIndex'
import {useEffect} from 'react'
import {Button} from './ui/button'

function SizeList({sizes, productId}: {sizes: string[]; productId: string}) {
	const {setSelectedSize} = useStore()
	const selectedSize = useStore(state => state.getSelectedSize(productId))
	const defaultSize = getDefaultSizeIndex(sizes.length)

	useEffect(() => {
		if (!selectedSize) {
			setSelectedSize(productId, sizes[defaultSize] as ItemSize)
		}
	}, [selectedSize])

	const handleSelectSize = (size: string) => {
		setSelectedSize(productId, size as ItemSize)
	}

	if (!sizes.length) return null
	return (
		<>
			<p className='text-base mb-2'>
				Size Name:{' '}
				<span className='font-bold text-lg text-black'>{selectedSize}</span>
			</p>
			<div className='flex gap-2'>
				{sizes.map(s => (
					<Button
						variant='outline'
						key={s}
						onClick={() => handleSelectSize(s)}
						className='min-w-14 px-2 py-1 rounded-sm border border-[#555555] font-semibold text-lg text-[#555555]'>
						{s.toUpperCase()}
					</Button>
				))}
			</div>
		</>
	)
}

export default SizeList
