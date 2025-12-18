'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRef, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
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
import { CircleMinus, CirclePlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { MultiSelect } from '../MultiSelect'
import { UploadFile } from './UploadFile'

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
		.optional(),
	price: z.coerce.number().positive('Price must be greater than 0'),
	productDetails: z
		.array(
			z.object({
				key: z.string().min(1, 'Key is required'),
				value: z.string().min(1, 'Value is required')
			})
		)
		.optional(),
	imageGallery: z
		.array(z.any())
		.refine(
			files => files.every(f => f instanceof File || typeof f === 'string'),
			'All gallery items must be files or valid URLs'
		)
		.max(5, 'You can upload up to 5 images')
		.optional(),
	categories: z.array(z.uuid()).optional(),
	variants: z
		.array(
			z.object({
				size: z.string().min(1, 'Size is required'),
				stock: z.coerce.number().int().nonnegative('Stock must be >= 0')
			})
		)
		.optional()
})

type ItemFormType = {
	formTitle?: string
	formDescription?: string
	categories: {
		id: string
		name: string
	}[]
	initialName?: string
	initialDescription?: string
	initialPrice?: number
	initialProductDetails?: {key: string; value: string}[]
	initialImageUrl?: File | string | null
	initialImageGallery?: (File | string)[]
	initialCategories?: {id: string; name: string}[]
	initialVariants?: {size: string; stock: number}[]

	onSubmit: (formData: FormData) => Promise<void>
}

export type ItemDataType = z.infer<typeof formSchema>
export type ItemDataOutputType = z.output<typeof formSchema>
export type ItemDataInputType = z.input<typeof formSchema>

export default function ItemForm({
	formTitle,
	formDescription,
	categories,
	onSubmit,
	initialName = '',
	initialDescription = '',
	initialPrice = 0,
	initialProductDetails = [],
	initialImageGallery = [],
	initialCategories = [{id: '', name: ''}],
	initialVariants = []
}: ItemFormType) {
	const [localError, setLocalError] = useState<string | null>(null)
	const galleryPhotoRef = useRef<HTMLInputElement>(null)
	const form = useForm<ItemDataInputType, ItemDataType, ItemDataOutputType>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: initialName,
			description: initialDescription,
			price: initialPrice,
			productDetails: initialProductDetails,
			imageGallery: initialImageGallery,
			categories: initialCategories.map(cat => cat.id),
			variants: initialVariants
		}
	})
	const MAX_IMAGES = 5
	const {
		fields: productDetailFields,
		append: appendProductDetail,
		update: updateProductDetails,
		remove: removeProductDetail
	} = useFieldArray({
		control: form.control,
		name: 'productDetails'
	})

	const {
		fields: variantFields,
		append: appendVariant,
		update: updateVariant,
		remove: removeVariant
	} = useFieldArray({
		control: form.control,
		name: 'variants'
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
					id='form-item'
					onSubmit={form.handleSubmit(async (data: ItemDataType) => {
						const formData = new FormData()

						// Simple fields
						formData.append('name', data.name)
						formData.append('description', data.description ?? '')
						formData.append('price', String(data.price))

						// Structured fields → JSON strings
						formData.append(
							'product-details',
							JSON.stringify(data.productDetails ?? [])
						)
						formData.append('categories', JSON.stringify(data.categories ?? []))
						formData.append('variants', JSON.stringify(data.variants ?? []))

						// Files
						if (data.imageGallery && data.imageGallery.length > 0) {
							data.imageGallery.forEach(file => {
								formData.append('gallery', file)
							})
						}
						await onSubmit(formData)
					})}>
					<FieldGroup>
						<Controller
							name='name'
							control={form.control}
							render={({field, fieldState}) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor='form-item-name'>Item Name</FieldLabel>
									<Input
										{...field}
										id='form-item-name'
										aria-invalid={fieldState.invalid}
										placeholder='Type item name'
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
									<FieldLabel htmlFor='form-item-description'>
										Description
									</FieldLabel>
									<InputGroup>
										<InputGroupTextarea
											{...field}
											id='form-item-description'
											placeholder='Type item description'
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
										item.
									</FieldDescription>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Controller
							name='price'
							control={form.control}
							render={({field: {onChange, value, ...field}, fieldState}) => (
								<Field data-invalid={fieldState.invalid} className=''>
									<FieldLabel htmlFor='form-item-price'>Price(£)</FieldLabel>
									<Input
										{...field}
										type='number'
										id='form-item-price'
										aria-invalid={fieldState.invalid}
										placeholder='0.00'
										value={
											(value as number) === 0 || Number.isNaN(value as number)
												? ''
												: (value as number)
										}
										onChange={e => {
											const val = e.target.value
											onChange(val === '' ? 0 : parseFloat(val))
										}}
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						{/* Product Details */}
						<div className='flex justify-between items-center'>
							<FieldLabel htmlFor='form-product-details' className='flex'>
								Product Details
							</FieldLabel>
							<Button
								type='button'
								onClick={() => appendProductDetail({key: '', value: ''})}>
								+ Add Details
							</Button>
						</div>
						<FieldGroup>
							{productDetailFields.map((field, index) => (
								<FieldGroup key={field.id}>
									<FieldGroup className='flex flex-row gap-2 mt-2'>
										<Controller
											name={`productDetails.${index}.key`}
											control={form.control}
											render={({field, fieldState}) => (
												<Field data-invalid={fieldState.invalid} className=''>
													<FieldLabel
														htmlFor={`form-product-details-key-${index}`}>
														Key
													</FieldLabel>
													<Input
														{...field}
														id={`form-product-details-key-${index}`}
														aria-invalid={fieldState.invalid}
														placeholder='Type key'
														autoComplete='off'
													/>
													{fieldState.invalid && (
														<FieldError errors={[fieldState.error]} />
													)}
												</Field>
											)}
										/>
										<Controller
											name={`productDetails.${index}.value`}
											control={form.control}
											render={({field, fieldState}) => (
												<Field data-invalid={fieldState.invalid} className=''>
													<FieldLabel htmlFor='form-product-details-value'>
														Value
													</FieldLabel>
													<Input
														{...field}
														id='form-product-details-value'
														aria-invalid={fieldState.invalid}
														placeholder='Type value'
														autoComplete='off'
													/>
													{fieldState.invalid && (
														<FieldError errors={[fieldState.error]} />
													)}
												</Field>
											)}
										/>
										<Button
											title='Remove Row'
											className='self-end cursor-pointer'
											type='button'
											variant='outline'
											onClick={() => {
												const currentKey = form.getValues(
													`productDetails.${index}.key`
												)
												const currentValue = form.getValues(
													`productDetails.${index}.value`
												)
												const totalRows = productDetailFields.length
												if (!currentKey && !currentValue) {
													if (totalRows > 1) {
														removeProductDetail(index) // remove empty row if multiple exist
													} else {
														// clear fields but keep row
														updateProductDetails(index, {key: '', value: ''})
													}
												} else {
													removeProductDetail(index) // remove filled row
												}
											}}>
											<CircleMinus />
										</Button>
									</FieldGroup>
								</FieldGroup>
							))}
							{!!productDetailFields.length && (
								<Button
									type='button'
									className='max-w-max'
									onClick={() => appendProductDetail({key: '', value: ''})}>
									<CirclePlus /> Add Another
								</Button>
							)}
						</FieldGroup>
						{/* Variants */}
						<div className='flex justify-between items-center'>
							<FieldLabel htmlFor='form-product-variants'>
								Product Variants
							</FieldLabel>
							<Button
								type='button'
								onClick={() => appendVariant({size: '', stock: 0})}>
								+ Add Variants
							</Button>
						</div>
						<FieldGroup>
							{variantFields.map((field, index) => (
								<FieldGroup key={field.id}>
									<FieldGroup className='flex flex-row gap-2 mt-2'>
										<Controller
											name={`variants.${index}.size`}
											control={form.control}
											render={({field, fieldState}) => (
												<Field data-invalid={fieldState.invalid}>
													<FieldLabel htmlFor='form-variant-size'>
														Size
													</FieldLabel>
													<Input
														{...field}
														id='form-variant-size'
														aria-invalid={fieldState.invalid}
														placeholder='Type size'
														autoComplete='off'
													/>
													{fieldState.invalid && (
														<FieldError errors={[fieldState.error]} />
													)}
												</Field>
											)}
										/>
										<Controller
											name={`variants.${index}.stock`}
											control={form.control}
											render={({
												field: {onChange, value, ...field},
												fieldState
											}) => (
												<Field data-invalid={fieldState.invalid}>
													<FieldLabel htmlFor='form-variant-stock'>
														Stock
													</FieldLabel>
													<Input
														{...field}
														type='number'
														id='form-variant-stock'
														aria-invalid={fieldState.invalid}
														placeholder='0'
														autoComplete='off'
														value={
															(value as number) === 0 ||
															Number.isNaN(value as number)
																? ''
																: (value as number)
														}
														onChange={e => {
															const val = e.target.value
															onChange(val === '' ? 0 : parseInt(val, 10))
														}}
													/>
													{fieldState.invalid && (
														<FieldError errors={[fieldState.error]} />
													)}
												</Field>
											)}
										/>
										<Button
											title='Remove Row'
											className='self-end cursor-pointer'
											type='button'
											variant='outline'
											onClick={() => {
												const currentSize = form.getValues(
													`variants.${index}.size`
												)
												const currentStock = form.getValues(
													`variants.${index}.stock`
												)
												const totalRows = variantFields.length
												if (!currentSize && !currentStock) {
													if (totalRows > 1) {
														removeVariant(index)
													} else {
														updateVariant(index, {size: '', stock: 0})
													}
												} else {
													removeVariant(index)
												}
											}}>
											<CircleMinus />
										</Button>
									</FieldGroup>
								</FieldGroup>
							))}
							{!!variantFields.length && (
								<Button
									className='max-w-max'
									type='button'
									onClick={() => appendVariant({size: '', stock: 0})}>
									<CirclePlus /> Add Another
								</Button>
							)}
						</FieldGroup>
						{/* Image Gallery */}
						<Controller
							name='imageGallery'
							control={form.control}
							render={({field, fieldState}) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor='form-image-gallery'>
										Image Gallery
									</FieldLabel>
									<Input
										ref={galleryPhotoRef}
										hidden
										type='file'
										accept='image/*'
										multiple
										id='form-image-gallery'
										aria-invalid={fieldState.invalid}
										onChange={e => {
											const newFiles = Array.from(e.target.files ?? [])
											const currentFiles = field.value ?? []
											const combined = [...currentFiles, ...newFiles]

											if (combined.length > MAX_IMAGES) {
												setLocalError(
													`You can only upload up to ${MAX_IMAGES} images.`
												)
												field.onChange(combined.slice(0, MAX_IMAGES))
											} else {
												setLocalError(null)
												field.onChange(combined)
											}
										}}
									/>
									{!field.value?.length && (
										<UploadFile
											type='gallery'
											onClick={() => galleryPhotoRef.current?.click()}
											css='border-3 border-dashed'
											title='Upload Images'
											description={`Upload up to ${MAX_IMAGES} images for your item.`}
										/>
									)}
									{field.value && field.value.length > 0 && (
										<div className='mt-2 flex gap-2'>
											{field.value.map((file: File | string, idx: number) => {
												const src =
													typeof file === 'string'
														? file // already uploaded URL
														: URL.createObjectURL(file) //
												return (
													<div key={idx} className='relative'>
														{idx === 0 && (
															<span className='absolute bottom-1 left-1 bg-blue-600 text-white text-xs px-1 rounded'>
																Cover
															</span>
														)}

														<img
															src={src}
															alt={`Gallery preview ${idx + 1}`}
															className='h-24 w-24 object-cover rounded-md border'
														/>

														<button
															type='button'
															className='absolute top-1 right-1  text-white rounded-full px-2'
															onClick={() => {
																const newFiles = field.value?.filter(
																	(_, i) => i !== idx
																)
																field.onChange(newFiles)
																if (galleryPhotoRef.current)
																	galleryPhotoRef.current.value = ''
															}}>
															✕
														</button>
													</div>
												)
											})}
											{field.value?.length! > 0 &&
												field.value?.length! < MAX_IMAGES && (
													<UploadFile
														css='h-24 w-24 max-w-24  border max-h-24 text-black flex flex-col items-center justify-center'
														type='image'
														onClick={() => galleryPhotoRef.current?.click()}
														title='Add'
													/>
												)}
										</div>
									)}
									{localError && (
										<p className='text-red-500 text-sm'>{localError}</p>
									)}

									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						{/* Categories (UUIDs) */}
						<Controller
							name='categories'
							control={form.control}
							render={({field, fieldState}) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor='form-categories'>Categories</FieldLabel>
									<MultiSelect
										options={(categories ?? []).map(cat => ({
											label: cat.name,
											value: cat.id
										}))}
										defaultValue={field.value ?? []}
										onValueChange={field.onChange}
										placeholder='Select categories'
									/>
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
					<Button type='submit' form='form-item' disabled={isSubmitting}>
						Submit
					</Button>
				</Field>
			</CardFooter>
		</Card>
	)
}
