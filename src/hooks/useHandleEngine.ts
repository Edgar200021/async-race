import { useState } from "react";
import { requestWithSchema } from "@/lib/requestWithSchema";
import { toggleEngineSchema } from "@/schemas/engine/toggleEngine.schema";
import {
	useDriveEngineMutation,
	useToggleEngineStatusMutation,
} from "@/store/engine/engineApi";
import { type Car, CarStatus } from "@/types/car";
import { isRtkErrorWithOriginalStatus } from "@/types/guards";

export const useHandleEnginee = (carId: Car["id"]) => {
	const [status, setStatus] = useState<CarStatus>(CarStatus.Stopped);
	const [isBroken, setIsBroken] = useState(false);

	const [toggleCarEngine, { error, data, isLoading }] =
		useToggleEngineStatusMutation();
	const [
		driveEngine,
		{ error: driveEngineError, isLoading: driveEngineLoading },
	] = useDriveEngineMutation();

	const onClick = async (status: Exclude<CarStatus, CarStatus.Drive>) => {
		setIsBroken(false);
		if (status === CarStatus.Stopped) {
			setStatus(CarStatus.Stopped);
		}

		try {
			await requestWithSchema(
				toggleEngineSchema,
				{ id: carId, status },
				async (data) => {
					await toggleCarEngine(data).unwrap();
					setStatus(status);

					if (status !== CarStatus.Started) return;

					const res = await driveEngine({
						id: carId,
						status: CarStatus.Drive,
					});

					if (
						res.error &&
						isRtkErrorWithOriginalStatus(res.error) &&
						res.error.originalStatus === 500
					) {
						setStatus(CarStatus.Drive);
						setIsBroken(true);
						return;
					}

					if (res.error) return setStatus(CarStatus.Stopped);

					setStatus(CarStatus.Drive);
				},
			);
		} catch (_) {
			setStatus(CarStatus.Stopped);
		}
	};

	return {
		error: error || driveEngineError,
		status,
		onClick,
		data,
		isLoading: isLoading || driveEngineLoading,
		isBroken,
	};
};
