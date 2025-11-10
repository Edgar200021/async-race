import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Nullable } from "@/types/base";
import { CarStatus } from "@/types/car";
import type { EngineStatus } from "@/types/engine";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getFinalStatus = (
	status: CarStatus,
	globalStatus: Nullable<EngineStatus>,
): CarStatus => {
	if (status === CarStatus.Stopped || !globalStatus) return status;

	switch (globalStatus) {
		case "inProgress":
		case "finished":
			return CarStatus.Drive;
		case "started":
			return CarStatus.Started;
		default:
			return CarStatus.Stopped;
	}
};
