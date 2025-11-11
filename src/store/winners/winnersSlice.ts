import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { GET_WINNERS_MAX_LIMIT } from '@/const/store'
import type { Car } from '@/types/car'
import type { Winner } from '@/types/winner'
import type { Field, Nullable } from '../../types/base'
import type { GetAllWinnersRequest } from './types'

type State = {
  filters: GetAllWinnersRequest
  totalCount: Nullable<number>
  winner: Nullable<Omit<Winner, 'wins'> & { name: Car['name'] }>
  isCancelledDuringRace: boolean
}

const initialState: State = {
  filters: {
    _limit: GET_WINNERS_MAX_LIMIT,
    _page: 1,
  },
  totalCount: null,
  winner: null,
  isCancelledDuringRace: false,
}

export const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    setFilters: (
      state: State,
      {
        payload: { key, data },
      }: PayloadAction<Field<Pick<GetAllWinnersRequest, '_limit' | '_page'>>>,
    ) => {
      state.filters[key] = data
    },
    setSort: (
      state: State,
      {
        payload: { _order, _sort },
      }: PayloadAction<Pick<GetAllWinnersRequest, '_sort' | '_order'>>,
    ) => {
      if (state.filters._sort === _sort && state.filters._order === _order) {
        state.filters._sort = undefined
        state.filters._order = undefined

        return
      }

      state.filters._sort = _sort
      state.filters._order = _order
    },
    setTotalCount: (state, action: PayloadAction<Nullable<number>>) => {
      state.totalCount = action.payload
    },
    setWinner: (
      state,
      action: PayloadAction<
        Nullable<Omit<Winner, 'wins'> & { name: Car['name'] }>
      >,
    ) => {
      if (action.payload !== null && state.winner !== null) return
      state.winner = action.payload
    },
    setIsCancelledDuringRace: (state, action: PayloadAction<boolean>) => {
      state.isCancelledDuringRace = action.payload
    },
    resetState: (state) => {
      state.isCancelledDuringRace = false
      state.winner = null
    },
  },
  selectors: {
    getFilters: (state) => state.filters,
    getFiltersLimit: (state) => state.filters._limit,
    getFiltersPage: (state) => state.filters._page,
    getFiltersSort: (state) => state.filters._sort,
    getFiltersSortOrder: (state) => state.filters._order,
    getTotalCount: (state) => state.totalCount,
    getWinner: (state) => state.winner,
    getIsCancelledDuringRace: (state) => state.isCancelledDuringRace,
  },
})

export const { selectors: winnersSelectors, actions: winnersActions } =
  winnersSlice
