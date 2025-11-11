import z from 'zod'

export const paginationSchema = z.object({
  _limit: z.number().positive().optional(),
  _page: z.number().positive().optional(),
})
