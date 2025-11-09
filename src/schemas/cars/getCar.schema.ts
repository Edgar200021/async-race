import z from "zod";

export const getCarSchema = z.object({
	id: z.number().positive(),
});

export type GetCarSchema = z.infer<typeof getCarSchema>;
