import { steeringWheel } from '@lucide/lab'
import { Icon } from 'lucide-react'
import toast from 'react-hot-toast'
import pedalIcon from '@/assets/pedal1.png'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/AlertDialog'
import { useHandleError } from '@/hooks/useHandleError'
import { requestWithSchema } from '@/lib/requestWithSchema'
import { cn } from '@/lib/utils'
import { deleteCarSchema } from '@/schemas/cars/deletCar.schema'
import { useDeleteMutation } from '@/store/cars/carsApi'
import { carsActions, carsSelectors } from '@/store/cars/carsSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import type { Car } from '@/types/car'
import { Button } from '../ui/Button'

interface Props {
  className?: string
  car: Car
}

export const CarActions = ({ car, className }: Props) => {
  const [deleteCar, { isLoading, error }] = useDeleteMutation()
  useHandleError(error)
  const selectedCar = useAppSelector(carsSelectors.getSelectedCar)

  const dispatch = useAppDispatch()

  return (
    <div className={cn('flex flex-col gap-y-2', className)}>
      <div className="flex items-center gap-x-3 ">
        <Button
          onClick={() =>
            dispatch(
              carsActions.setCar(car.id === selectedCar?.id ? null : car),
            )
          }
          disabled={isLoading}
          variant="ghost"
          className={cn(
            'flex items-center justify-center gap-2 px-4 py-2 border border-slate-700 rounded-lg text-white transition-all duration-200 cursor-pointer hover:scale-105 hover:text-blue-400 hover:shadow-[0_0_10px_rgba(59,130,246,0.7)] focus:outline-none min-w-20 max-w-28 w-full hover:bg-transparent',
            {
              'text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.7)]':
                selectedCar?.id === car.id,
            },
          )}
        >
          <span className="font-semibold md:text-xl">Select</span>
        </Button>
        <Button
          variant="ghost"
          className="p-0! cursor-pointer max-w-fit! text-white hover:rotate-45 transition-transform duration-300 hover:text-white hover:bg-transparent!"
          title="Run"
        >
          <Icon
            className="w-7! h-7! transition-transform duration-300"
            iconNode={steeringWheel}
          />
        </Button>
      </div>
      <div className="flex items-center gap-x-3">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              disabled={isLoading}
              variant="ghost"
              className="flex items-center justify-center gap-2 p-0 px-4 py-2 border border-slate-700 rounded-lg text-white transition-all duration-200 cursor-pointer hover:scale-105 hover:text-red-500 hover:shadow-[0_0_10px_rgba(239,68,68,0.7)] focus:outline-none hover:bg-transparent min-w-20 max-w-28 w-full"
            >
              <span className="font-semibold md:text-xl">Remove</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete
                car&nbsp; #{car.id}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer ">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="cursor-pointer bg-red-500 hover:bg-red-600"
                onClick={async () =>
                  await requestWithSchema(
                    deleteCarSchema,
                    { id: car.id },
                    async (data) => {
                      await deleteCar(data).unwrap()
                      toast.success(`Car #${car.id} successfully deleted`)
                    },
                  )
                }
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button
          variant="ghost"
          className="p-0! cursor-pointer max-w-fit!s text-white hover:-rotate-15 transition-transform duration-300 hover:text-blue-400 hover:bg-transparent!"
          title="Stop"
        >
          <img
            alt="pedal"
            src={pedalIcon}
            className="w-7! h-7! transition-transform duration-300"
          />
        </Button>
      </div>
    </div>
  )
}
