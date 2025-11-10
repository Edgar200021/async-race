export enum CarStatus {
	Stopped = "stopped",
	Started = "started",
	Drive = "drive",
}

export type Car = {
	id: number;
	name: string;
	color: string;
};
