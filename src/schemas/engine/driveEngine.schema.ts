import z from 'zod'
import { CarStatus } from '../../types/car'

export const driveEngineSchema = z.object({
  status: z.enum([CarStatus.Drive]),
  id: z.number().positive(),
})

export type DriveEngineSchema = z.infer<typeof driveEngineSchema>
