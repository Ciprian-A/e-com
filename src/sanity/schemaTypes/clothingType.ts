import {TrolleyIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const clothingType = defineType({
	name: 'clothing',
	title: 'Clothing',
	type: 'document',
	icon: TrolleyIcon,
	fields: [
		defineField({
			name: 'name',
			title: 'Product Name',
			type: 'string',
			validation: Rule => Rule.required()
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {source: 'name', maxLength: 96},
			validation: Rule => Rule.required()
		}),
		defineField({
			name: 'sizesAndStock',
			title: 'Sizes and Stock',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					fields: [
						defineField({
							name: 'size',
							title: 'Size',
							type: 'string',
							validation: Rule => Rule.required(),
							options: {
								list: [
									{title: 'XS', value: 'XS'},
									{title: 'S', value: 'S'},
									{title: 'M', value: 'M'},
									{title: 'L', value: 'L'},
									{title: 'XL', value: 'XL'},
									{title: '2XL', value: '2XL'},
									{title: '3XL', value: '3XL'}
								]
							}
						}),
						defineField({
							name: 'stock',
							title: 'Stock',
							type: 'number',
							validation: Rule => Rule.required()
						})
					],
					preview: {
						select: {
							size: 'size',
							stock: 'stock'
						},
						prepare(select) {
							return {
								title: `${select.stock} items size ${select.size} in stock`
							}
						}
					}
				})
			]
		}),
		defineField({
			name: 'productDetails',
			title: 'Product Details',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					fields: [
						defineField({
							name: 'detail',
							title: 'Detail',
							type: 'string',
							validation: Rule => Rule.required()
						}),
						defineField({
							name: 'value',
							title: 'Value',
							type: 'string',
							validation: Rule => Rule.required()
						})
					],
					preview: {
						select: {
							detail: 'detail',
							value: 'value'
						},
						prepare(select) {
							return {
								title: select.detail,
								subtitle: select.value
							}
						}
					}
				})
			]
		}),
		defineField({
			name: 'image',
			title: 'Product Image',
			type: 'image',
			options: {hotspot: true},
			validation: Rule => Rule.required()
		}),
		defineField({
			name: 'images',
			title: 'Product Image Galery',
			type: 'array',
			of: [{type: 'image', options: {hotspot: true, layout: 'grid'}}],
			validation: Rule => Rule.required().min(1)
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'blockContent'
		}),
		defineField({
			name: 'price',
			title: 'Price',
			type: 'number',
			validation: Rule => Rule.required()
		}),
		defineField({
			name: 'favourite',
			title: 'Favourites',
			type: 'boolean'
		}),
		defineField({
			name: 'categories',
			title: 'Categories',
			type: 'array',
			of: [{type: 'reference', to: {type: 'category'}}]
		})
	],
	preview: {
		select: {
			title: 'name',
			media: 'image',
			subtitle: 'price'
		},
		prepare(select) {
			return {
				title: select.title,
				subtitle: `£${select.subtitle}`,
				media: select.media
			}
		}
	}
})
