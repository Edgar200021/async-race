import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Car } from "@/types/car";
import type { Winner } from "@/types/winner";
import type { Nullable } from "../../types/base";

type State = {
	// filters: GetAllCarsRequest;
	winner: Nullable<Omit<Winner, "wins"> & { name: Car["name"] }>;
	isCancelledDuringRace: boolean;
};

const initialState: State = {
	// filters: {
	// 	_limit: GET_CARS_MAX_LIMIT,
	// 	_page: 1,
	// },
	totalCount: null,
	winner: null,
	isCancelledDuringRace: false,
};

export const winnersSlice = createSlice({
	name: "winners",
	initialState,
	reducers: {
		// setFilters: <K extends keyof GetAllCarsRequest>(
		// 	state: State,
		// 	{
		// 		payload: { key, data },
		// 	}: PayloadAction<{
		// 		key: K;
		// 		data: GetAllCarsRequest[K];
		// 	}>,
		// ) => {
		// 	state.filters[key] = data;
		// },

		setWinner: (
			state,
			action: PayloadAction<
				Nullable<Omit<Winner, "wins"> & { name: Car["name"] }>
			>,
		) => {
			if (action.payload !== null && state.winner !== null) return;
			state.winner = action.payload;
		},
		setIsCancelledDuringRace: (state, action: PayloadAction<boolean>) => {
			state.isCancelledDuringRace = action.payload;
		},
		resetState: (state) => {
			state.isCancelledDuringRace = false;
			state.winner = null;
		},
	},
	selectors: {
		// getFilters: (state) => state.filters,
		// getFiltersLimit: (state) => state.filters._limit,
		// getFiltersPage: (state) => state.filters._page,
		getWinner: (state) => state.winner,
		getIsCancelledDuringRace: (state) => state.isCancelledDuringRace,
	},
});

export const { selectors: winnersSelectors, actions: winnersActions } =
	winnersSlice;
