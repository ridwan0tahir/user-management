import { STORAGE_KEY } from '@/utils/constants'

export function getUsersFromStorage() {
	const users = localStorage.getItem(STORAGE_KEY)
	if (!users) {
		return []
	}

	return JSON.parse(users)
}

export function addUserToStorage(data) {
	const users = getUsersFromStorage()

	const updatedUsers = [...users, data]

	localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers))

	return updatedUsers
}
