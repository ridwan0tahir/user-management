import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Label } from './ui/label'

export const CustomSelect = ({
	name,
	label,

	selectItem,
	...props
}) => {
	return (
		<div className='flex flex-col gap-1'>
			<Label htmlFor={name}>{label}</Label>
			<Select name={name} {...props}>
				<SelectTrigger>
					<SelectValue placeholder='--select option--' />
				</SelectTrigger>
				<SelectContent>
					{selectItem?.map((item) => (
						<SelectItem key={item?.value} value={item?.value}>
							{item?.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}
