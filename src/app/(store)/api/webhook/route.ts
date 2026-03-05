import {sendOrderConfirmationEmail} from '@/lib/mail'
import {createOrder} from '@/lib/orders/actions/orders'
import stripe from '@/lib/stripe'
import {headers} from 'next/headers'
import {NextRequest, NextResponse} from 'next/server'
import Stripe from 'stripe'
import {prisma} from '../../../../../config/db'

export async function POST(req: NextRequest) {
	const body = await req.text()
	const headersList = await headers()
	const sig = headersList.get('stripe-signature')

	if (!sig) {
		return NextResponse.json({error: 'Missing Stripe signature'}, {status: 400})
	}
	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

	if (!webhookSecret) {
		return NextResponse.json(
			{
				error: 'Stripe webhook secret is not set'
			},
			{status: 400}
		)
	}

	let event: Stripe.Event
	try {
		event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
	} catch (error) {
		return NextResponse.json({error: `Webhook Error: ${error}`}, {status: 400})
	}

	if (
		event.type === 'checkout.session.completed' ||
		event.type === 'checkout.session.async_payment_succeeded'
	) {
		const session = event.data.object as Stripe.Checkout.Session
		try {
			// Create order in database
			const order = await createOrder(session)
			console.log('Order created in Database:', order)

			// Retrieve full Stripe session with expanded payment method

			const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
				expand: ['payment_intent.payment_method']
			})

			// Extract card details safely
			const paymentIntent = fullSession.payment_intent as Stripe.PaymentIntent
			const paymentMethod = paymentIntent.payment_method as Stripe.PaymentMethod

			const cardBrand = paymentMethod?.card?.brand ?? 'card'
			const last4 = paymentMethod?.card?.last4 ?? '****'

			// Fetch order items from DB to send in email
			const orderItems = await prisma.orderItem.findMany({
				where: {orderId: order.orderNumber},
				include: {
					item: true // assuming relation exists
				}
			})
			console.log('WEBHOOK ORDER ITEMS=>>>>>>', {orderItems})
			// Send confirmation email
			await sendOrderConfirmationEmail({
				to: order.customerEmail,
				order,
				items: orderItems,
				cardBrand,
				last4
			})

			console.log('Confirmation email sent successfully')
		} catch (error) {
			console.log('Error creating order:', error)
			return NextResponse.json({error: 'Error creating order'}, {status: 500})
		}
	}
	return NextResponse.json({received: true}, {status: 201})
}
