import { useEffect, useState } from 'react'
import { requestWithSchema } from '@/lib/requestWithSchema'
import { getWinnersSchema } from '@/schemas/winners/getWinners.schema'
import { useLazyGetOneCarQuery } from '@/store/cars/carsApi'
import { useAppSelector } from '@/store/hooks'
import { useLazyGetAllWinnersQuery } from '@/store/winners/winnersApi'
import { winnersSelectors } from '@/store/winners/winnersSlice'
import type { WinnerWithCar } from '../types/winner'

export const useGetWinners = () => {
  const filters = useAppSelector(winnersSelectors.getFilters)
  const [getWinners, { data, error, isLoading, isFetching }] =
    useLazyGetAllWinnersQuery()
  const [
    getCar,
    {
      error: getCarsError,
      isLoading: getCarsLoading,
      isFetching: getCarsFetching,
    },
  ] = useLazyGetOneCarQuery()
  const [mixedData, setMixedData] = useState<WinnerWithCar[]>([])

  useEffect(() => {
    ;(async () =>
      await requestWithSchema(
        getWinnersSchema,
        filters,
        async (data) => await getWinners(data).unwrap(),
      ))()
  }, [filters])

  useEffect(() => {
    if (!data || !data.length) {
      setMixedData([])
      return
    }

    ;(async () => {
      const cars = await Promise.all(
        data.map((winner) => getCar({ id: winner.id }).unwrap()),
      )

      const mixed = data.map(({ id, wins, time }) => {
        const car = cars.find((c) => c.id === id)
        if (!car) return { id, wins, time, name: 'Unknown', color: '#000' }

        return {
          wins,
          time,
          id: car.id,
          name: car.name,
          color: car.color,
        }
      })

      setMixedData(mixed)
    })()
  }, [data])

  return {
    data: mixedData,
    isLoading: isLoading || getCarsLoading,
    isFetching: isFetching || getCarsFetching,
    error: error || getCarsError,
  }
}
