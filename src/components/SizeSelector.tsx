'use client'
import useStore from '@/app/(store)/store'
import { ItemSize } from '@/app/(store)/store/storeSlice'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { ItemDTO } from '@/types/item'

interface SizeSelectorProps {
	product: ItemDTO
}

// const allFotwearSizes = [
// 	'5',
// 	'5.5',
// 	'6',
// 	'6.5',
// 	'7',
// 	'7.5',
// 	'8',
// 	'8.5',
// 	'9',
// 	'9.5',
// 	'10',
// 	'10.5',
// 	'11',
// 	'11.5',
// 	'12',
// 	'12.5'
// ]
// const allClothingSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']

function SizeSelector({product}: SizeSelectorProps) {
	const { setSelectedSize, getSelectedSize} = useStore()
	const availableSizeList = product?.variants?.map(p => p.size) as string[]
	const type = 'footwear' in product ? 'footwear' : 'clothing'
	const selectedSize = getSelectedSize(product.id)

	const handleValueChange = (value: string) => {
		setSelectedSize(product.id, value as ItemSize)
	}
	console.log({availableSizeList, selectedSize});
	return (
		<div className=''>
			<Select
				value={selectedSize}
				onValueChange={value => handleValueChange(value)}>
				<SelectTrigger className='w-full'>
					<SelectValue placeholder='Select a size' />
				</SelectTrigger>
				<SelectContent>
					{
						availableSizeList.map((size: string) => (
							<SelectItem
								key={size}
								value={size}
								disabled={!availableSizeList?.includes(size)}>
								{size}
							</SelectItem>
						))
					}
				</SelectContent>
			</Select>
		</div>
	)
}

export default SizeSelector
