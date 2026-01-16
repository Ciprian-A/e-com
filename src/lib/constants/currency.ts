export const CURRENCIES = [
	'USD',
	'EUR',
	'GBP',
	'JPY',
	'AUD',
	'CAD',
	'CHF',
	'CNY',
	'SEK',
	'NZD'
] as const

export type Currency = (typeof CURRENCIES)[number]

export function normalizeStripeCurrency(value?: string): Currency {
	const upper = value?.toUpperCase()
	if (!upper || !CURRENCIES.includes(upper as Currency)) {
		throw new Error(`Unsupported currency: ${value}`)
	}
	return upper as Currency
}
