import z from 'zod'

export const getWinnerSchema = z.object({
  id: z.number().positive(),
})

export type GetWinnerSchema = z.infer<typeof getWinnerSchema>
