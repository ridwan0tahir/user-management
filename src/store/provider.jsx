import { useReducer } from 'react'

import { UsersContext, usersReducer } from '.'
import { getUsersFromStorage } from '@/lib/storage'

export default function UsersProvider({ children }) {
	const [state, dispatch] = useReducer(usersReducer, {
		users: getUsersFromStorage(),
	})

	return (
		<UsersContext.Provider value={{ state, dispatch }}>
			{children}
		</UsersContext.Provider>
	)
}
