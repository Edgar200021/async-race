import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './baseApi'
import { carsSlice } from './cars/carsSlice'
import { engineSlice } from './engine/engineSlice'
import { winnersSlice } from './winners/winnersSlice'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [carsSlice.reducerPath]: carsSlice.reducer,
    [engineSlice.reducerPath]: engineSlice.reducer,
    [winnersSlice.reducerPath]: winnersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      baseApi.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
