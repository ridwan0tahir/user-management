import { cva } from 'class-variance-authority'

import { cn } from '@/utils/helper-funcs'

const badgeVariants = cva(
	'inline-flex items-center rounded-md border border-slate-200 px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-300',
	{
		variants: {
			variant: {
				success:
					'border-transparent bg-green-500 text-green-50 shadow hover:bg-green-500/80 dark:bg-green-900 dark:text-green-50 dark:hover:bg-green-900/80',
				destructive:
					'border-transparent bg-red-500 text-slate-50 shadow hover:bg-red-500/80 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/80',
			},
		},
	}
)

function Badge({ className, variant, ...props }) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	)
}

export { Badge }
