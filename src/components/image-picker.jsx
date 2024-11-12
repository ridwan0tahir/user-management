import { cn } from '@/utils/helper-funcs'
import { Camera } from 'lucide-react'
import { useState } from 'react'

export const ImagePicker = ({
	name,
	image,
	onImageChange,
	className,
	...props
}) => {
	const [selectImage, setSelectImage] = useState(image)

	const handleOnChange = (evt) => {
		const file = evt.target.files[0]
		if (file) {
			const image = URL.createObjectURL(file)
			setSelectImage(image)
			onImageChange(image)
			return
		}

		setSelectImage(null)
		onImageChange(null)
	}

	return (
		<label
			className={cn(
				'relative inline-block size-20 cursor-pointer overflow-hidden rounded-full border border-slate-300 bg-slate-200',
				className
			)}
		>
			{selectImage && (
				<img
					src={selectImage}
					className='size-full rounded-full object-cover'
				/>
			)}
			<span className='absolute inset-0 flex items-center justify-center bg-black/50'>
				<Camera className='size-6 text-slate-300' />
			</span>
			<input
				{...props}
				name={name}
				type='file'
				accept='image/*'
				onChange={handleOnChange}
				className='absolute bottom-0 right-1/2 h-0 w-0 opacity-0'
			/>
		</label>
	)
}
