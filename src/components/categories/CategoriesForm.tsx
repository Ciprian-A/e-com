'use client'

import {zodResolver} from '@hookform/resolvers/zod'
import {Controller, useForm} from 'react-hook-form'
import * as z from 'zod'

import {Button} from '@/components/ui/button'
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
import {Input} from '@/components/ui/input'
import {
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	InputGroupTextarea
} from '@/components/ui/input-group'
import {Loader2, X} from 'lucide-react'
import Image from 'next/image'
import {useRouter} from 'next/navigation'
import {useRef} from 'react'
import {UploadFile} from '../items/UploadFile'

const FILE_SIZE = 5 * 1024 * 1024

export const formSchema = z.object({
	name: z
		.string()
		.regex(
			/^[a-zA-Z0-9'\s-]+$/,
			'Category name must contain only letters and numbers. Special characters (e.g., ! @ # $ %) are not permitted.'
		)
		.min(3, 'Category name must be at least 3 characters.')
		.max(32, 'Category name must be at most 32 characters.'),
	description: z
		.string()
		.max(100, 'Description must be at most 100 characters.')
		.refine(
			val => val === '' || /^[a-zA-Z0-9,.&' -]+$/.test(val),
			'Description must contain only letters and numbers. Special characters (e.g., ! @ # $ %) are not permitted.'
		)
		.optional(),
	categoryImage: z
		.union([z.instanceof(File), z.url(), z.undefined()])
		.refine(
			f => f instanceof File || typeof f === 'string',
			'Image must be a file or valid URL'
		)
		.refine(
			file => {
				if (!file || typeof file === 'string') return true
				return file.size <= FILE_SIZE
			},
			`Max file size is ${FILE_SIZE / (1024 * 1024)}MB`
		)
		.optional()
})

type CategoryFormType = {
	formTitle?: string
	formDescription?: string
	initialName?: string
	initialDescription?: string
	initialCategoryImage?: File | string | null | undefined

	onSubmit: (formData: FormData) => Promise<void>
}

export type CategoryDataType = z.infer<typeof formSchema>

export default function CategoryForm({
	formTitle,
	formDescription,
	onSubmit,
	initialName = '',
	initialDescription = '',
	initialCategoryImage = ''
}: CategoryFormType) {
	const photoRef = useRef<HTMLInputElement>(null)
	const form = useForm<CategoryDataType>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: initialName,
			description: initialDescription,
			categoryImage:
				initialCategoryImage && typeof initialCategoryImage === 'string'
					? initialCategoryImage
					: initialCategoryImage instanceof File
						? initialCategoryImage
						: undefined
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
					id='form-category'
					onSubmit={form.handleSubmit(async (data: CategoryDataType) => {
						const formData = new FormData()

						formData.append('name', data.name)
						formData.append('description', data.description ?? '')
						formData.append('categoryImage', data.categoryImage ?? '')
						await onSubmit(formData)
					})}>
					<FieldGroup>
						<Controller
							name='name'
							control={form.control}
							render={({field, fieldState}) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel className='text-md' htmlFor='form-category-name'>
										Category Name <span className='text-red-500'>*</span>
									</FieldLabel>
									<Input
										{...field}
										id='form-category-name'
										aria-invalid={fieldState.invalid}
										placeholder='e.g., Shoes'
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
									<FieldLabel
										className='text-md'
										htmlFor='form-category-description'>
										Description
									</FieldLabel>
									<InputGroup>
										<InputGroupTextarea
											{...field}
											id='form-category-description'
											placeholder='Include a short description about the newly created category'
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
										Include a short description about the the newly created
										category.
									</FieldDescription>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Controller
							name='categoryImage'
							control={form.control}
							render={({field, fieldState}) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor='form-category-image' className='text-md'>
										Category Image
									</FieldLabel>
									<Input
										ref={photoRef}
										hidden
										type='file'
										accept='image/*'
										id='form-category-image'
										aria-invalid={fieldState.invalid}
										onChange={e => {
											field.onChange(e.target.files?.[0] ?? null)
										}}
									/>
									{!field.value ? (
										<UploadFile
											type='image'
											onClick={() => photoRef.current?.click()}
											css='border-2 border-dashed hover:border-gray-400 transition-colors'
											title='Upload Image'
											description={`Upload an image to label your category.`}
										/>
									) : (
										<div className='mt-2 relative max-w-max'>
											<Image
												src={
													typeof field.value === 'string'
														? field.value
														: URL.createObjectURL(field.value)
												}
												width={100}
												height={100}
												alt='Image Category'
												className='h-32 w-32 object-cover rounded-lg border-2 border-gray-200'
											/>
											<Button
												variant='secondary'
												size='icon'
												type='button'
												className='absolute top-1 right-1 h-6 w-6 rounded-full shadow-md bg-white/70'
												aria-label='Remove image'
												onClick={() => {
													// Revoke object URL if needed
													if (field.value instanceof File) {
														URL.revokeObjectURL(
															URL.createObjectURL(field.value)
														)
													}

													// Clear the field
													field.onChange(null)

													// Reset the input element
													if (photoRef.current) {
														photoRef.current.value = ''
													}
												}}>
												<X className='h-4 w-4' />
											</Button>
										</div>
									)}
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
				<Field orientation='horizontal' className='flex sm:justify-end'>
					<Button
						className='w-full sm:w-min'
						type='button'
						variant='outline'
						onClick={handleCancel}>
						Cancel
					</Button>
					<Button
						className='w-full sm:w-min'
						type='submit'
						form='form-category'
						disabled={isSubmitting}>
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
