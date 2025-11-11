import { faker } from '@faker-js/faker'
import { RefreshCw } from 'lucide-react'
import { useCallback } from 'react'
import { GENERATED_CARS_LENGTH } from '@/const/const'
import { GET_CARS_MAX_LIMIT } from '@/const/store'
import { useHandleError } from '@/hooks/useHandleError'
import { requestWithSchema } from '@/lib/requestWithSchema'
import { cn } from '@/lib/utils'
import { createCarSchema } from '@/schemas/cars/createCar.schema'
import { useCreateCarMutation } from '@/store/cars/carsApi'
import { carsActions, carsSelectors } from '@/store/cars/carsSlice'
import { engineSelectors } from '@/store/engine/engineSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Button } from '../ui/Button'

interface Props {
  className?: string
}

export const GenerateCars = ({ className }: Props) => {
  const [createCar, { isLoading, error }] = useCreateCarMutation()
  useHandleError(error)
  const page = useAppSelector(carsSelectors.getFiltersPage)
  const currentTotal = useAppSelector(carsSelectors.getTotalCount)
  const engineStatus = useAppSelector(engineSelectors.getStatus)

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

    dispatch(carsActions.setFilters({ key: '_page', data: nextPage }))
  }, [page, currentTotal])

  return (
    <Button
      disabled={
        isLoading || (engineStatus !== null && engineStatus !== 'finished')
      }
      onClick={async () => await onGenerateCares()}
      className={cn(
        'group flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl border transition-all duration-300 cursor-pointer',
        'border-slate-700  text-slate-200 shadow-[inset_0_0_0_0_rgba(59,130,246,0)]',
        'hover:shadow-[0_0_15px_rgba(59,130,246,0.7)] hover:border-blue-500 hover:text-blue-400 hover:scale-105',
        'active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed bg-transparent!',
        className,
      )}
    >
      <RefreshCw className="w-4 h-4 text-blue-400 transition-transform duration-300 group-hover:rotate-45" />
      <span>Generate Cars</span>
    </Button>
  )
}
