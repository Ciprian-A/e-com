'use client'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { EllipsisVertical } from 'lucide-react'
import { useState } from 'react'

export function TableActions({
	onEdit,
	onDelete,
	dialogTitle,
	dialogDescription
}: {
	onEdit: () => void
	onDelete: () => void
	dialogTitle?: string
	dialogDescription?: string
}) {
	const [showConfirm, setShowConfirm] = useState(false)

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button 
						variant='ghost'
						size='icon'
						className='h-6 w-6 p-0 hover:cursor-pointer hover:bg-gray-300'>
						<EllipsisVertical className='h-4 w-4 ' />
						<span className='sr-only'>Open promo codes options</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end' className='w-28'>
					<DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
					<DropdownMenuItem 
						onClick={() => setShowConfirm(true)}
						className='text-red-500'>
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
						<AlertDialogDescription>
						{dialogDescription}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => {
								onDelete()
								setShowConfirm(false)
							}}
							className='bg-red-600 hover:bg-red-700'>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}
