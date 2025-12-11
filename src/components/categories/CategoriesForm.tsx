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
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const formSchema = z.object({
	name: z
		.string()
		.regex(
			/^[a-zA-Z0-9 ]+$/,
			'Category name must contain only letters and numbers. Special characters (e.g., ! @ # $ %) are not permitted.'
		)
		.min(3, 'Category name must be at least 3 characters.')
		.max(32, 'Category name must be at most 32 characters.'),
	description: z
		.string()
		.max(100, 'Description must be at most 100 characters.')
		.refine(
			val => val === '' || /^[a-zA-Z0-9 ]+$/.test(val),
			'Description must contain only letters and numbers. Special characters (e.g., ! @ # $ %) are not permitted.'
		)
		.optional()
})
type CategoryFormType = {
	formTitle?: string
	formDescription?: string
	initialName?: string
	initialDescription?: string

	onSubmit: (formData: CategoryDataType) => Promise<void>
}

export type CategoryDataType = z.infer<typeof formSchema>

export default function CategoryForm({
	formTitle,
	formDescription,
	onSubmit,
	initialName = '',
	initialDescription = '',
}: CategoryFormType) {
	const form = useForm<CategoryDataType>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: initialName,
			description: initialDescription
		}
	})
	const router = useRouter()
	const handleCancel = () => {
		form.reset()
		router.back()
	}
	const {isSubmitting} = form.formState

	return (
		<Card className='w-full sm:w-xl '>
			<CardHeader>
				<CardTitle>{formTitle}</CardTitle>
				<CardDescription>{formDescription}</CardDescription>
			</CardHeader>
			<FieldSeparator className='mb-3' />
			<CardContent>
				<form
					id='form-category'
					onSubmit={form.handleSubmit(async (values: CategoryDataType) => {
						await onSubmit(values)
						toast('You submitted the following values:')
					})}>
					<FieldGroup>
						<Controller
							name='name'
							control={form.control}
							render={({field, fieldState}) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor='form-category-name'>
										Category Name
									</FieldLabel>
									<Input
										{...field}
										id='form-category-name'
										aria-invalid={fieldState.invalid}
										placeholder='Type category name'
										autoComplete='off'
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Controller
							name='description'
							control={form.control}
							render={({field, fieldState}) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor='form-category-description'>
										Description
									</FieldLabel>
									<InputGroup>
										<InputGroupTextarea
											{...field}
											id='form-category-description'
											placeholder='Type category description'
											rows={2}
											className='min-h-24 resize-none'
											aria-invalid={fieldState.invalid}
										/>
										<InputGroupAddon align='block-end'>
											<InputGroupText className='tabular-nums'>
												{field.value?.length}/100 characters
											</InputGroupText>
										</InputGroupAddon>
									</InputGroup>
									<FieldDescription>
										Include a short description about the the newly created
										category.
									</FieldDescription>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					</FieldGroup>
				</form>
			</CardContent>
			<FieldSeparator className='mb-3' />
			<CardFooter className=''>
				<Field orientation='horizontal' className=''>
					<Button type='button' variant='outline' onClick={handleCancel}>
						Cancel
					</Button>
					<Button type='submit' form='form-category' disabled={isSubmitting}>
						Submit
					</Button>
				</Field>
			</CardFooter>
		</Card>
	)
}
