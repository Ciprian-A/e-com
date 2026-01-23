'use client'
import useStore from '@/app/(store)/store'
import {ItemSize} from '@/app/(store)/store/storeSlice'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import {ItemDTO} from '@/types/item'

interface SizeSelectorProps {
	product: ItemDTO
}

function SizeSelector({product}: SizeSelectorProps) {
	const {setSelectedSize, getSelectedSize} = useStore()
	const availableSizeList = product?.variants?.map(p => p.size) as string[]
	const selectedSize = getSelectedSize(product.id)

	const handleValueChange = (value: string) => {
		setSelectedSize(product.id, value as ItemSize)
	}
	return (
		<div className=''>
			<Select
				value={selectedSize}
				onValueChange={value => handleValueChange(value)}>
				<SelectTrigger className='w-full'>
					<SelectValue placeholder='Select a size' />
				</SelectTrigger>
				<SelectContent>
					{availableSizeList.map((size: string) => (
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
