import z from 'zod'
import { createCarSchema } from './createCar.schema'

export const updateCarSchema = createCarSchema.extend({
  id: z.number().positive(),
})
export type UpdateCarSchema = z.infer<typeof updateCarSchema>
