import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const useHandleError = (error?: unknown) => {
	useEffect(() => {
		if (!error) return;

		if ((error as FetchBaseQueryError).status === 404) {
			toast.error("Not found");
			return;
		}
		if ((error as SerializedError).message !== undefined) {
			toast.error((error as SerializedError).message!);
		}
	}, [error]);
};
