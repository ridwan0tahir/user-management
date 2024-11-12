import { CustomInput } from '@/components/custom-input'
import { CustomSelect } from '@/components/custom-select'
import { ImagePicker } from '@/components/image-picker'
import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useEffect, useMemo, useState } from 'react'
import { useUsers } from '@/hooks/use-users'
import { addUserToData, updatedUserInData } from '@/store'

const defaultValues = {
	image: '',
	fullName: '',
	email: '',
	phone: '',
	role: '',
	status: '',
}

export const UserUpsert = ({ openDrawer, setOpenDrawer, userId }) => {
	const { state, dispatch } = useUsers()
	const isEditing = useMemo(() => !!userId, [userId])

	const [formData, setFormData] = useState(defaultValues)

	useEffect(() => {
		if (!isEditing) {
			return
		}

		setFormData(state?.users?.find((user) => user?.id === userId))
	}, [isEditing, state?.users, userId])

	const handleInputChange = (evt) => {
		setFormData((prev) => ({
			...prev,
			[evt.target.name]: evt.target.value,
		}))
	}

	const handleCustomChange = (name, value) => {
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = (evt) => {
		evt.preventDefault()

		if (!isEditing) {
			dispatch(addUserToData(formData))
		} else {
			dispatch(updatedUserInData({ id: userId, ...formData }))
		}

		setOpenDrawer(false)
	}

	return (
		<Sheet open={openDrawer} onOpenChange={setOpenDrawer}>
			<SheetContent
				side='right'
				className='flex flex-col p-0'
				onInteractOutside={(evt) => evt.preventDefault()}
			>
				<ScrollArea className='h-screen'>
					<SheetHeader className='sticky top-0 z-10 border-b border-slate-300 bg-white p-4'>
						<SheetTitle>{`${isEditing ? 'Edit' : 'Add'} User`}</SheetTitle>
						<SheetDescription>{`Fill the form below to ${
							isEditing ? 'edit' : 'add'
						} user.`}</SheetDescription>
					</SheetHeader>
					<div className='flex-1 p-4 pb-20'>
						<form
							id='user-data-form'
							className='flex flex-col gap-4'
							onSubmit={handleSubmit}
						>
							<div className='mb-2'>
								<ImagePicker
									name='image'
									image={formData?.image}
									onImageChange={(value) => handleCustomChange('image', value)}
								/>
							</div>
							<CustomInput
								name='fullName'
								label='Full Name'
								value={formData?.fullName}
								onChange={handleInputChange}
								required
							/>
							<CustomInput
								name='email'
								label='Email'
								type='email'
								value={formData?.email}
								onChange={handleInputChange}
								required
							/>
							<CustomInput
								name='phone'
								label='Phone'
								type='tel'
								value={formData?.phone}
								onChange={handleInputChange}
								required
							/>
							<CustomSelect
								name='role'
								label='Role'
								selectItem={[
									{ label: 'User', value: 'user' },
									{ label: 'Admin', value: 'admin' },
									{ label: 'Guest', value: 'guest' },
								]}
								value={formData?.role}
								onValueChange={(v) => handleCustomChange('role', v)}
								required
							/>
							<CustomSelect
								name='status'
								label='Status'
								selectItem={[
									{ label: 'Active', value: 'active' },
									{ label: 'Inactive', value: 'inactive' },
								]}
								value={formData?.status}
								onValueChange={(v) => handleCustomChange('status', v)}
								required
							/>
						</form>
					</div>
					<SheetFooter className='sticky bottom-0 z-50 border-t border-slate-200 bg-white p-4'>
						<SheetClose asChild>
							<Button variant='ghost'>close</Button>
						</SheetClose>
						<Button form='user-data-form'>Submit</Button>
					</SheetFooter>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	)
}
