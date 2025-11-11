import { Timer, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { GetWinnersSchema } from '@/schemas/winners/getWinners.schema'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { winnersActions, winnersSelectors } from '@/store/winners/winnersSlice'

export const SortWinners = () => {
  const sort = useAppSelector(winnersSelectors.getFiltersSort)
  const sortOrder = useAppSelector(winnersSelectors.getFiltersSortOrder)
  const dispatch = useAppDispatch()

  console.log(sort, sortOrder)

  const renderSort = ({
    _sort,
    _order,
  }: Pick<GetWinnersSchema, '_sort' | '_order'>) => {
    const isActive = sort === _sort && sortOrder === _order
    const isWins = _sort === 'wins'

    return (
      <Button
        key={`${_sort}-${_order}`}
        variant="outline"
        onClick={() => dispatch(winnersActions.setSort({ _sort, _order }))}
        className={cn(
          'flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm sm:text-base font-semibold tracking-wide transition-all',
          'border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:scale-[1.05] active:scale-95 bg-transparent cursor-pointer',
          isActive &&
            (isWins
              ? 'bg-amber-500/20 border-amber-400/40 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.3)]'
              : 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.3)]'),
        )}
      >
        {isWins ? (
          <Trophy
            size={18}
            className={cn('transition-transform', isActive && 'scale-110')}
          />
        ) : (
          <Timer
            size={18}
            className={cn('transition-transform', isActive && 'scale-110')}
          />
        )}
        <span className="capitalize">{_sort}</span>
        <span className="opacity-80 text-xs sm:text-sm font-normal">
          ({_order?.toLowerCase()})
        </span>
      </Button>
    )
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 p-3 sm:p-4">
      {(
        [
          { _sort: 'wins', _order: 'DESC' },
          { _sort: 'wins', _order: 'ASC' },
          { _sort: 'time', _order: 'DESC' },
          { _sort: 'time', _order: 'ASC' },
        ] as Pick<GetWinnersSchema, '_sort' | '_order'>[]
      ).map(renderSort)}
    </div>
  )
}
