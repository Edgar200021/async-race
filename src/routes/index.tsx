import { createFileRoute } from '@tanstack/react-router'
import { CarFormWrapper } from '@/components/Car/CarFormWrapper'
import { CarList } from '@/components/Car/CarList'
import { CarPagination } from '@/components/Car/CarPagination'
import { GenerateCars } from '@/components/Car/GenerateCars'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <main className="py-10">
      <h1 className="mb-10 text-white text-3xl md:text-7xl font-bold">
        Garage
      </h1>
      <div className="flex items-center justify-between mb-10">
        <span></span>
        <div className="flex flex-col gap-y-5">
          <CarFormWrapper />
          <GenerateCars />
        </div>
      </div>

      <CarList className="mb-10" />
      <CarPagination />
    </main>
  )
}
