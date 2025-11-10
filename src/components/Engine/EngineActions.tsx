import { Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { engineActions, engineSelectors } from "@/store/engine/engineSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { Nullable } from "@/types/base";
import type { EngineStatus } from "@/types/engine";
import { Button } from "../ui/Button";
import { EngineController } from "./EngineController";

interface Props {
	className?: string;
}

export const EngineActions = ({ className }: Props) => {
	const dispatch = useAppDispatch();
	const status = useAppSelector(engineSelectors.getStatus);
	const readyCarsLength = useAppSelector(engineSelectors.getReadyCars)?.length;

	const onClick = (status: Nullable<EngineStatus>) => {
		dispatch(engineActions.setStatus(status));
	};

	return (
		<>
			<div
				className={cn(
					"flex items-center justify-center gap-x-6 mt-4",
					className,
				)}
			>
				<Button
					disabled={
						(readyCarsLength && readyCarsLength > 0) ||
						status === "inProgress" ||
						status === "started" ||
						status === "finished"
					}
					onClick={() => onClick("started")}
					className={cn(
						"relative flex items-center gap-2 px-6 py-3 font-semibold transition-all duration-300",
						"rounded-xl border border-blue-500 text-blue-100 bg-slate-800/60",
						"hover:bg-blue-600/20 hover:text-blue-300 hover:shadow-[0_0_10px_#3b82f6]",
						"disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer",
					)}
				>
					<Play className="w-4 h-4" />
					Start Race
				</Button>

				<Button
					disabled={
						status === "stopped" || status === "started" || status === null
					}
					onClick={() => onClick("stopped")}
					className={cn(
						"relative flex items-center gap-2 px-6 py-3 font-semibold transition-all duration-300",
						"rounded-xl border border-indigo-500 text-indigo-100 bg-slate-800/60",
						"hover:bg-indigo-600/20 hover:text-indigo-300 hover:shadow-[0_0_10px_#6366f1]",
						"disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer",
					)}
				>
					<RotateCcw className="w-4 h-4" />
					Reset
				</Button>
			</div>

			<EngineController />
		</>
	);
};
