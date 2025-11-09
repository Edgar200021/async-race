import type { CreateCarSchema } from "@/schemas/cars/createCar.schema";
import type { DeleteCarSchema } from "@/schemas/cars/deletCar.schema";
import type { GetCarSchema } from "@/schemas/cars/getCar.schema";
import type { GetCarsSchema } from "@/schemas/cars/getCars.schema";
import type { UpdateCarSchema } from "@/schemas/cars/updateCar.schema";
import type { Car } from "@/types/car";

export type GetAllCarsRequest = GetCarsSchema;
export type GetAllCarsResponse = Car[];

export type GetCarRequest = GetCarSchema;
export type GetCarResponse = Car;

export type CreateCarRequest = CreateCarSchema;
export type CreateCarResponse = Car;

export type DeleteCarRequest = DeleteCarSchema;
export type DeleteCarResponse = null;

export type UpdateCarRequest = UpdateCarSchema;
export type UpdateCarResponse = Car;
