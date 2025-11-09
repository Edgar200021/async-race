import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { GET_CARS_MAX_LIMIT } from '@/const/store'
import type { Car } from '@/types/car'
import type { Nullable } from '../../types/base'
import type {
  CreateCarRequest,
  GetAllCarsRequest,
  UpdateCarRequest,
} from './types'

type State = {
  filters: GetAllCarsRequest
  totalCount: Nullable<number>
  selectedCar: Nullable<Car>
  createCarData: Partial<CreateCarRequest>
  updateCarData: Partial<UpdateCarRequest>
}

const initialState: State = {
  filters: {
    _limit: GET_CARS_MAX_LIMIT,
    _page: 1,
  },
  totalCount: null,
  selectedCar: null,
  createCarData: {},
  updateCarData: {},
}

type MutationPayload<T, K extends keyof T = keyof T> =
  | {
      type: 'single'
      key: K
      data: T[K]
    }
  | {
      type: 'multiple'
      data: Partial<T>
    }

export const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setFilters: <K extends keyof GetAllCarsRequest>(
      state: State,
      {
        payload: { key, data },
      }: PayloadAction<{
        key: K
        data: GetAllCarsRequest[K]
      }>,
    ) => {
      state.filters[key] = data
    },

    setTotalCount: (state, action: PayloadAction<Nullable<number>>) => {
      state.totalCount = action.payload
    },
    setCar: (state, action: PayloadAction<Nullable<Car>>) => {
      state.selectedCar = action.payload
      state.updateCarData = action.payload ?? {}
    },

    setCreateCarData: (
      state: State,
      { payload }: PayloadAction<MutationPayload<CreateCarRequest>>,
    ) => {
      if (payload.type === 'single') {
        state.createCarData[payload.key] = payload.data
        return
      }

      state.createCarData = payload.data
    },

    setUpdateCarData: <K extends keyof UpdateCarRequest>(
      state: State,
      { payload }: PayloadAction<MutationPayload<UpdateCarRequest, K>>,
    ) => {
      if (payload.type === 'single') {
        state.updateCarData[payload.key] = payload.data
        return
      }

      state.updateCarData = payload.data
    },
  },
  selectors: {
    getFilters: (state) => state.filters,
    getFiltersLimit: (state) => state.filters._limit,
    getFiltersPage: (state) => state.filters._page,
    getTotalCount: (state) => state.totalCount,
    getSelectedCar: (state) => state.selectedCar,
    getCreateCarData: (state) => state.createCarData,
    getUpdateCarData: (state) => state.updateCarData,
  },
})

export const { selectors: carsSelectors, actions: carsActions } = carsSlice
