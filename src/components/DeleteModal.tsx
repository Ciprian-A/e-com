'use client'

import {Trash2} from 'lucide-react'
import {useState} from 'react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from './ui/alert-dialog'
import {Button} from './ui/button'

export function DeleteModal({
	onDelete,
	dialogTitle,
	dialogDescription
}: {
	onDelete: () => void
	dialogTitle?: string
	dialogDescription?: string
}) {
	const [showConfirm, setShowConfirm] = useState(false)
	return (
		<>
			<Button variant='ghost' size='icon' onClick={() => setShowConfirm(true)}>
				<Trash2 />
			</Button>
			<AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
						<AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
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
