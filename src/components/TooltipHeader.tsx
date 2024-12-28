import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip'

interface TooltipHeaderProps {
	children: React.ReactNode
	description: string
}
const TooltipHeader = ({children, description}: TooltipHeaderProps) => {
	return (
		<TooltipProvider delayDuration={100} disableHoverableContent={false}>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent>
					<p>{description}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default TooltipHeader
