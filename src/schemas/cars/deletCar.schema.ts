import z from 'zod'

export const deleteCarSchema = z.object({
  id: z.number().positive(),
})

export type DeleteCarSchema = z.infer<typeof deleteCarSchema>
