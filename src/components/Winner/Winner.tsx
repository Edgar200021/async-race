import { cn } from '@/lib/utils'
import type { Winner as TWinner } from '@/types/winner'

interface Props {
  className?: string
  winner: TWinner
}

export const Winner = ({ className }: Props) => {
  return <div className={cn('', className)}></div>
}
