import { Edit, Plus } from 'lucide-react'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'
import { cn } from '@/lib/utils'
import { carsActions, carsSelectors } from '@/store/cars/carsSlice'
import { engineSelectors } from '@/store/engine/engineSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { CarForm } from '../forms/CarForm'
import { Button } from '../ui/Button'

interface Props {
  className?: string
}

export const CarFormWrapper = ({ className }: Props) => {
  const selectedCar = useAppSelector(carsSelectors.getSelectedCar)
  const [createFormOpened, setCreateFormOpened] = useState(false)
  const [updateFormOpened, setUpdateFormOpened] = useState(false)
  const engineStatus = useAppSelector(engineSelectors.getStatus)
  const dispatch = useAppDispatch()

  return (
    <div className={cn('flex items-center gap-x-5 ', className)}>
      <Dialog open={createFormOpened} onOpenChange={setCreateFormOpened}>
        <DialogTrigger asChild>
          <Button
            disabled={engineStatus !== null && engineStatus !== 'finished'}
            variant="ghost"
            className={cn(
              'group flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl border transition-all duration-300 cursor-pointer',
              'border-slate-700 bg-slate-900 text-slate-200 shadow-[inset_0_0_0_0_rgba(59,130,246,0.0)]',
              'hover:shadow-[0_0_15px_rgba(59,130,246,0.7)] hover:border-blue-500 hover:text-blue-400 hover:scale-105',
              'active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-transparent',
            )}
          >
            <Plus className="w-4 h-4 text-blue-400 transition-transform duration-300 group-hover:rotate-90" />
            <span>Create Car</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 bg-slate-800 py-4">
          <DialogHeader>
            <DialogTitle className="hidden"></DialogTitle>
            <DialogDescription className="text-center text-3xl font-bold text-white">
              Create car
            </DialogDescription>
          </DialogHeader>
          <CarForm
            onSuccess={() => setCreateFormOpened(false)}
            className="w-full"
            type={{ action: 'create' }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={updateFormOpened} onOpenChange={setUpdateFormOpened}>
        <DialogTrigger asChild>
          <Button
            disabled={
              !selectedCar ||
              (engineStatus !== null && engineStatus !== 'finished')
            }
            variant="ghost"
            className={cn(
              'group flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl border transition-all duration-300 cursor-pointer',
              'border-slate-700 bg-slate-900 text-slate-200 shadow-[inset_0_0_0_0_rgba(250,204,21,0.0)]',
              'hover:shadow-[0_0_15px_rgba(250,204,21,0.7)] hover:border-yellow-400 hover:text-yellow-300 hover:scale-105',
              'active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-transparent',
            )}
          >
            <Edit className="w-4 h-4 text-yellow-400 transition-transform duration-300 group-hover:rotate-12" />
            <span>Update Car</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 bg-slate-800 py-4">
          <DialogHeader>
            <DialogTitle className="hidden"></DialogTitle>
            <DialogDescription className="text-center text-3xl font-bold text-white">
              Update car
            </DialogDescription>
          </DialogHeader>
          {selectedCar && (
            <CarForm
              className="w-full"
              type={{ action: 'update', car: selectedCar }}
              onSuccess={() => {
                setUpdateFormOpened(false)
                dispatch(carsActions.setCar(null))
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
