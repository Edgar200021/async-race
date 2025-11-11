import type z from 'zod'
import { createWinnerSchema } from './createWinner.schema'

export const updateWinnerSchema = createWinnerSchema

export type UpdateWinnerSchema = z.infer<typeof updateWinnerSchema>
