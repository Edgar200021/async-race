import { Trophy } from "lucide-react";
import { useEffect } from "react";
import victoryAudio from "@/assets/audio/victory.mp3";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/Dialog";
import { cn } from "@/lib/utils";
import { engineSelectors } from "@/store/engine/engineSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { winnersActions, winnersSelectors } from "@/store/winners/winnersSlice";

interface Props {
	className?: string;
}

export const RaceWinner = ({ className }: Props) => {
	const winner = useAppSelector(winnersSelectors.getWinner);
	const isCancelledDuringRace = useAppSelector(
		winnersSelectors.getIsCancelledDuringRace,
	);
	const engineStatus = useAppSelector(engineSelectors.getStatus);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (engineStatus !== null) return;
		dispatch(winnersActions.resetState());
	}, [engineStatus]);

	const showDialog = !!engineStatus && !!winner && !isCancelledDuringRace;

	if (!showDialog) return null;

	return (
		<Dialog defaultOpen>
			<audio src={victoryAudio} autoPlay></audio>
			<DialogContent
				className={cn(
					"max-w-md bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 text-center rounded-2xl shadow-2xl backdrop-blur-md",
					className,
				)}
			>
				<DialogHeader>
					<div className="flex justify-center items-center gap-2 mb-2">
						<Trophy className="w-8 h-8 text-blue-400 animate-bounce" />
						<DialogTitle className="text-2xl font-bold text-blue-400 drop-shadow">
							Race Winner!
						</DialogTitle>
					</div>
					<DialogDescription className="text-gray-400 text-base">
						The race is finished — here are the results:
					</DialogDescription>
				</DialogHeader>

				<div className="mt-5 p-4 bg-slate-800/70 rounded-xl border border-slate-700 shadow-inner">
					<p className="text-xl font-semibold text-slate-100">{winner.name}</p>
					<p className="text-blue-300 mt-1 text-sm font-medium">
						⏱️ Time: {winner.time}s
					</p>
				</div>

				<div className="mt-5 text-sm text-slate-500">
					Congratulations to the champion! 🚀
				</div>
			</DialogContent>
		</Dialog>
	);
};
