import type { Ref } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
  lines?: number
  firstColor?: string
  secondColor?: string
  type?: 'horizontal' | 'vertical'
  ref?: Ref<HTMLDivElement>
}

export const RaceTrack = ({
  className,
  lines = 4,
  firstColor = '#000',
  secondColor = '#e2e8f0',
  type = 'horizontal',
  ref,
}: Props) => {
  if (type === 'vertical') {
    return (
      <div ref={ref} className={cn('flex flex-row h-full w-full', className)}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={'h-full flex-1'}
            style={{
              background: `repeating-linear-gradient(180deg, ${
                index % 2 === 0 ? firstColor : secondColor
              } 0 1rem, ${
                index % 2 === 0 ? secondColor : firstColor
              } 1rem 2rem)`,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div ref={ref} className={cn('flex flex-col w-full', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={'h-3 w-full'}
          style={{
            background: `repeating-linear-gradient(90deg, ${
              index % 2 === 0 ? firstColor : secondColor
            } 0 1rem, ${index % 2 === 0 ? secondColor : firstColor} 1rem 2rem)`,
          }}
        />
      ))}
    </div>
  )
}
