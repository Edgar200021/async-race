import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Nullable } from "@/types/base";
import type { Car } from "@/types/car";
import type { EngineStatus } from "@/types/engine";

type State = {
	status: Nullable<EngineStatus>;
	readyCars: Car["id"][] | null;
	brokenCars: Car["id"][] | null;
};

const initialState: State = {
	status: null,
	readyCars: null,
	brokenCars: null,
};

export const engineSlice = createSlice({
	name: "engine",
	initialState,
	reducers: {
		setStatus: (state, { payload }: PayloadAction<Nullable<EngineStatus>>) => {
			state.status = payload;
		},
		setReadyCar: (
			state,
			{
				payload,
			}: PayloadAction<
				({ type: "remove" } | { type: "set" }) & { carId: Car["id"] }
			>,
		) => {
			if (!state.readyCars) state.readyCars = [];

			if (payload.type === "set" && !state.readyCars.includes(payload.carId)) {
				state.readyCars.push(payload.carId);
				return;
			}

			state.readyCars = state.readyCars.filter((id) => id !== payload.carId);
		},
		setBrokenCar: (state, { payload }: PayloadAction<{ carId: Car["id"] }>) => {
			if (!state.brokenCars) state.brokenCars = [];

			if (!state.brokenCars.includes(payload.carId)) {
				state.brokenCars.push(payload.carId);
			}
		},

		clearState: (state) => {
			state.readyCars = null;
			state.brokenCars = null;
			state.status = null;
		},
	},
	selectors: {
		getStatus: (state) => state.status,
		getReadyCars: (state) => state.readyCars,
		getBrokenCars: (state) => state.brokenCars,
	},
});

export const { selectors: engineSelectors, actions: engineActions } =
	engineSlice;
