import type { Car } from './car'

export type Winner = {
  id: number
  wins: number
  time: number
}

export type WinnerWithCar = Omit<Winner, 'id'> & Car
