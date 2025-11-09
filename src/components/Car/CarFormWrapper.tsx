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
  const dispatch = useAppDispatch()

  return (
    <div className={cn('flex items-center gap-x-5 ', className)}>
      <Dialog open={createFormOpened} onOpenChange={setCreateFormOpened}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="group flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-stone-700 bg-white border border-stone-200 rounded-xl shadow-sm transition-all duration-300 hover:bg-stone-100 hover:shadow-md hover:border-stone-300 active:scale-[0.97] cursor-pointer"
          >
            <Plus className="w-4 h-4 text-stone-500 transition-transform duration-300 group-hover:rotate-90" />
            Create car
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
            disabled={!selectedCar}
            variant="ghost"
            className="group flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-stone-700 bg-white border border-stone-200 rounded-xl shadow-sm transition-all duration-300 hover:bg-stone-100 hover:shadow-md hover:border-stone-300 active:scale-[0.97] cursor-pointer"
          >
            <Edit className="w-4 h-4 text-stone-500 transition-transform duration-300 group-hover:rotate-12" />{' '}
            Update car
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
