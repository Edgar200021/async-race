import { LoaderCircle } from 'lucide-react'
import { useGetWinners } from '@/hooks/useGetWinners'
import { useAppSelector } from '@/store/hooks'
import { winnersSelectors } from '@/store/winners/winnersSlice'
import { EmptyList } from '../ui/EmptyList'
import { ErrorLabel } from '../ui/ErrorLabel'
import { WinnersTable } from './WinnerTable'

interface Props {
  className?: string
}

export const WinnerList = ({ className }: Props) => {
  const { data, error, isLoading, isFetching } = useGetWinners()
  const total = useAppSelector(winnersSelectors.getTotalCount)

  if (isLoading)
    return (
      <div className="flex justify-center">
        <LoaderCircle size={120} className="animate-spin text-blue-500" />
      </div>
    )

  if (error || !data) return <ErrorLabel />
  if (!data?.length)
    return (
      <EmptyList
        title="No champions found"
        description="The track is silent for now... Race ahead and claim your victory!"
      />
    )

  return (
    <WinnersTable
      data={data}
      isFetching={isFetching}
      className={className}
      total={total || 1}
    />
  )
}
