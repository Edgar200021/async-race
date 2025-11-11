import { useEffect, useRef } from 'react'
import raceAudio from '@/assets/audio/audi-v8-acceleration-sound-6067.mp3'
import motorAudio from '@/assets/audio/motor-v8-dodge-charger-243223.mp3'
import { engineSelectors } from '@/store/engine/engineSlice'
import { useAppSelector } from '@/store/hooks'

export const EngineAudio = () => {
  const ref = useRef<HTMLAudioElement | null>(null)
  const status = useAppSelector(engineSelectors.getStatus)

  useEffect(() => {
    if (!ref.current) return

    if (status === 'started' && ref.current.paused) {
      ref.current.src = motorAudio
      ref.current.play()
      return
    }

    if (status === 'inProgress') {
      ref.current.pause()
      ref.current.src = raceAudio
      ref.current.play()
      return
    }

    if (!ref.current.paused) {
      ref.current.pause()
    }
  }, [status])

  return (
    <audio ref={ref}>Your browser does not support the audio element.</audio>
  )
}
