'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSeparator
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	InputGroupTextarea
} from '@/components/ui/input-group'
import { Switch } from '@/components/ui/switch'
import { DatePicker } from './DatePicker'

const formSchema = z.object({
	title: z
		.string()
		.min(5, 'Promo code title must be at least 5 characters.')
		.max(32, 'Promo code title must be at most 32 characters.'),
	description: z
		.string()
		.min(20, 'Description must be at least 20 characters.')
		.max(100, 'Description must be at most 100 characters.'),
	cuponCode: z
		.string()
		.min(5, 'Cupon code must be at least 5 characters.')
		.max(32, 'Cupon code must be at most 32 characters.'),
	discountAmount: z
		.number()
		.min(1, 'Discount amount must be at least 1.')
		.max(100, 'Discount amount must be at most 100.'),
	isActive: z.boolean(),
	startDate: z.date(),
	endDate: z.date()
})
type PromoCodeFormType = {
	formTitle?: string
	formDescription?: string
	initialTitle?: string
	initialDescription?: string
	initialCuponCode?: string
	initialDiscountAmount?: number
	initialIsActive?: boolean
	initialStartDate?: Date
	initialEndDate?: Date
}
export default function PromoCodeForm({
	formTitle,
	formDescription,
	initialTitle = '',
	initialDescription = '',
	initialCuponCode = '',
	initialDiscountAmount = 0,
	initialIsActive = false,
	initialStartDate = undefined,
	initialEndDate = undefined
}: PromoCodeFormType) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: initialTitle,
			description: initialDescription,
			cuponCode: initialCuponCode,
			discountAmount: initialDiscountAmount,
			isActive: initialIsActive,
			startDate: initialStartDate,
			endDate: initialEndDate
		}
	})

	function onSubmit(data: z.infer<typeof formSchema>) {
		toast('You submitted the following values:', {
			description: (
				<pre className='bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4'>
					<code>{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
			position: 'bottom-right',
			classNames: {
				content: 'flex flex-col gap-2'
			},
			style: {
				'--border-radius': 'calc(var(--radius)  + 4px)'
			} as React.CSSProperties
		})
	}
	console.log({initialDescription})
	return (
		<Card className='w-full sm:w-xl '>
			<CardHeader>
				<CardTitle>{formTitle}</CardTitle>
				<CardDescription>{formDescription}</CardDescription>
			</CardHeader>
			<FieldSeparator className='mb-3' />
			<CardContent>
				<form id='form-promo-code' onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup>
						<Controller
							name='title'
							control={form.control}
							render={({field, fieldState}) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor='form-promo-code-title'>
										Promo Code Title
									</FieldLabel>
									<Input
										{...field}
										id='form-promo-code-title'
										aria-invalid={fieldState.invalid}
										placeholder='Type promo code title'
										autoComplete='off'
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Controller
							name='cuponCode'
							control={form.control}
							render={({field, fieldState}) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor='form-promo-code-cuponCode'>
										Cupon Code
									</FieldLabel>
									<Input
										{...field}
										id='form-promo-code-cuponCode'
										aria-invalid={fieldState.invalid}
										placeholder='Type cupon code'
										autoComplete='off'
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<FieldGroup className='flex flex-row justify-between items-center '>
							<Controller
								name='discountAmount'
								control={form.control}
								render={({field, fieldState}) => (
									<Field data-invalid={fieldState.invalid} className='w-screen'>
										<FieldLabel htmlFor='form-promo-code-discountAmount'>
											Discount Amount (%)
										</FieldLabel>
										<Input
											{...field}
											type='number'
											max={100}
											id='form-promo-code-discountAmount'
											aria-invalid={fieldState.invalid}
											placeholder='Type discount amount'
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
							<Controller
								name='isActive'
								control={form.control}
								render={({field, fieldState}) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor='form-promo-code-isActive'>
											Is Active
										</FieldLabel>
										<Switch
											className='max-w-9 my-2'
											id='form-promo-code-isActive'
											checked={field.value}
											onCheckedChange={field.onChange}
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
						</FieldGroup>
						<Controller
							name='description'
							control={form.control}
							render={({field, fieldState}) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor='form-promo-code-description'>
										Description
									</FieldLabel>
									<InputGroup>
										<InputGroupTextarea
											{...field}
											id='form-promo-code-description'
											placeholder='Type promo code description'
											rows={2}
											className='min-h-24 resize-none'
											aria-invalid={fieldState.invalid}
										/>
										<InputGroupAddon align='block-end'>
											<InputGroupText className='tabular-nums'>
												{field.value.length}/100 characters
											</InputGroupText>
										</InputGroupAddon>
									</InputGroup>
									<FieldDescription>
										Include details about the promo code, such as its purpose
										and any restrictions.
									</FieldDescription>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<FieldGroup className='flex flex-col sm:flex-row sm:gap-4 '>
							<Controller
								name='startDate'
								control={form.control}
								render={({field, fieldState}) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor='form-promo-code-startDate'>
											Start Date
										</FieldLabel>
										<DatePicker
											{...field}
											date={field.value}
											id='form-promo-code-startDate'
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
							<Controller
								name='endDate'
								control={form.control}
								render={({field, fieldState}) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor='form-promo-code-endDate'>
											End Date
										</FieldLabel>
										<DatePicker
											{...field}
											date={field.value}
											id='form-promo-code-endDate'
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
						</FieldGroup>
					</FieldGroup>
				</form>
			</CardContent>
			<FieldSeparator className='mb-3' />
			<CardFooter className=''>
				<Field orientation='horizontal' className=''>
					<Button type='button' variant='outline' onClick={() => form.reset()}>
						Cancel
					</Button>
					<Button type='submit' form='form-rhf-demo'>
						Submit
					</Button>
				</Field>
			</CardFooter>
		</Card>
	)
}
