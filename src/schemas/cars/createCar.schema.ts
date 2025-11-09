import z from "zod";
import { MAX_CAR_NAME_LENGTH } from "@/const/schema";

export const createCarSchema = z.object({
	name: z.string().max(MAX_CAR_NAME_LENGTH),
	color: z
		.string()
		.regex(/^#[0-9a-fA-F]{6}$/, {
			message:
				"Invalid color format. Must be a 7-character hex code (e.g., #RRGGBB).",
		}),
});

export type CreateCarSchema = z.infer<typeof createCarSchema>;
