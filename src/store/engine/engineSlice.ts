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

type SetCar = ({ action: "remove" } | { action: "set" }) & {
	type: "ready" | "busy" | "broken";
	carId: Car["id"];
};

export const engineSlice = createSlice({
	name: "engine",
	initialState,
	reducers: {
		setStatus: (state, { payload }: PayloadAction<Nullable<EngineStatus>>) => {
			if (payload === "finished" && !state.status) return;
			state.status = payload;
		},
		setCar: (
			state,
			{ payload: { type, carId, action } }: PayloadAction<SetCar>,
		) => {
			const key: keyof Omit<State, "status"> =
				type === "ready"
					? "readyCars"
					: type === "broken"
						? "brokenCars"
						: "busyCars";

			if (!state[key]) state[key] = [];

			if (action === "set" && !state[key].includes(carId)) {
				state[key].push(carId);
				return;
			}

			state[key] = state[key].filter((id) => id !== carId);

			if (!state[key].length) {
				state[key] = null;
			}
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
