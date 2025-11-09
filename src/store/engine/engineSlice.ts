import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type State = {}

const initialState: State = {}

export const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  selectors: {},
})

export const { selectors: carsSelectors, actions: carsActions } = carsSlice
