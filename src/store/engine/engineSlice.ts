import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Nullable } from "@/types/base";
import type { Car } from "@/types/car";
import type { EngineStatus } from "@/types/engine";

type State = {
	status: Nullable<EngineStatus>;
	readyCars: Car["id"][] | null;
	brokenCars: Car["id"][] | null;
	busyCars: Car["id"][] | null;
};

const initialState: State = {
	status: null,
	readyCars: null,
	brokenCars: null,
	busyCars: null,
};

type SetCar = ({ type: "remove" } | { type: "set" }) & { carId: Car["id"] };

export const engineSlice = createSlice({
	name: "engine",
	initialState,
	reducers: {
		setStatus: (state, { payload }: PayloadAction<Nullable<EngineStatus>>) => {
			if (payload === "finished" && !state.status) return;
			state.status = payload;
		},
		setReadyCar: (state, { payload }: PayloadAction<SetCar>) => {
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

		setBusyCar: (state, { payload }: PayloadAction<SetCar>) => {
			if (!state.busyCars) state.busyCars = [];

			if (payload.type === "set" && !state.busyCars.includes(payload.carId)) {
				state.busyCars.push(payload.carId);
				return;
			}

			state.busyCars = state.busyCars.filter((id) => id !== payload.carId);
		},

		clearState: (state) => {
			state.readyCars = null;
			state.brokenCars = null;
			state.busyCars = null;
			state.status = null;
		},
	},
	selectors: {
		getStatus: (state) => state.status,
		getReadyCars: (state) => state.readyCars,
		getBrokenCars: (state) => state.brokenCars,
		getBusyCars: (state) => state.busyCars,
	},
});

export const { selectors: engineSelectors, actions: engineActions } =
	engineSlice;
