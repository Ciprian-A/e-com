import useStore from '@/app/(store)/store'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
const QuantitySelector = ({
	qty,
	productId
}: {
	qty: number
	productId: string
}) => {
	
	const {getSelectedQuantity, setSelectedQuantity} = useStore()

	const handleValueChange = (value: string) => {
		setSelectedQuantity(productId, Number(value))
	}
	const selectedQty = getSelectedQuantity(productId)
	return (
		<div>
			<Select
				value={`${selectedQty}`}
				onValueChange={value => handleValueChange(value)}>
				<SelectTrigger className='w-full'>
					<SelectValue placeholder='Select quantity' />
				</SelectTrigger>
				<SelectContent>
					{Array.from({length: qty}, (_, idx) => idx + 1).map(n => (
						<SelectItem key={n} value={`${n}`}>
							{n}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}

export default QuantitySelector
