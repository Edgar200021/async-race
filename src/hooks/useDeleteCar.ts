import { useCallback } from 'react'
import { requestWithSchema } from '@/lib/requestWithSchema'
import { deleteCarSchema } from '@/schemas/cars/deletCar.schema'
import { useDeleteCarMutation } from '@/store/cars/carsApi'
import { useDeleteWinnerMutation } from '@/store/winners/winnersApi'
import type { Car } from '@/types/car'

export const useDeleteCar = (carId: Car['id']) => {
  const [deleteCar, { isLoading, error }] = useDeleteCarMutation()
  const [deleteWinner] = useDeleteWinnerMutation()

  const onClick = useCallback(async () => {
    await requestWithSchema(deleteCarSchema, { id: carId }, async () => {
      await deleteCar({ id: carId }).unwrap()
      deleteWinner({ id: carId }).unwrap()
    })
  }, [carId])

  return {
    isLoading,
    error,
    onClick,
  }
}
