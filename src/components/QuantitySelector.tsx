import React from 'react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import useStore from '@/app/(store)/store'
const QuantitySelector = ({qty}: {qty: number}) => {
	const {getSelectedQuantity, setSelectedQuantity} = useStore()
	const selectedQty = getSelectedQuantity()

	const handleValueChange = (value: string) => {
		setSelectedQuantity(Number(value))
	}
	return (
		<Select
			value={selectedQty.toString()}
			onValueChange={value => handleValueChange(value)}>
			<SelectTrigger className='w-full'>
				<SelectValue placeholder='Quantity' />
			</SelectTrigger>
			<SelectContent>
				{Array.from({length: qty}, (_, idx) => idx + 1).map(n => (
					<SelectItem key={n} value={`${n}`}>
						{n}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}

export default QuantitySelector
