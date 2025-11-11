import z from 'zod'

export const createWinnerSchema = z.object({
  id: z.number().positive(),
  wins: z.number().positive(),
  time: z.number().positive(),
})

export type CreateWinnerSchema = z.infer<typeof createWinnerSchema>
