import { PromoCodesTable } from '@/components/promoCodes/PromoCodesTable'
import { getPromoCodes } from '@/lib/promoCodes'
import { Plus } from 'lucide-react'

import Link from 'next/link'

async function PromoCodesPage() {	
	const promoCodes = await getPromoCodes()
	const transformedPromoCodes = promoCodes.map(code => ({
		...code,
		description: code.description ?? undefined
	}))

	return (
		<>
			<div className='flex items-center justify-between mb-4 '>
				<h1 className='font-bold  text-2xl'>Promotional Codes</h1>
				<Link
					href='/admin/promoCodes/new'
					className='bg-black text-white px-4 py-2 rounded-md'>
					<Plus className='inline-block mr-2 h-4 w-4' />
					<span>New </span>
					<span className='hidden md:inline'>Promo Code</span>
				</Link>
			</div>
			<PromoCodesTable promoCodes={transformedPromoCodes} />
		</>
	)
}

export default PromoCodesPage
