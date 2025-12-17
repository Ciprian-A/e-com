import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle
} from '@/components/ui/empty'
import { cn } from '@/lib/utils'
import { UploadIcon } from './UploadIcon'

export function UploadFile({
	title,
	description,
	type = 'image',
	css,
	onClick
}: {
	title?: string
	description?: string
	type: 'image' | 'gallery'
	css?:string
	onClick: () => void
}) {
	const headerCss = type === 'image' ? 'gap-1' : ''
	const titleCss = type === 'image' ? 'text-base' : ''
	return (
		<Empty
			onClick={onClick}
			className={cn(
				'hover:cursor-pointer bg-[#f9f9f9] hover:bg-[#f1f1f1] transition-colors',
				css
			)}>
			<EmptyHeader className={cn('relative', headerCss)}>
				<UploadIcon type={type} />
				<EmptyTitle className={titleCss}>{title}</EmptyTitle>
				<EmptyDescription className='text-black'>
					{description}
				</EmptyDescription>
			</EmptyHeader>
		</Empty>
	)
}
