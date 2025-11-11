import { LoaderCircle } from 'lucide-react'
import { useEffect } from 'react'
import { requestWithSchema } from '@/lib/requestWithSchema'
import { cn } from '@/lib/utils'
import { getCarsSchema } from '@/schemas/cars/getCars.schema'
import { useLazyGetAllCarsQuery } from '@/store/cars/carsApi'
import { carsSelectors } from '@/store/cars/carsSlice'
import { useAppSelector } from '@/store/hooks'
import { ErrorLabel } from '../ui/ErrorLabel'
import { Car } from './Car'
import { EmptyList } from '../ui/EmptyList'

interface Props {
  className?: string
}

export const CarList = ({ className }: Props) => {
  const filters = useAppSelector(carsSelectors.getFilters)
  const [getCars, { data, error, isLoading, isFetching }] =
    useLazyGetAllCarsQuery()

  useEffect(() => {
    ;(async () =>
      await requestWithSchema(
        getCarsSchema,
        filters,
        async (data) => await getCars(data).unwrap(),
      ))()
  }, [filters])

  if (isLoading || (!error && !data))
    return (
      <div className="flex justify-center">
        <LoaderCircle size={120} className="animate-spin text-blue-500" />
      </div>
    )
  if (error || !data) return <ErrorLabel />
  if (!data?.length)
    return (
      <EmptyList
        title="No cars found"
        description="There are no cars to display. Try adjusting your filters or adding a new
				car."
      />
    )

  return (
    <ul className={cn('flex flex-col gap-y-5 relative', className)}>
      {data.map((car) => (
        <li className={isFetching ? 'opacity-70' : ''} key={car.id}>
          <Car car={car} />
        </li>
      ))}
    </ul>
  )
}
