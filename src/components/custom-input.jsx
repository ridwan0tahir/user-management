import { Input } from './ui/input'
import { Label } from './ui/label'

export const CustomInput = ({ name, label, ...props }) => {
	return (
		<div className='flex flex-col gap-1'>
			<Label htmlFor={name}>{label}</Label>
			<Input name={name} {...props} />
		</div>
	)
}
