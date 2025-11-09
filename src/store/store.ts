import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";
import { carsSlice } from "./cars/carsSlice";

export const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
		[carsSlice.reducerPath]: carsSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			baseApi.middleware,
		),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
