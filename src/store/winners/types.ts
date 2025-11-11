import type { CreateWinnerSchema } from '@/schemas/winners/createWinner.schema'
import type { DeleteWinnerSchema } from '@/schemas/winners/deleteWinner.schema'
import type { GetWinnerSchema } from '@/schemas/winners/getWinner.schema'
import type { GetWinnersSchema } from '@/schemas/winners/getWinners.schema'
import type { UpdateWinnerSchema } from '@/schemas/winners/updateWinner.schema'
import type { Winner } from '@/types/winner'

export type GetAllWinnersRequest = GetWinnersSchema
export type GetAllWinnersResponse = Winner[]

export type GetWinnerRequest = GetWinnerSchema
export type GetWinnerResponse = Winner

export type CreateWinnerRequest = CreateWinnerSchema
export type CreateWinnerResponse = Winner

export type UpdateWinnerRequest = UpdateWinnerSchema
export type UpdateWinnerResponse = Winner

export type DeleteWinnerRequest = DeleteWinnerSchema
export type DeleteWinnerResponse = null
