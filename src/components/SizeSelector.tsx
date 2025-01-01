import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import {Clothing, Footwear} from '../../sanity.types'

interface SizeSelectorProps {
	type: 'footwear' | 'clothing'
	sizes: Footwear['sizesAndStock'] | Clothing['sizesAndStock']
}

function SizeSelector({type, sizes}: SizeSelectorProps) {
	console.log({type, sizes})
	return (
		<div className=''>
			<Select>
				<SelectTrigger className='w-full'>
					<SelectValue placeholder='Select a size' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='7 uk'>7 UK</SelectItem>
					<SelectItem value='8 uk'>8 UK</SelectItem>
					<SelectItem value='9 uk'>9 UK</SelectItem>
					<SelectItem value='10 uk'>10 UK</SelectItem>
					<SelectItem value='11 uk'>11 UK</SelectItem>
				</SelectContent>
			</Select>
		</div>
	)
}

export default SizeSelector
