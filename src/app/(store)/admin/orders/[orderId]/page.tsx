import {formatCurrency} from '@/lib/formatCurrency'
import {getOrderById} from '@/lib/orders/orders'
import Image from 'next/image'

async function Order({params}: {params: Promise<{orderId: string}>}) {
	const {orderId} = await params
	const order = await getOrderById(orderId)
	return (
		<>
			<div className='w-2xs sm:w-sm md:w-md lg:w-2xl xl:w-3xl'>
				<div className='bg-white p-4 sm:p-8 reounded-xl shadow-lg w-full max-w-4xl'>
					<h1 className='text-2xl font-bold text-gray-900  mb-8'>
						Order Details Page
					</h1>

					<div className='space-y- sm:space-y-8'>
						<div
							key={order.orderNumber}
							className='bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden'>
							<div className='p-4 sm:p-6 border-b border-gray-200 '>
								<div className='flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4'>
									<div>
										<p className='text-sm text-gray-600 mb-1 font-bold'>
											Order Number
										</p>
										<p className='font-mono text-sm text-green-600 break-all'>
											{order.orderNumber}
										</p>
									</div>
									<div className='sm:text-right'>
										<p className='text-sm text-gray-600 mb-1'>Order Date</p>
										<p className='font-medium'>
											{order.createdAt
												? new Date(order.createdAt).toLocaleDateString()
												: 'N/A'}
										</p>
									</div>
								</div>

								<div className='flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center'>
									<div className='flex items-center'>
										<span className='text-sm mr-2'>Status:</span>
										<span
											className={`px-3 py-1 rounded-full text-sm ${order.orderStatus === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
											{order.orderStatus}
										</span>
									</div>
									<div className='sm:text-right'>
										<p className='text-sm text-gray-600 mb-1'>Total Amount</p>
										<p className='font-bold text-lg'>
											{formatCurrency(order.totalPrice ?? 0, order.currency)}
										</p>
									</div>
								</div>
								{order.amountDiscounted ? (
									<div className='mt-4 p-3 sm:p-4 bg-red-50 rounded-lg'>
										<p className='text-red-600 font-medium mb-1 text-sm sm:text-base'>
											Discount Applied:{' '}
											{formatCurrency(
												order.totalPrice ?? 0 + order.amountDiscounted,
												order.currency
											)}
										</p>
									</div>
								) : null}
							</div>
							<div className='px-4 py-3 sm:px-6 sm:py-4'>
								<p className='text-sm font-semibld text-gray-600 mb-3 sm:mb-4'>
									Order Items
								</p>
								<div className='space-y-3 sm:space-y-4'>
									{order.orderItems?.map(item => (
										<div
											key={item.itemId + crypto.randomUUID().slice(0, 5)}
											className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-2 border-b last:border-b-0'>
											<div className='flex items-center gap-3 sm:gap-4'>
												{item?.item.imageUrl && (
													<div className='relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 rounded-md overflow-hidden'>
														<Image
															src={item?.item.imageUrl}
															alt={item?.item.name ?? ''}
															className='object-cover'
															fill
														/>
													</div>
												)}
												<div>
													<p className='font-medium text-sm sm:text-base'>
														{item?.item.name}
													</p>
													<p className='text-sm text-gray-600'>
														Quantity: {item.quantity ? item.quantity : 'N/A'}
													</p>
													<p className='text-sm text-gray-600'>
														Size: {item.size ? item.size : 'N/A'}
													</p>
												</div>
											</div>
											<p className='font-medium text-right'>
												{item?.item.price && item.quantity
													? formatCurrency(
															item?.item.price * (item.quantity || 0),
															order.currency
														)
													: 'N/A'}
											</p>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Order
