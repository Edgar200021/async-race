import { Palette } from 'lucide-react'
import type { FormEvent } from 'react'
import { SketchPicker } from 'react-color'
import { Button } from '@/components/ui/Button'
import { useHandleError } from '@/hooks/useHandleError'
import { requestWithSchema } from '@/lib/requestWithSchema'
import { cn } from '@/lib/utils'
import { createCarSchema } from '@/schemas/cars/createCar.schema'
import {
  type UpdateCarSchema,
  updateCarSchema,
} from '@/schemas/cars/updateCar.schema'
import {
  useCreateCarMutation,
  useUpdateCarMutation,
} from '@/store/cars/carsApi'
import { carsActions, carsSelectors } from '@/store/cars/carsSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import type { Car } from '@/types/car'
import { Input } from '../ui/Input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover'

interface Props {
  className?: string
  onSuccess?: () => void
  type:
    | {
        action: 'create'
      }
    | {
        action: 'update'
        car: Car
      }
}

export const CarForm = ({ className, type, onSuccess }: Props) => {
  const [createCar, { isLoading, error }] = useCreateCarMutation()
  const [updateCar, { isLoading: isUpdateLoading, error: updateError }] =
    useUpdateCarMutation()

  const createCarData = useAppSelector(carsSelectors.getCreateCarData)
  const updateCarData = useAppSelector(carsSelectors.getUpdateCarData)

  const dispatch = useAppDispatch()

  useHandleError(error || updateError)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await requestWithSchema(
      type.action === 'create' ? createCarSchema : updateCarSchema,
      type.action === 'create' ? createCarData : updateCarData,
      async (data) => {
        await (
          type.action === 'create'
            ? createCar(data)
            : updateCar(data as UpdateCarSchema)
        ).unwrap()
        onSuccess?.()
        dispatch(
          carsActions[
            type.action === 'create' ? 'setCreateCarData' : 'setUpdateCarData'
          ]({ type: 'empty' }),
        )
      },
    )
  }

  const buttonDisabled =
    type.action === 'create'
      ? !createCarData.name?.trim() || !createCarData.color?.trim()
      : !updateCarData.id ||
        !updateCarData.name?.trim() ||
        !updateCarData.color?.trim() ||
        (updateCarData.color?.trim() === type.car.color &&
          updateCarData.name?.trim() === type.car.name)

  return (
    <form
      className={cn(
        'flex flex-col gap-3 p-4 bg-slate-800 rounded-lg w-80',
        className,
      )}
      onSubmit={onSubmit}
    >
      <fieldset
        disabled={isLoading || isUpdateLoading}
        className="m-0 p-0 flex flex-col gap-y-4"
      >
        <div className="flex flex-col gap-y-2">
          <label className="text-white font-semibold text-lg" htmlFor="name">
            Car Name
          </label>
          <Input
            value={
              (type.action === 'create'
                ? createCarData.name
                : updateCarData.name) ?? ''
            }
            onChange={(e) =>
              dispatch(
                carsActions[
                  type.action === 'create'
                    ? 'setCreateCarData'
                    : 'setUpdateCarData'
                ]({
                  type: 'update',
                  data: { name: e.target.value },
                }),
              )
            }
            placeholder="Enter car name"
            className="text-white"
            id="name"
          />
        </div>

        <div className="flex flex-col gap-y-2 ">
          <label className="text-white font-semibold text-lg" htmlFor="color">
            Car Color
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center justify-center w-7 h-7 p-0 rounded-lg cursor-pointer hover:bg-white transition"
                title="Pick color"
                id="color"
              >
                <Palette
                  className="w-7! h-7"
                  style={{
                    color:
                      type.action === 'create'
                        ? createCarData.color
                        : updateCarData.color,
                  }}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start">
              <SketchPicker
                color={
                  type.action === 'create'
                    ? createCarData.color
                    : updateCarData.color
                }
                onChangeComplete={(color) =>
                  dispatch(
                    carsActions[
                      type.action === 'create'
                        ? 'setCreateCarData'
                        : 'setUpdateCarData'
                    ]({
                      type: 'update',
                      data: {
                        color: color.hex,
                      },
                    }),
                  )
                }
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button
          disabled={buttonDisabled}
          type="submit"
          className="mt-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white w-fit"
          style={{
            borderColor:
              (type.action === 'create'
                ? createCarData.color
                : updateCarData.color) ?? '',
          }}
        >
          {type.action === 'create' ? 'Create' : 'Update'}&nbsp;Car
        </Button>
      </fieldset>
    </form>
  )
}
