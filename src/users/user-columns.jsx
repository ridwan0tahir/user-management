import { createColumnHelper } from '@tanstack/react-table'
import { Clipboard, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatDate } from '@/utils/helper-funcs'
import { Fragment } from 'react'

const columnHelper = createColumnHelper()

export const getUserColumns = (onActionClicked) => [
	columnHelper.accessor('id', {
		header: 'ID',
		cell: ({ getValue }) => {
			const id = getValue()?.length > 1 ? getValue() : `0${getValue()}`
			return <span>{id}</span>
		},
	}),
	columnHelper.accessor('fullName', {
		header: 'User',
		cell: ({ getValue, row }) => {
			const names = getValue()?.split(' ')?.filter(Boolean)
			return (
				<div className='flex items-center gap-x-2'>
					<Avatar className='size-10 overflow-hidden rounded-full bg-slate-200'>
						<AvatarImage
							src={row.original?.image}
							alt={row.original?.fullName}
							className='object-cover'
						/>
						<AvatarFallback>{`${names[0]?.charAt(0)}${names[1]?.charAt(0)}`}</AvatarFallback>
					</Avatar>
					<div className=''>
						<h3 className='font-semibold capitalize'>
							{row.original?.fullName}
						</h3>
						<p className='text-sm'>{row.original?.email}</p>
					</div>
				</div>
			)
		},
	}),
	columnHelper.accessor('phone', {
		header: 'Phone Number',
		cell: ({ getValue }) => <span>{getValue()}</span>,
	}),
	columnHelper.accessor('role', {
		header: 'Role',
		cell: ({ getValue }) => <span className='capitalize'>{getValue()}</span>,
	}),
	columnHelper.accessor('status', {
		header: 'Status',
		cell: ({ getValue }) => {
			const variant = getValue() === 'active' ? 'success' : 'destructive'
			return <Badge variant={variant}>Active</Badge>
		},
	}),
	columnHelper.accessor('created_at', {
		header: 'Date',
		cell: () => <span>{formatDate(new Date())}</span>,
	}),
	columnHelper.accessor('actions', {
		header: 'Actions',
		cell: ({ row }) => tableDropdown(onActionClicked, row.original?.id),
	}),
]

const tableDropdown = (onActionClicked, id) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='size-6 p-0'>
					<span className='sr-only'>Open menu</span>
					<MoreHorizontal className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				{[
					{ name: 'Copy ID', value: 'copy', icon: Clipboard },
					{ name: 'Edit', value: 'edit', icon: Pencil },
					{ name: 'Delete', value: 'delete', icon: Trash2 },
				].map((item, idx) => (
					<Fragment key={item.value}>
						<DropdownMenuItem onClick={() => onActionClicked(item.value, id)}>
							<span className='mr-2 inline-block'>
								<item.icon className='size-4' />
							</span>
							{item.name}
						</DropdownMenuItem>
						{idx === 0 && <DropdownMenuSeparator />}
					</Fragment>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
