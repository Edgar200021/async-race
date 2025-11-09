import { faker } from '@faker-js/faker'
import { RefreshCw } from 'lucide-react'
import { useCallback } from 'react'
import { GENERATED_CARS_LENGTH } from '@/const/const'
import { GET_CARS_MAX_LIMIT, TAGS } from '@/const/store'
import { useHandleError } from '@/hooks/useHandleError'
import { requestWithSchema } from '@/lib/requestWithSchema'
import { cn } from '@/lib/utils'
import { createCarSchema } from '@/schemas/cars/createCar.schema'
import { carsApi, useCreateMutation } from '@/store/cars/carsApi'
import { carsActions, carsSelectors } from '@/store/cars/carsSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Button } from '../ui/Button'

interface Props {
  className?: string
}

export const GenerateCars = ({ className }: Props) => {
  const [createCar, { isLoading, error }] = useCreateMutation()
  useHandleError(error)
  const page = useAppSelector(carsSelectors.getFiltersPage)
  const currentTotal = useAppSelector(carsSelectors.getTotalCount)

  const dispatch = useAppDispatch()

  const onGenerateCares = useCallback(async () => {
    const result = await Promise.allSettled(
      Array.from({ length: GENERATED_CARS_LENGTH }).map(() => {
        const data = {
          name: faker.vehicle.vehicle(),
          color: faker.color.rgb(),
        }

        return requestWithSchema(createCarSchema, data, createCar)
      }),
    )

    const successResponsesCount = result.filter(
      (res) => res.status === 'fulfilled',
    ).length

    if (successResponsesCount === 0) return

    const totalItemsAfter = (currentTotal ?? 0) + successResponsesCount
    const nextPage = Math.ceil(totalItemsAfter / GET_CARS_MAX_LIMIT)

    carsApi.util.invalidateTags([TAGS.cars])
    dispatch(carsActions.setFilters({ key: '_page', data: nextPage }))
  }, [page, currentTotal])

  return (
    <Button
      disabled={isLoading}
      onClick={async () => await onGenerateCares()}
      className={cn(
        'group flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-stone-700 bg-white border border-stone-200 rounded-xl shadow-sm transition-all duration-300 hover:bg-stone-100 hover:shadow-md hover:border-stone-300 active:scale-[0.97] cursor-pointer',
        className,
      )}
    >
      <RefreshCw className="w-4 h-4 text-stone-500 transition-transform duration-300 group-hover:rotate-45" />
      Generate cars
    </Button>
  )
}
