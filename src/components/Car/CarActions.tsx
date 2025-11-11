import { steeringWheel } from '@lucide/lab'
import { Icon, StopCircle } from 'lucide-react'
import type React from 'react'
import toast from 'react-hot-toast'
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
import { useDeleteCar } from '@/hooks/useDeleteCar'
import { useHandleEngineStatus } from '@/hooks/useHandleEngineStatus'
import { useHandleError } from '@/hooks/useHandleError'
import { cn } from '@/lib/utils'
import { carsActions, carsSelectors } from '@/store/cars/carsSlice'
import { engineActions } from '@/store/engine/engineSlice'
import type { ToggleEngingeStatusResponse } from '@/store/engine/types'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { winnersActions } from '@/store/winners/winnersSlice'
import { type Car, CarStatus } from '@/types/car'
import { Button } from '../ui/Button'

interface Props {
  className?: string
  car: Car
  renderCar: (
    status: CarStatus,
    isBroken: boolean,
    data: ToggleEngingeStatusResponse | undefined,
  ) => React.ReactNode
}

export const CarActions = ({ car, className, renderCar }: Props) => {
  const selectedCar = useAppSelector(carsSelectors.getSelectedCar)
  const dispatch = useAppDispatch()

  const { onClick: deleteCar, isLoading, error } = useDeleteCar(car.id)
  const {
    onClick,
    isLoading: handleEngineStatusLoading,
    error: handleEngineStatusError,
    status,
    isBroken,
    data,
  } = useHandleEngineStatus(car.id)

  useHandleError(error || handleEngineStatusError)

  return (
    <>
      <div className={cn('flex flex-col gap-y-2', className)}>
        <div className="flex items-center gap-x-3 ">
          <Button
            disabled={
              isLoading ||
              handleEngineStatusLoading ||
              status !== CarStatus.Stopped
            }
            onClick={() =>
              dispatch(
                carsActions.setCar(car.id === selectedCar?.id ? null : car),
              )
            }
            variant="ghost"
            className={cn(
              'flex items-center justify-center gap-2 px-4 py-2 border border-slate-700 rounded-lg text-white transition-all duration-200 cursor-pointer hover:scale-105 hover:text-blue-400 hover:shadow-[0_0_10px_rgba(59,130,246,0.7)] focus:outline-none min-w-20 max-w-28 w-full hover:bg-transparent',
              {
                'text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.7)]':
                  selectedCar?.id === car.id,
              },
            )}
          >
            <span className="font-semibold">Select</span>
          </Button>
          <Button
            disabled={isLoading || handleEngineStatusLoading}
            onClick={async () => {
              if (status === CarStatus.Started || status === CarStatus.Drive)
                return

              await onClick(CarStatus.Started)
            }}
            variant="ghost"
            className={cn(
              'p-0! cursor-pointer max-w-fit! text-white hover:rotate-45 transition-transform duration-300 hover:text-white hover:bg-transparent!',
              {
                'cursor-not-allowed pointer-none opacity-70':
                  status === CarStatus.Drive || status === CarStatus.Started,
              },
            )}
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
                disabled={
                  isLoading ||
                  handleEngineStatusLoading ||
                  status !== CarStatus.Stopped
                }
                variant="ghost"
                className="flex items-center justify-center gap-2 p-0 px-4 py-2 border border-slate-700 rounded-lg text-white transition-all duration-200 cursor-pointer hover:scale-105 hover:text-red-500 hover:shadow-[0_0_10px_rgba(239,68,68,0.7)] focus:outline-none hover:bg-transparent min-w-20 max-w-28 w-full"
              >
                <span className="font-semibold">Remove</span>
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
                  disabled={
                    isLoading ||
                    handleEngineStatusLoading ||
                    status !== CarStatus.Stopped
                  }
                  className="cursor-pointer bg-red-500 hover:bg-red-600"
                  onClick={async () => {
                    await deleteCar()
                    toast.success(`Car #${car.id} successfully deleted`)
                  }}
                >
                  Remove
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            disabled={isLoading || handleEngineStatusLoading}
            onClick={async () => {
              if (status === 'stopped') return

              await onClick(CarStatus.Stopped)
              dispatch(winnersActions.setIsCancelledDuringRace(true))
              dispatch(
                engineActions.setReadyCar({ type: 'remove', carId: car.id }),
              )
            }}
            variant="ghost"
            className={cn(
              'p-0! cursor-pointer max-w-fit!s text-white transition-transform duration-300 hover:scale-110 hover:bg-transparentk hover:text-white',
              {
                'cursor-not-allowed! pointer-none opacity-70':
                  status === CarStatus.Stopped || status === CarStatus.Started,
              },
            )}
            title="Stop"
          >
            <StopCircle className="w-7! h-7! transition-transform" />
          </Button>
        </div>
      </div>
      {renderCar(status, isBroken, data)}
    </>
  )
}
