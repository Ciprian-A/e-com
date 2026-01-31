export const formatDate = (date: Date, style?: Intl.DateTimeFormatOptions) => {
	return new Intl.DateTimeFormat('en-GB', style).format(date)
}
