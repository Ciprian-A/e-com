'use client'

import {ChevronDownIcon} from 'lucide-react'
import {useEffect, useState} from 'react'

import {Button} from '@/components/ui/button'
import {Calendar} from '@/components/ui/calendar'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {formatDate} from '@/lib/formatDate'

export function DatePicker({
	date: initialDate,
	onDateChange,
	id
}: {
	date?: Date
	id: string
	onDateChange: (date: Date | undefined) => void
}) {
	const [open, setOpen] = useState(false)
	const [date, setDate] = useState<Date | undefined>(initialDate)

	useEffect(() => {
		setDate(initialDate)
	}, [initialDate])
	console.log({initialDate, date})
	const handleSelect = (newDate: Date | undefined) => {
		setDate(newDate)
		onDateChange(newDate) // 👈 propagate to RHF
		setOpen(false)
		console.log('ónSelect--->date', {date})
	}

	return (
		<div className='flex w-full' id={id}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant='outline'
						id='date'
						className='w-full font-normal text-left'>
						{date ? formatDate(date) : 'Select date'}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent className='min-w-min p-0' align='start'>
					<Calendar
						mode='single'
						className='rounded-md border shadow-sm w-full'
						selected={initialDate}
						defaultMonth={date}
						captionLayout='label'
						onSelect={handleSelect}
					/>
				</PopoverContent>
			</Popover>
		</div>
	)
}
