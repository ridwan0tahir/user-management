import { createContext } from 'react'
import { STORAGE_KEY } from '@/utils/constants'

export const UsersContext = createContext()

const actionTypes = {
	ADD_USER: 'ADD_USER',
	EDIT_USER: 'EDIT_USER',
	DELETE_USER: 'DELETE_USER',
}

export const usersReducer = (state, action) => {
	switch (action.type) {
		case actionTypes.ADD_USER: {
			const newUserList = [
				...state.users,
				{
					id: `${state?.users?.length + 1}`,
					created_at: new Date().toISOString(),
					...action?.payload,
				},
			]
			localStorage.setItem(STORAGE_KEY, JSON.stringify(newUserList))

			return { ...state, users: newUserList }
		}
		case actionTypes.EDIT_USER: {
			const userId = action?.payload?.id
			if (!userId) {
				return state
			}

			const updatedUsersList = state?.users?.map((user) => {
				if (user?.id === userId) {
					return { ...user, ...action?.payload }
				}
				return user
			})
			localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsersList))

			return { ...state, users: updatedUsersList }
		}
		case actionTypes.DELETE_USER: {
			const updatedUsersList = state?.users?.filter(
				(user) => user?.id === action?.payload
			)
			localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsersList))

			return { ...state, users: updatedUsersList }
		}
		default:
			return state
	}
}

export const addUserToData = (payload) => ({
	type: actionTypes.ADD_USER,
	payload,
})

export const updatedUserInData = (payload) => ({
	type: actionTypes.EDIT_USER,
	payload,
})

export const deleteUserInData = (payload) => ({
	type: actionTypes.DELETE_USER,
	payload,
})
