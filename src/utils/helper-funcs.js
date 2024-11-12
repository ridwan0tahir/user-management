import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
	return twMerge(clsx(inputs))
}

export function formatDate(date) {
	if (!date) {
		return ''
	}

	return new Date(date).toLocaleString('en-US', {
		weekday: 'short',
		month: 'short',
		day: '2-digit',
		year: 'numeric',
	})
}
