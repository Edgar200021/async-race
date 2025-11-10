import z from "zod";
import { CarStatus } from "../../types/car";

export const toggleEngineSchema = z.object({
	status: z.enum([CarStatus.Started, CarStatus.Stopped]),
	id: z.number().positive(),
});

export type ToggleEngineSchema = z.infer<typeof toggleEngineSchema>;
