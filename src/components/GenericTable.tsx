'use client'

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'

export interface TableColumn<T> {
	header: string
	accessor: keyof T | ((row: T) => React.ReactNode)
	className?: string
}

export interface TableRowAction<T> {
	label: string
	onClick: (row: T) => void
	variant?: 'default' | 'danger'
}
interface GenericTableProps<T> {
	columns: TableColumn<T>[]
	data: T[]
	tableCaption?: string
	actions?: (row: T) => React.ReactNode
	footer?: (data: T[]) => React.ReactNode
	rowKey: (row: T) => string
	onRowClick?: (row: T) => void
	rowEnd?: (row: T) => React.ReactNode // TODO: replace action
}

export function GenericTable<T>({
	columns,
	data,
	tableCaption,
	actions,
	rowKey,
	onRowClick
}: GenericTableProps<T>) {
	return (
		<Table className='border relative h-full w-2xs sm:w-sm md:w-md lg:w-2xl xl:w-3xl '>
			<TableCaption>{tableCaption}</TableCaption>
			<TableHeader>
				<TableRow>
					{columns.map((col, i) => (
						<TableHead key={i} className='text-bold text-black'>
							{col.header}
						</TableHead>
					))}
					{actions && (
						<TableHead className='text-bold text-black text-right'>
							Actions
						</TableHead>
					)}
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map(row => (
					<TableRow
						key={rowKey(row)}
						className={onRowClick ? 'cursor-pointer hover:bg-gray-100' : ''}
						onClick={() => onRowClick?.(row)}>
						{columns.map((col, i) => (
							<TableCell key={i} className={col.className}>
								{typeof col.accessor === 'function'
									? col.accessor(row)
									: String(row[col.accessor])}
							</TableCell>
						))}
						{actions && (
							<TableCell
								className='text-right'
								onClick={e => e.stopPropagation()}>
								{actions(row)}
							</TableCell>
						)}
					</TableRow>
				))}
			</TableBody>
			<TableFooter className=''>
				<TableRow>
					<TableCell colSpan={columns.length}>Total</TableCell>
					<TableCell className='text-right'>{data.length}</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	)
}
export default GenericTable
