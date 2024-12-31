import {type SchemaTypeDefinition} from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {clothingType} from './clothingType'
import {orderType} from './orderType'
import {salesType} from './salesType'
import {footwearType} from './footwearType'

export const schema: {types: SchemaTypeDefinition[]} = {
	types: [
		blockContentType,
		categoryType,
		footwearType,
		clothingType,
		orderType,
		salesType
	]
}
