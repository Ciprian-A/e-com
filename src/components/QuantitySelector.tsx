import React from 'react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
const QuantitySelector = ({qty}: {qty: number}) => {
	return (
		<Select>
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
