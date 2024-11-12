import { Button } from '@/components/ui/button'
import { Plus, Users as UsersIcon } from 'lucide-react'
import { UserTable } from './user-table'
import { getUserColumns } from './user-columns'
import { useCallback, useMemo, useState } from 'react'
import { UserUpsert } from './user-upsert'
import { useUsers } from '@/hooks/use-users'
import { deleteUserInData } from '@/store'

export default function Users() {
	const { state, dispatch } = useUsers()

	const [OpenDrawer, setOpenDrawer] = useState(false)
	const [userId, setUserId] = useState(null)

	const handleActionClicked = useCallback(
		(action, id) => {
			setUserId(id)
			switch (action) {
				case 'add':
				case 'edit':
					setOpenDrawer(true)
					break
				case 'delete':
					dispatch(deleteUserInData(userId))
					break
				case 'copy':
					navigator.clipboard.writeText(userId)
					break
				default:
					break
			}
		},
		[dispatch, userId]
	)

	const userColumns = useMemo(
		() => getUserColumns(handleActionClicked),
		[handleActionClicked]
	)

	return (
		<main className='p-5'>
			<section className='flex h-full flex-col space-y-5'>
				<div className='items-starts flex justify-between gap-4'>
					<div>
						<h1 className='text-xl font-semibold md:text-2xl'>
							<span className='mr-2 inline-block'>
								<UsersIcon className='size-5 stroke-2' />
							</span>
							Users
						</h1>
						<p>Manage your users</p>
					</div>
					<Button className='' onClick={() => handleActionClicked('add', null)}>
						<Plus className='size-2.5 stroke-2' />
						Add User
					</Button>
				</div>
				<UserTable columns={userColumns} data={state?.users} />
				<UserUpsert
					userId={userId}
					openDrawer={OpenDrawer}
					setOpenDrawer={setOpenDrawer}
				/>
			</section>
		</main>
	)
}
