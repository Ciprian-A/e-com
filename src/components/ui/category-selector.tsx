'use client'
import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
// import { Category } from '../../../sanity.types'
 type Category = {
		id: string
		name: string
		description: string | null
		createdAt: Date
		updatedAt: Date
 }
interface CategorySelectorProps {
	categories: Category[]
}

const CategorySelector = ({categories}: CategorySelectorProps) => {
	const [open, setOpen] = useState<boolean>(false)
	const [value, setValue] = useState<string>('')
	const router = useRouter()
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className='w-full max-w-full relative flex justify-start sm:flex-none items-center space-x-2 text-black  font-base py-2 px-4 rounded hover:bg-gray-200 border-none shadow-none'>
					{value
						? categories &&
							categories.find(category => category.id === value)?.name
						: 'Filter by Category'}
					<ChevronsUpDown className='ml-2 h-4 shrink-0' />
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<Command>
					<CommandInput
						placeholder='Search category...'
						className='h-9'
						onKeyDown={e => {
							if (e.key === 'Enter') {
								const selectedCategory = categories.find(c =>
									c.name
										?.toLowerCase()
										.includes(e.currentTarget.value.toLowerCase())
								)
								if (selectedCategory?.name) {
									setValue(selectedCategory.id)
									router.push(`/categories/${selectedCategory.name}`)
									setOpen(false)
								}
							}
						}}
					/>
					<CommandList>
						<CommandEmpty>No category found.</CommandEmpty>
						<CommandGroup>
							{categories.map(category => (
								<CommandItem
									key={category.id}
									value={category.name}
									onSelect={() => {
										setValue(value === category.id ? '' : category.id)
										router.push(`/categories/${category.name}`)
										setOpen(false)
									}}>
									{category.name}
									<Check
										className={cn(
											'ml-auto h-4 w-4',
											value === category.id ? 'opacity-100' : 'opacity-0'
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

export default CategorySelector
