import {createOrder} from '@/lib/orders/actions/orders'
import stripe from '@/lib/stripe'
import {headers} from 'next/headers'
import {NextRequest, NextResponse} from 'next/server'
import Stripe from 'stripe'

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
			const order = await createOrder(session)
			console.log('Order created in Database:', order)
		} catch (error) {
			console.log('Error creating order in Database:', error)
			return NextResponse.json({error: 'Error creating order'}, {status: 500})
		}
	}
	return NextResponse.json({received: true}, {status: 201})
}
