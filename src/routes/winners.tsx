import { createFileRoute } from '@tanstack/react-router'
import { WinnerList } from '@/components/Winner/WinnerList'
import { WinnerPagination } from '@/components/Winner/WinnerPagination'

export const Route = createFileRoute('/winners')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="py-5">
      <h1 className="mb-5 text-white text-3xl font-bold">Winners</h1>
      <div></div>

      <WinnerList className="mb-10" />
      <WinnerPagination />
    </main>
  )
}
