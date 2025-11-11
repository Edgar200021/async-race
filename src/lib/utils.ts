import type { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { GET_CARS_MAX_LIMIT, GET_WINNERS_MAX_LIMIT } from '@/const/store'
import { carsActions } from '@/store/cars/carsSlice'
import { winnersActions } from '@/store/winners/winnersSlice'
import type { Nullable } from '@/types/base'
import { type Car, CarStatus } from '@/types/car'
import type { EngineStatus } from '@/types/engine'
import type { Winner } from '@/types/winner'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const getFinalStatus = (
  status: CarStatus,
  globalStatus: Nullable<EngineStatus>,
): CarStatus => {
  if (status === CarStatus.Stopped || !globalStatus) return status

  switch (globalStatus) {
    case 'inProgress':
    case 'finished':
      return CarStatus.Drive
    case 'started':
      return CarStatus.Started
    default:
      return CarStatus.Stopped
  }
}

export const handleEntityAdded = <
  T extends 'winners' | 'cars',
  U = T extends 'winners' ? Winner : Car,
>({
  type,
  totalCount,
  data,
  responseData,
  dispatch,
}: {
  type: T
  totalCount: Nullable<number>
  data: U[]
  responseData: U
  dispatch: ThunkDispatch<unknown, unknown, UnknownAction>
}) => {
  const limit = type === 'winners' ? GET_WINNERS_MAX_LIMIT : GET_CARS_MAX_LIMIT
  const action = type === 'winners' ? winnersActions : carsActions

  if (data.length === limit) {
    const nextPage = Math.ceil(((totalCount ?? 1) + 1) / limit)

    dispatch(
      action.setFilters({
        key: '_page',
        data: nextPage,
      }),
    )
  }

  data.push(responseData)
  dispatch(action.setTotalCount(!totalCount ? 1 : totalCount + 1))
}
