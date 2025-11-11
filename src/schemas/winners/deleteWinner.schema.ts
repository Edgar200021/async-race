import z from 'zod'

export const deleteWinnerSchema = z.object({
  id: z.number().positive(),
})

export type DeleteWinnerSchema = z.infer<typeof deleteWinnerSchema>
