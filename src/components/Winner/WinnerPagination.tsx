import { GET_WINNERS_MAX_LIMIT } from '@/const/store'
import { cn } from '@/lib/utils'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { winnersActions, winnersSelectors } from '@/store/winners/winnersSlice'
import { Pagination } from '../ui/Pagination'

interface Props {
  className?: string
}

export const WinnerPagination = ({ className }: Props) => {
  const total = useAppSelector(winnersSelectors.getTotalCount)
  const { _page, _limit } = useAppSelector(winnersSelectors.getFilters)
  const dispatch = useAppDispatch()

  if (!total) return null

  return (
    <Pagination
      className={cn('max-w-fit mx-auto', className)}
      totalPages={Math.ceil(total / (_limit ?? GET_WINNERS_MAX_LIMIT))}
      currentPage={_page || 1}
      onPageChange={(page) => {
        dispatch(winnersActions.setFilters({ key: '_page', data: page }))
      }}
    />
  )
}
