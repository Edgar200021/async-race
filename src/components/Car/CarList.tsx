import { FileMinus, LoaderCircle } from 'lucide-react'
import { useEffect } from 'react'
import { requestWithSchema } from '@/lib/requestWithSchema'
import { cn } from '@/lib/utils'
import { getCarsSchema } from '@/schemas/cars/getCars.schema'
import { useLazyGetAllQuery } from '@/store/cars/carsApi'
import { carsSelectors } from '@/store/cars/carsSlice'
import { useAppSelector } from '@/store/hooks'
import { ErrorLabel } from '../ui/ErrorLabel'
import { Car } from './Car'
import { EmptyCarList } from './EmptyCarList'

interface Props {
  className?: string
}

export const CarList = ({ className }: Props) => {
  const filters = useAppSelector(carsSelectors.getFilters)
  const [getCars, { data, error, isLoading, isFetching }] = useLazyGetAllQuery()

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
  if (!data?.length) return <EmptyCarList />

  return (
    <ul className={cn('flex flex-col gap-y-10 relative py-10', className)}>
      {data.map((car) => (
        <li className={isFetching ? 'opacity-70' : ''} key={car.id}>
          <Car car={car} />
        </li>
      ))}
    </ul>
  )
}
