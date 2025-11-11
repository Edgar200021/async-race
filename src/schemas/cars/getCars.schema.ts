import type z from 'zod'
import { paginationSchema } from '../base'

export const getCarsSchema = paginationSchema
export type GetCarsSchema = z.infer<typeof getCarsSchema>
