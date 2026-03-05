import OrderConfirmationEmail from '@/components/emails/OrderConfirmationEmail'
import {Resend} from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOrderConfirmationEmail({
	to,
	order,
	items,
	cardBrand,
	last4
}: {
	to: string
	order: any
	items: any[]
	cardBrand: string
	last4: string
}) {
	return resend.emails.send({
		from: 'Shoppy <no-reply@orders.dev-ltd.cloud>',
		to,
		subject: `Order Confirmation #${order.orderNumber}`,
		react: OrderConfirmationEmail({
			orderId: order.orderNumber,
			items,
			total: order.totalPrice,
			cardBrand,
			last4
		})
	})
}
