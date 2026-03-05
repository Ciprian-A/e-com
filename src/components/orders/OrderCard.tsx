'use client'

import {formatCurrency} from '@/lib/formatCurrency'
import {OrderDTO} from '@/types/item'
import Image from 'next/image'
import Link from 'next/link'
import BuyAgainButton from './BuyAgainButton'

function OrderCard({order}: {order: OrderDTO}) {
	const displayItems = order.orderItems?.slice(0, 4) || []
	const remainingCount = (order.orderItems?.length || 0) - displayItems.length

	return (
		<div className='bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden mb-6'>
			{/* Header: Order Meta Info */}
			<div className='bg-gray-50 p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4'>
				<div className='flex gap-8'>
					<div>
						<p className='text-xs text-gray-500 uppercase font-semibold'>
							Order Placed
						</p>
						<p className='text-sm font-medium'>
							{order.createdAt
								? new Date(order.createdAt).toLocaleDateString('en-US', {
										dateStyle: 'medium'
									})
								: 'N/A'}
						</p>
					</div>
					<div>
						<p className='text-xs text-gray-500 uppercase font-semibold'>
							Total
						</p>
						<p className='text-sm font-bold'>
							{formatCurrency(order.totalPrice ?? 0, order.currency)}
						</p>
					</div>
				</div>

				<div className='text-right'>
					<p className='text-xs text-gray-500 uppercase font-semibold'>
						Order #
					</p>
					<p className='text-sm font-mono text-gray-700'>{order.orderNumber}</p>
				</div>
			</div>

			<div className='p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6'>
				<div className='flex flex-1 items-center gap-4'>
					<div className='flex -space-x-2 overflow-hidden'>
						{displayItems.map(item => (
							<div
								key={`${order.orderNumber}-${item.itemId}-${crypto.randomUUID().slice(0.5)}`}
								className='relative h-16 w-16 rounded-md border-2 border-white bg-gray-100 overflow-hidden flex-shrink-0'>
								{item?.item?.imageUrl && (
									<Image
										src={item.item.imageUrl}
										alt={item.item.name ?? ''}
										className='object-cover'
										fill
										sizes='64px'
									/>
								)}
							</div>
						))}
						{remainingCount > 0 && (
							<div className='h-16 w-16 rounded-md border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600'>
								+{remainingCount}
							</div>
						)}
					</div>

					<div className='flex flex-col'>
						<span
							className={`w-fit px-3 py-1 rounded-full text-xs font-bold mb-2 ${
								order.orderStatus === 'PAID'
									? 'bg-green-100 text-green-700'
									: 'bg-blue-100 text-blue-700'
							}`}>
							{order.orderStatus}
						</span>
						<p className='text-sm text-gray-600'>
							{order.orderItems?.length}{' '}
							{order.orderItems?.length === 1 ? 'item' : 'items'} in this order
						</p>
					</div>
				</div>

				<div className='flex flex-row md:flex-col gap-2'>
					<Link
						href={`/orders/${order.orderNumber}`}
						className='flex-1 text-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors'>
						View Order
					</Link>
					<BuyAgainButton orderItems={order.orderItems} />
				</div>
			</div>
		</div>
	)
}

export default OrderCard
