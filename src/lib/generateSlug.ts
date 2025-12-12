export function generateSlug(s:string):string {
	return s.trim().toLowerCase().replace(/\s/g, '-')
}
