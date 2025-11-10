import type { DriveEngineSchema } from "@/schemas/engine/driveEngine.schema";
import type { ToggleEngineSchema } from "@/schemas/engine/toggleEngine.schema";

export type ToggleEngineStatusRequest = ToggleEngineSchema;

export type ToggleEngingeStatusResponse = {
	velocity: number;
	distance: number;
};

export type DriveEngineRequest = DriveEngineSchema;
export type DriveEngineResponse = { success: boolean };
