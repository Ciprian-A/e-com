import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion'
interface ProductDetailsProps {
	trigger: string
	children: React.ReactNode
}
const ProductDetails = ({trigger, children}: ProductDetailsProps) => {
	return (
		<Accordion type='single' collapsible>
			<AccordionItem value='item-1'>
				<AccordionTrigger>{trigger}</AccordionTrigger>
				<AccordionContent>{children} </AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}

export default ProductDetails
