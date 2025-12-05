'use client'

import { ChevronDownIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { formatDate } from '@/lib/formatDate'

export function DatePicker({date:initialDate, id}: {date?: Date, id: string}) {
	const [open, setOpen] = useState(false)
	const [date, setDate] = useState<Date | undefined>(initialDate)
	
 useEffect(()=> {
    setDate(initialDate)
  }, [initialDate])
	
	return (
		<div className='flex ' id={id}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant='outline'
						id='date'
						className='justify-between font-normal'>
						{date ? formatDate(date) : 'Select date'}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent className='min-w-min p-0' align='start'>
					<Calendar
						mode='single'
						className='rounded-md border shadow-sm w-full'
						selected={date}
						defaultMonth={date}
						captionLayout='label'
						onSelect={date => {
							setDate(date)
							setOpen(false)
						}}
					/>
				</PopoverContent>
			</Popover>
		</div>
	)
}
