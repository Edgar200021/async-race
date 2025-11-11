import z from 'zod'
import { paginationSchema } from '../base'

export const getWinnersSchema = z
  .object({
    _sort: z.literal(['id', 'wins', 'time']).optional(),
    _order: z.literal(['ASC', 'DESC']).optional(),
  })
  .extend(paginationSchema.shape)

export type GetWinnersSchema = z.infer<typeof getWinnersSchema>
