import Users from '@/users'
import UserProvider from './store/provider'

export default function App() {
	return (
		<UserProvider>
			<Users />
		</UserProvider>
	)
}
