import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import Link from 'next/link'

async function PromoCodePage() {
	const promoCodes = [
		{
			id: 'fc98174d-a40d-4a7e-b5de-d6ce195af5a5',
			name: 'PROMO25',
			description:
				'Promo code that will apply 25% discount on the total price.',
			discountAmount: 25,
			cuponCode: 'PROMO25',
			isActive: false,
			startDate: '2025-12-25T01:03:41.000Z',
			endDate: '2025-12-31T23:04:05.000Z',
			createdAt: '2025-12-05T01:04:27.340Z',
			updatedAt: '2025-12-05T01:04:22.000Z'
		}
	]
	console.log({promoCodes})
	return (
		<div className='bg-green-400 h-full'>
			<h1>Promotional Codes</h1>
			<Table className='bg-blue-400 relative'>
				<TableCaption>A list of your recent promotional codes.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[100px]'>Name</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Discount Amount</TableHead>
						<TableHead className='text-right'>Status</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{promoCodes.map(promoCode => (
						<TableRow key={promoCode.id}>
							<TableCell className='font-medium'>
								<Link href={`/admin/promoCode/${promoCode.id}/edit`}>
									{promoCode.name}
								</Link>
							</TableCell>
							<TableCell>{promoCode.description}</TableCell>
							<TableCell>{promoCode.discountAmount}</TableCell>
							<TableCell className='text-right'>
								{promoCode.isActive ? 'Active' : 'Inactive'}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter className=''>
					<TableRow>
						<TableCell colSpan={3}>Total</TableCell>
						<TableCell className='text-right'>{promoCodes.length}</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	)
}

export default PromoCodePage
