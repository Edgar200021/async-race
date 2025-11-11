import { useEffect } from 'react'
import { getFinalStatus } from '@/lib/utils'
import { engineActions, engineSelectors } from '@/store/engine/engineSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { type Car, CarStatus } from '@/types/car'
import { useHandleEnginee } from './useHandleEngine'

export const useHandleEngineStatus = (carId: Car['id']) => {
  const engineStatus = useAppSelector(engineSelectors.getStatus)
  const dispatch = useAppDispatch()

  const data = useHandleEnginee(carId)

  useEffect(() => {
    if (
      !engineStatus ||
      engineStatus === 'inProgress' ||
      engineStatus === 'finished'
    )
      return
    ;(async () => {
      return await data.onClick(
        engineStatus === 'started' ? CarStatus.Started : CarStatus.Stopped,
      )
    })()
  }, [engineStatus])

  useEffect(() => {
    if (!engineStatus) return

    if (
      engineStatus === 'inProgress' &&
      data.status === CarStatus.Drive &&
      data.isBroken
    ) {
      dispatch(engineActions.setBrokenCar({ carId: carId }))
    }

    if (engineStatus === 'started' && data.status === CarStatus.Drive) {
      dispatch(engineActions.setReadyCar({ type: 'set', carId: carId }))
    }

    if (engineStatus === 'stopped' && data.status === CarStatus.Stopped) {
      dispatch(engineActions.setReadyCar({ type: 'remove', carId: carId }))
    }
  }, [engineStatus, data.status, carId, data.isBroken])

  return {
    ...data,
    status: getFinalStatus(data.status, engineStatus),
  }
}
