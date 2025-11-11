import { FileMinus } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
  title: string
  description: string
}

export const EmptyList = ({ className, title, description }: Props) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center gap-5 py-20 px-6 select-none',
        'text-white/90',
        className,
      )}
    >
      <div className="relative w-28 h-28 flex items-center justify-center mb-2 group">
        <div className="absolute inset-0 rounded-full bg-linear-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md shadow-[0_0_35px_-10px_rgba(255,255,255,0.25)] ring-1 ring-white/10 group-hover:ring-white/20 transition-all duration-300" />
        <FileMinus className="w-12 h-12 text-white/70 animate-pulse relative z-10 group-hover:scale-110 transition-transform duration-300" />
      </div>

      <h3 className="text-2xl font-semibold tracking-tight text-white drop-shadow-md">
        {title}
      </h3>

      <p className="text-sm text-white/70 max-w-xs leading-relaxed font-semibold">
        {description}
      </p>
    </div>
  )
}
