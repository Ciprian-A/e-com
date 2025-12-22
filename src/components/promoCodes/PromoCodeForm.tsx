'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
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
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { DatePicker } from '../DatePicker'

export const formSchema = z.object({
	title: z
		.string()
		.regex(
			/^[a-zA-Z0-9 ]+$/,
			'Title must contain only letters and numbers. Special characters (e.g., ! @ # $ %) are not permitted.'
		)
		.min(5, 'Promo code title must be at least 5 characters.')
		.max(32, 'Promo code title must be at most 32 characters.'),
	description: z
		.string()
		.max(100, 'Description must be at most 100 characters.')
		.refine(
			val => val === '' || /^[a-zA-Z0-9 ]+$/.test(val),
			'Description must contain only letters and numbers. Special characters (e.g., ! @ # $ %) are not permitted.'
		)
		.optional(),
	cuponCode: z
		.string()
		.regex(
			/^[a-zA-Z0-9 ]+$/,
			'Cupon Code must contain only letters and numbers. Special characters (e.g., ! @ # $ %) are not permitted.'
		)
		.min(5, 'Cupon code must be at least 5 characters.')
		.max(32, 'Cupon code must be at most 32 characters.'),
	discountAmount: z.coerce
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
	onSubmit: (formData: PromoCodeDataType) => Promise<void>
}
export type PromoCodeOutputType = z.output<typeof formSchema>
export type PromoCodeInputType = z.input<typeof formSchema>
export type PromoCodeDataType = z.infer<typeof formSchema>

export default function PromoCodeForm({
	formTitle,
	formDescription,
	onSubmit,
	initialTitle = '',
	initialDescription = '',
	initialCuponCode = '',
	initialDiscountAmount = 0,
	initialIsActive = false,
	initialStartDate = undefined,
	initialEndDate = undefined
}: PromoCodeFormType) {
	const form = useForm<
		PromoCodeInputType,
		PromoCodeDataType,
		PromoCodeOutputType
	>({
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
	const router = useRouter()
	const handleCancel = () => {
		form.reset()
		router.back()
	}
	const {isSubmitting} = form.formState
	const descriptionValue = form.watch('description') || ''
	const charCount = descriptionValue.length
	const charRemaining = 100 - charCount

	return (
		<Card className='w-2xs sm:w-sm md:w-md lg:w-2xl xl:w-3xl'>
			<CardHeader>
				<CardTitle className='text-2xl'>{formTitle}</CardTitle>
				<CardDescription>{formDescription}</CardDescription>
			</CardHeader>
			<FieldSeparator className='mb-3' />
			<CardContent>
				<form
					id='form-promo-code'
					onSubmit={form.handleSubmit(async (values: PromoCodeDataType) => {
						await onSubmit(values)
						toast('You submitted the following values:')
					})}>
					<FieldGroup>
						<Controller
							name='title'
							control={form.control}
							render={({field, fieldState}) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel
										className='text-md'
										htmlFor='form-promo-code-title'>
										Promo Code Title <span className='text-red-500'>*</span>
									</FieldLabel>
									<Input
										{...field}
										id='form-promo-code-title'
										aria-invalid={fieldState.invalid}
										placeholder='e.g., Special Discount'
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
									<FieldLabel
										className='text-md'
										htmlFor='form-promo-code-cuponCode'>
										Cupon Code <span className='text-red-500'>*</span>
									</FieldLabel>
									<Input
										{...field}
										id='form-promo-code-cuponCode'
										aria-invalid={fieldState.invalid}
										placeholder='e.g, PROMO20'
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
										<FieldLabel
											className='text-md'
											htmlFor='form-promo-code-discountAmount'>
											Discount Amount (%)
										</FieldLabel>
										<Input
											{...field}
											type='number'
											id='form-promo-code-discountAmount'
											aria-invalid={fieldState.invalid}
											placeholder='Type discount amount'
											value={field.value as number}
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
										<FieldLabel
											className='text-md'
											htmlFor='form-promo-code-isActive'>
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
									<FieldLabel
										className='text-md'
										htmlFor='form-promo-code-description'>
										Description
									</FieldLabel>
									<InputGroup>
										<InputGroupTextarea
											{...field}
											id='form-promo-code-description'
											placeholder='Include a short description about the newly created promo code'
											rows={3}
											className='min-h-24 resize-none'
											aria-invalid={fieldState.invalid}
										/>
										<InputGroupAddon align='block-end'>
											<InputGroupText
												className={`tabular-nums text-xs ${charRemaining < 20 ? 'text-orange-600 font-semibold' : ''}`}>
												{charCount}/100
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
										<FieldLabel
											className='text-md'
											htmlFor='form-promo-code-startDate'>
											Start Date <span className='text-red-500'>*</span>
										</FieldLabel>
										<DatePicker
											{...field}
											date={field.value as Date | undefined}
											onDateChange={date => field.onChange(date)}
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
										<FieldLabel
											className='text-md'
											htmlFor='form-promo-code-endDate'>
											End Date <span className='text-red-500'>*</span>
										</FieldLabel>
										<DatePicker
											{...field}
											date={field.value as Date | undefined}
											onDateChange={date => field.onChange(date)}
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
				<Field orientation='horizontal' className='flex sm:justify-end'>
					<Button
						type='button'
						variant='outline'
						onClick={handleCancel}
						className='w-full sm:w-min'
						disabled={isSubmitting}>
						Cancel
					</Button>
					<Button
						type='submit'
						form='form-promo-code'
						disabled={isSubmitting}
						className='w-full sm:w-min'>
						{isSubmitting ? (
							<>
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								Submitting...
							</>
						) : (
							'Submit'
						)}{' '}
					</Button>
				</Field>
			</CardFooter>
		</Card>
	)
}
