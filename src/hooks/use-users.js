import { useContext } from 'react'
import { UsersContext } from '@/store'

export const useUsers = () => {
	const context = useContext(UsersContext)

	if (!context) {
		throw new Error('useDashboard must be used with a DashboardProvider')
	}

	return context
}
