import { motorRacingHelmet } from '@lucide/lab'
import { Car as CarIcon, Icon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import finishIcon from '@/assets/icons/finish.svg'
import { cn } from '@/lib/utils'
import { engineActions } from '@/store/engine/engineSlice'
import { useAppDispatch } from '@/store/hooks'
import { winnersActions } from '@/store/winners/winnersSlice'
import { CarStatus, type Car as TCar } from '@/types/car'
import { RaceTrack } from '../ui/RaceTrack'
import { CarActions } from './CarActions'

interface Props {
  className?: string
  car: TCar
}

export const Car = ({ className, car }: Props) => {
  const trackRef = useRef<HTMLDivElement | null>(null)

  const [trackDistance, setTrackDistance] = useState(0)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!trackRef.current) return
    const observer = new ResizeObserver(([entry]) => {
      setTrackDistance(entry.contentRect.width)
    })
    observer.observe(trackRef.current)

    return () => observer.disconnect()
  }, [])

  const calculateAnimationParams = (velocity: number, distance: number) => {
    if (!trackDistance || !velocity || !distance)
      return { translateX: 0, duration: 0 }

    const extraDistance = 130
    const totalDistanceInPixels = trackDistance + extraDistance

    const normalizedVelocity = velocity / 100
    let duration = 5 / normalizedVelocity

    duration = Math.min(7, Math.max(1, duration))

    console.log('Simple calculation:', {
      velocity,
      normalizedVelocity,
      duration,
    })

    return {
      translateX: totalDistanceInPixels,
      duration: `${duration}s`,
    }
  }
  return (
    <div className={cn('flex items-center gap-x-3 p-0', className)}>
      <CarActions
        car={car}
        className="mr-8"
        renderCar={(status, isBroken, data) => {
          if (!trackDistance) return null

          let translateX = 0
          let transition = ''

          if (status === CarStatus.Drive && !isBroken && data) {
            const { velocity, distance } = data
            const { translateX: x, duration } = calculateAnimationParams(
              velocity,
              distance,
            )

            translateX = x
            transition = `transform ${duration} linear`
          } else if (status === CarStatus.Stopped) {
            translateX = 0
            transition = 'transform 1.2s ease-in-out'
          }

          return (
            <div
              className={cn(
                'flex flex-col p-0 -translate-y-3 relative transition-transform duration-300 ease',
                {
                  'opacity-70': isBroken,
                },
              )}
              style={
                status === CarStatus.Drive || status === CarStatus.Stopped
                  ? {
                      transform: `translateX(${translateX}px)`,
                      transition,
                    }
                  : {}
              }
              onTransitionEnd={(e) => {
                if (isBroken || status !== CarStatus.Drive) return

                dispatch(engineActions.setStatus('finished'))
                dispatch(
                  winnersActions.setWinner({
                    id: car.id,
                    time: e.elapsedTime,
                    name: car.name,
                  }),
                )
              }}
            >
              <span className="text-sm font-semibold text-white -mb-8 ml-2">
                {car.name}
              </span>

              <Icon
                className={cn('p-0 translate-y-15 translate-x-8', {
                  'animate-vibrate': status === 'started',
                })}
                style={{
                  color: car.color,
                }}
                iconNode={motorRacingHelmet}
              />

              <CarIcon
                className={status === 'started' ? 'animate-vibrate' : ''}
                size={110}
                style={{
                  color: car.color,
                }}
              />
            </div>
          )
        }}
      />

      <RaceTrack ref={trackRef} className="mr-10" />
      <img
        className="-translate-y-2"
        src={finishIcon}
        alt="finish"
        width={50}
        height={50}
      />
    </div>
  )
}
