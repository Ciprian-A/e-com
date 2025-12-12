import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle
} from '@/components/ui/empty'
import { UploadIcon } from './UploadIcon'

export function UploadFile({
	title,
	description,
	type = 'image',
	onClick
}: {
	title: string
	description: string
	type: 'image' | 'gallery'
	onClick: () => void
}) {
	return (
		<Empty
			onClick={onClick}
			className='border-3 border-dashed hover:cursor-pointer bg-[#f9f9f9] hover:bg-[#f1f1f1] transition-colors'>
			<EmptyHeader className='relative'>
				<UploadIcon type={type} />
				<EmptyTitle>{title}</EmptyTitle>
				<EmptyDescription>{description}</EmptyDescription>
			</EmptyHeader>
		</Empty>
	)
}
