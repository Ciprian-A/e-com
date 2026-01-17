export const stripUuidSuffix = (id: string) =>
	id.replace(/-(\d{1,2}(\.\d+)?|[A-Z]{1,4})$/, '')
