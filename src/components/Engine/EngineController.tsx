import { useEffect } from 'react'
import { carsSelectors } from '@/store/cars/carsSlice'
import { engineActions, engineSelectors } from '@/store/engine/engineSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

export const EngineController = () => {
  const currentPageCarsCount = useAppSelector(
    carsSelectors.getCurrentPageCarsCount,
  )
  const readyCars = useAppSelector(engineSelectors.getReadyCars)
  const brokenCars = useAppSelector(engineSelectors.getBrokenCars)

  const status = useAppSelector(engineSelectors.getStatus)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (currentPageCarsCount === 0 || !readyCars) return

    if (status === 'started' && currentPageCarsCount === readyCars.length) {
      dispatch(engineActions.setStatus('inProgress'))
    }

    if (
      status === 'inProgress' &&
      currentPageCarsCount === brokenCars?.length
    ) {
      dispatch(engineActions.setStatus('finished'))
    }

    if (
      (status === 'stopped' && readyCars.length === 0) ||
      readyCars.length === 0
    ) {
      dispatch(engineActions.clearState())
    }
  }, [currentPageCarsCount, readyCars, brokenCars, status])

  return null
}
