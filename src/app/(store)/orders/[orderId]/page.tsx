import {formatCurrency} from '@/lib/formatCurrency'
import {getOrderById} from '@/lib/orders/orders'
import Image from 'next/image'

export default async function OrderDetails({
	params
}: {
	params: Promise<{orderId: string}>
}) {
	const {orderId} = await params
	const order = await getOrderById(orderId)

	const serializedOrder = {
		...order,
		createdAt: new Date(order.createdAt).toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		})
	}

	return (
		<div className='max-w-5xl mx-auto p-6 space-y-8'>
			<header className='flex flex-col sm:flex-row justify-between items-start sm:items-end border-b pb-6 gap-4'>
				<div>
					<h1 className='text-4xl font-bold text-gray-900 tracking-tight mb-8'>
						Order Details
					</h1>
					<p className='text-gray-500 mt-1'>
						Placed on {serializedOrder.createdAt} • Order #
						<span className='font-mono text-sm'>{order.orderNumber}</span>
					</p>
				</div>
				<button className='px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors'>
					Download Invoice (PDF)
				</button>
			</header>

			<div className='grid md:grid-cols-3 gap-8 bg-gray-50 p-6 rounded-xl border border-gray-100'>
				<section>
					<h3 className='text-sm uppercase tracking-wider font-bold text-gray-500 mb-2'>
						Customer
					</h3>
					<p className='text-sm font-medium text-gray-900'>
						{order.customerName}
					</p>
					<p className='text-sm text-gray-600'>{order.customerEmail}</p>
				</section>

				<section>
					<h3 className='text-sm uppercase tracking-wider font-bold text-gray-500 mb-2'>
						Payment Status
					</h3>
					<div className='flex items-center gap-2'>
						<span
							className={`h-2 w-2 rounded-full ${order.orderStatus === 'PAID' ? 'bg-green-500' : 'bg-yellow-500'}`}
						/>
						<p className='text-sm font-medium text-gray-900'>
							{order.orderStatus}
						</p>
					</div>
					<p className='text-xs text-gray-500 mt-1'>
						Stripe ID: {order.stripePaymentIntentId.slice(0, 12)}...
					</p>
				</section>

				<section>
					<h3 className='text-sm uppercase tracking-wider font-bold text-gray-500 mb-2'>
						Order Summary
					</h3>
					<div className='text-sm space-y-2'>
						<div className='flex justify-between text-gray-600'>
							<span>Subtotal</span>
							<span>{formatCurrency(order.totalPrice, order.currency)}</span>
						</div>
						{order.amountDiscounted > 0 && (
							<div className='flex justify-between text-red-600'>
								<span>Discount</span>
								<span>
									-{formatCurrency(order.amountDiscounted, order.currency)}
								</span>
							</div>
						)}
						<div className='flex justify-between font-bold text-lg pt-2 border-t border-gray-200 text-gray-900'>
							<span>Total</span>
							<span>{formatCurrency(order.totalPrice, order.currency)}</span>
						</div>
					</div>
				</section>
			</div>

			{/* 3. Items List */}
			<div className='space-y-6'>
				<h2 className='text-xl font-bold'>Items ({order.orderItems.length})</h2>
				<div className='border border-gray-200 rounded-lg overflow-hidden'>
					{order.orderItems.map((item, index) => (
						<div
							key={item.id}
							className={`flex flex-col sm:flex-row items-center gap-6 p-6 ${
								index !== order.orderItems.length - 1
									? 'border-b border-gray-100'
									: ''
							}`}>
							<div className='relative h-24 w-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden'>
								<Image
									alt={item.item.name}
									src={item.item.imageUrl}
									fill
									className='object-cover'
								/>
							</div>

							<div className='flex-1 text-center sm:text-left'>
								<h4 className='font-bold text-gray-900 hover:text-blue-600 transition-colors'>
									{item.item.name}
								</h4>
								<div className='flex flex-wrap justify-center sm:justify-start gap-4 mt-1 text-sm text-gray-500'>
									<p>
										Size:{' '}
										<span className='font-medium text-gray-900'>
											{item.size}
										</span>
									</p>
									<p>
										Qty:{' '}
										<span className='font-medium text-gray-900'>
											{item.quantity}
										</span>
									</p>
								</div>
							</div>

							<div className='text-right'>
								<p className='font-bold text-gray-900'>
									{formatCurrency(
										item.unitPrice * item.quantity,
										order.currency
									)}
								</p>
								<p className='text-xs text-gray-500'>
									{formatCurrency(item.unitPrice, order.currency)} each
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
