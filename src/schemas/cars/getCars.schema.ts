import z from 'zod'

export const getCarsSchema = z.object({
  _limit: z.number().positive().optional(),
  _page: z.number().positive().optional(),
})

export type GetCarsSchema = z.infer<typeof getCarsSchema>
