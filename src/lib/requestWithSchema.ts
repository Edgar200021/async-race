import toast from "react-hot-toast";
import z, { type ZodType } from "zod";

export const requestWithSchema = async <T, R = void>(
	schema: ZodType<T>,
	payload: Partial<T>,
	fn: (arg: T) => Promise<R>,
) => {
	const { data, error, success } = await schema.safeParseAsync(payload);
	console.log(payload);
	if (!success) {
		toast.error(z.prettifyError(error));
		return;
	}

	await fn(data);
};
