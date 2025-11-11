import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { CarIcon, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { WinnerWithCar } from '@/types/winner'
import { SortWinners } from './SortWinners'

const columnHelper = createColumnHelper<WinnerWithCar>()

const columns = [
  columnHelper.accessor('id', {
    header: () => (
      <span className="text-left text-white/60 text-sm font-semibold uppercase tracking-wider">
        &#8470;
      </span>
    ),
    cell: (info) => (
      <span className="font-bold text-white/90">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor('color', {
    header: () => (
      <span className="text-left text-white/60 text-sm font-semibold uppercase tracking-wider">
        Car
      </span>
    ),
    cell: (info) => (
      <div className="flex items-center gap-3">
        <CarIcon
          size={60}
          className="drop-shadow-lg transition-transform hover:scale-110"
          style={{ color: info.getValue() }}
        />
      </div>
    ),
  }),
  columnHelper.accessor('name', {
    header: () => (
      <span className="text-left text-white/60 text-sm font-semibold uppercase tracking-wider">
        Name
      </span>
    ),
    cell: (info) => (
      <span className="text-white font-bold text-lg drop-shadow-md">
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor('wins', {
    header: () => (
      <span className="text-left text-white/60 text-sm font-semibold uppercase tracking-wider">
        Wins
      </span>
    ),
    cell: (info) => (
      <div className="flex items-center gap-2">
        <span className="text-amber-300 font-bold text-lg drop-shadow-md">
          {info.getValue()}
        </span>
        <Trophy className="w-4 h-4 text-amber-300" />
      </div>
    ),
  }),
  columnHelper.accessor('time', {
    header: () => (
      <span className="text-left text-white/60 text-sm font-semibold uppercase tracking-wider">
        Best Time (s)
      </span>
    ),
    cell: (info) => (
      <span className="text-cyan-300 font-mono font-bold text-lg drop-shadow-md">
        {info.getValue().toFixed(2)}
      </span>
    ),
  }),
]

interface Props {
  data: WinnerWithCar[]
  total: number
  className?: string
  isFetching?: boolean
}

export const WinnersTable = ({ data, className, isFetching, total }: Props) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div
      className={cn(
        'rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl shadow-2xl border border-white/10 overflow-hidden',
        'transition-all duration-300 hover:shadow-3xl',
        className,
      )}
    >
      <SortWinners />
      <div className="block max-[580px]:hidden">
        <table className="w-full border-collapse">
          <thead className="bg-linear-to-r from-slate-800 to-slate-700/80 border-b border-white/10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left font-semibold transition-colors hover:bg-white/5"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            className={cn(
              'transition-opacity duration-200',
              isFetching && 'opacity-50',
            )}
          >
            {table.getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  className={
                    'transition-all duration-300 border-b border-white/5 last:border-b-0 hover:bg-white/5 cursor-default group even:bg-white/2'
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 transition-all duration-300 group-hover:translate-x-1"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="block min-[580px]:hidden">
        <div className="p-4 space-y-4">
          {data.map((winner, index) => (
            <div
              key={winner.id}
              className={cn(
                'bg-slate-700/50 rounded-xl p-4 border border-white/10',
                'transition-all duration-300 hover:bg-slate-700/70',
                isFetching && 'opacity-50',
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-white/90 text-lg">
                    #{winner.id}
                  </span>
                  <CarIcon
                    size={40}
                    className="drop-shadow-lg"
                    style={{ color: winner.color }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-300 font-bold text-lg">
                    {winner.wins}
                  </span>
                  <Trophy className="w-4 h-4 text-amber-300" />
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-white/60 text-sm">Name</span>
                  <p className="text-white font-bold text-lg">{winner.name}</p>
                </div>

                <div>
                  <span className="text-white/60 text-sm">Best Time</span>
                  <p className="text-cyan-300 font-mono font-bold">
                    {winner.time.toFixed(2)}s
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-linear-to-r from-slate-800 to-slate-700/80 px-6 py-3 border-t border-white/10">
        <div className="flex flex-col sm:flex-row items-center justify-between text-lg text-white gap-2">
          <span>Total winners: {total}</span>
          <span>🏁 Racing League</span>
        </div>
      </div>
    </div>
  )
}
