import {
	Body,
	Button,
	Column,
	Container,
	Head,
	Heading,
	Html,
	Img,
	Row,
	Section,
	Text
} from '@react-email/components'
interface EmailProps {
	orderId: string
	items: any[]
	total: number
	cardBrand: string
	last4: string
}
export default function OrderConfirmationEmail({
	orderId,
	items,
	total,
	cardBrand,
	last4
}: EmailProps) {
	return (
		<Html lang='en' dir='ltr'>
			<Head />
			<Body
				style={{
					fontFamily: 'Arial, sans-serif',
					padding: '20px'
				}}>
				<Container
					style={{
						width: '480px',
						margin: '0 auto',
						backgroundColor: 'white'
					}}>
					<Section>
						<Img
							src='https://shoppy.dev-ltd.cloud/logoLight.png'
							width={120}
							height={40}
							alt='Shoppy'
							style={{
								marginBottom: '16px'
							}}
						/>
					</Section>
					<Section>
						<Heading
							as='h1'
							style={{
								fontWeight: '700',
								fontSize: '30px',
								marginBottom: '8px',
								margin: '0px 8px'
							}}>
							Thanks for shopping. Your order is confirmed.
						</Heading>
					</Section>
					<Section style={{margin: '20px 0'}}>
						<Row>
							<Column>
								<Button
									href={`https://shoppy.dev-ltd.cloud/orders/${orderId}`}
									style={{
										backgroundColor: '#000',
										color: '#fff',
										padding: '16px 40px',
										textDecoration: 'none',
										borderTopLeftRadius: '50px',
										borderTopRightRadius: '50px',
										borderBottomLeftRadius: '50px',
										borderBottomRightRadius: '50px'
									}}>
									View Order Details
								</Button>
							</Column>
						</Row>
					</Section>
					<Section>
						<Heading
							as='h2'
							style={{
								fontSize: '24px',
								fontWeight: 'bold',
								marginTop: '16px',
								marginBottom: '16px',
								padding: '0px 8px'
							}}>
							Your Order Details
						</Heading>
						<Text style={{paddingLeft: '8px'}}>
							Order <span style={{fontWeight: 'bold'}}>#{orderId}</span>
						</Text>
						<Section style={{marginTop: '20px'}}>
							{items.map(orderItem => (
								<Row
									key={orderItem.id}
									style={{
										marginBottom: '20px',
										borderBottom: '1px solid #e5e5e5',
										paddingBottom: '8px'
									}}>
									{/* Product Image */}
									<Column style={{width: '100px'}}>
										<Img
											src={orderItem.item.imageUrl}
											alt={orderItem.item.name}
											width={100}
											height={100}
											style={{
												// border: '1px solid red',
												maxHeight: '100px',
												objectFit: 'cover',
												marginTop: '20px',
												marginBottom: '20px'
											}}
										/>
									</Column>
									{/* Product Details */}
									<Column style={{width: '60%'}}>
										<Text
											style={{
												fontWeight: '600',
												fontSize: '16px',
												marginBottom: '4px'
											}}>
											{orderItem.item.name}
										</Text>

										{orderItem.size && (
											<Text style={{fontSize: '14px', color: '#555'}}>
												Size: {orderItem.size}
											</Text>
										)}
										<Text style={{fontSize: '14px', color: '#555'}}>
											Quantity: {orderItem.quantity}
										</Text>
									</Column>
									{/* Price */}
									<Column align='right'>
										<Text
											style={{
												fontWeight: '600',
												fontSize: '16px'
											}}>
											£{orderItem.unitPrice}
										</Text>
									</Column>
								</Row>
							))}
						</Section>
						<Section
							style={{
								backgroundColor: '#f7f7f7',
								padding: '16px',
								marginTop: '24px',
								marginBottom: '10px',
								borderTopLeftRadius: '15px',
								borderTopRightRadius: '15px',
								borderBottomLeftRadius: '15px',
								borderBottomRightRadius: '15px'
							}}>
							<Row>
								<Column>
									<Text style={{fontWeight: '600'}}>Order Total</Text>
								</Column>

								<Column align='right'>
									<Text style={{fontWeight: '600'}}>£{total}</Text>
								</Column>
							</Row>

							<Row>
								<Column>
									<Text>Payment Method</Text>
								</Column>
								<Column align='right'>
									<Text>
										{cardBrand.toUpperCase()} •••• {last4}
									</Text>
								</Column>
							</Row>
						</Section>
					</Section>
					<Section style={{margin: '20px 0'}}>
						<Row>
							<Column>
								<Button
									href={`https://shoppy.dev-ltd.cloud`}
									style={{
										backgroundColor: '#000',
										color: '#fff',
										padding: '16px 40px',
										textDecoration: 'none',
										borderTopLeftRadius: '50px',
										borderTopRightRadius: '50px',
										borderBottomLeftRadius: '50px',
										borderBottomRightRadius: '50px'
									}}>
									Continue Shopping
								</Button>
							</Column>
						</Row>
					</Section>
				</Container>
			</Body>
		</Html>
	)
}
