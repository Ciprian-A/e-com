'use client'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import {Clothing, Footwear} from '../../sanity.types'
import useBasketStore from '@/app/(store)/store'
// import {useEffect, useState} from 'react'

interface SizeSelectorProps {
	product: Clothing | Footwear
}
// interface SizeSelectorProps {
// 	type: 'footwear' | 'clothing'
// 	sizes: Footwear['sizesAndStock'] | Clothing['sizesAndStock']
// }

const allFotwearSizes = [
	'5',
	'5.5',
	'6',
	'6.5',
	'7',
	'7.5',
	'8',
	'8.5',
	'9',
	'9.5',
	'10',
	'10.5',
	'11',
	'11.5',
	'12',
	'12.5'
]
const allClothingSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']

function SizeSelector({product}: SizeSelectorProps) {
	// const [selectedSize, setSelectedSize] = useState<string>('')
	const {selectItemSize, getItem} = useBasketStore()
	const availableSizeList = product?.sizesAndStock?.map(p => p.size) as string[]
	// const val = getItemSize(product)
	const type = product._type
	// const groupedItems = getGroupedItems()
	// useEffect(() => {
	// 	setSelectedSize(availableSizeList[0])
	// }, [availableSizeList])
	// console.log({groupedItems})
	const handleValueChange = (value: string) => {
		selectItemSize(product, value)
		getItem(product, value)
	}
	return (
		<div className=''>
			<Select onValueChange={value => handleValueChange(value)}>
				<SelectTrigger className='w-full'>
					<SelectValue placeholder='Select a size' />
				</SelectTrigger>
				<SelectContent>
					{type === 'footwear'
						? allFotwearSizes.map((size: string) => (
								<SelectItem
									key={size}
									value={size}
									disabled={!availableSizeList?.includes(size)}>
									{size}
								</SelectItem>
							))
						: allClothingSizes.map((size: string) => (
								<SelectItem
									key={size}
									value={size}
									disabled={!availableSizeList?.includes(size)}>
									{size}
								</SelectItem>
							))}
				</SelectContent>
			</Select>
		</div>
	)
}

export default SizeSelector
