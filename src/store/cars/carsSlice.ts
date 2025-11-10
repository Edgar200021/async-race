import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { GET_CARS_MAX_LIMIT } from "@/const/store";
import type { Car } from "@/types/car";
import type { Nullable, SetNumberType } from "../../types/base";
import type {
	CreateCarRequest,
	GetAllCarsRequest,
	UpdateCarRequest,
} from "./types";

type State = {
	filters: GetAllCarsRequest;
	totalCount: Nullable<number>;
	selectedCar: Nullable<Car>;
	createCarData: Partial<CreateCarRequest>;
	updateCarData: Partial<UpdateCarRequest>;
	currentPageCarsCount: number;
};

const initialState: State = {
	filters: {
		_limit: GET_CARS_MAX_LIMIT,
		_page: 1,
	},
	totalCount: null,
	selectedCar: null,
	createCarData: {},
	updateCarData: {},
	currentPageCarsCount: 0,
};

export const carsSlice = createSlice({
	name: "cars",
	initialState,
	reducers: {
		setFilters: <K extends keyof GetAllCarsRequest>(
			state: State,
			{
				payload: { key, data },
			}: PayloadAction<{
				key: K;
				data: GetAllCarsRequest[K];
			}>,
		) => {
			state.filters[key] = data;
		},

		setTotalCount: (state, action: PayloadAction<Nullable<number>>) => {
			state.totalCount = action.payload;
		},
		setCar: (state, action: PayloadAction<Nullable<Car>>) => {
			state.selectedCar = action.payload;
			state.updateCarData = action.payload ?? {};
		},

		setCreateCarData: (
			state: State,
			{
				payload,
			}: PayloadAction<
				{ type: "empty" } | { type: "update"; data: Partial<CreateCarRequest> }
			>,
		) => {
			if (payload.type === "empty") {
				state.createCarData = {};
				return;
			}

			state.createCarData = { ...state.createCarData, ...payload.data };
		},

		setUpdateCarData: (
			state: State,
			{
				payload,
			}: PayloadAction<
				{ type: "empty" } | { type: "update"; data: Partial<UpdateCarRequest> }
			>,
		) => {
			if (payload.type === "empty") {
				state.updateCarData = {};
				return;
			}

			state.updateCarData = { ...state.updateCarData, ...payload.data };
		},

		setCurrentPageCarsCount: (
			state: State,
			{ payload }: PayloadAction<SetNumberType>,
		) => {
			if (payload.type === "increment") {
				state.currentPageCarsCount += 1;
			}

			if (payload.type === "decrement") {
				state.currentPageCarsCount -= 1;
			}

			if (payload.type === "bulk") {
				state.currentPageCarsCount = payload.number;
			}
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
		getCurrentPageCarsCount: (state) => state.currentPageCarsCount,
	},
});

export const { selectors: carsSelectors, actions: carsActions } = carsSlice;
