import { FileMinus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
	className?: string;
}

export const EmptyCarList = ({ className }: Props) => {
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center py-20 text-center text-white gap-4",
				className,
			)}
		>
			<div className="flex items-center justify-center w-24 h-24 rounded-full bg-white/20 mb-4">
				<FileMinus className="w-12 h-12 text-white/80 animate-pulse" />
			</div>
			<h3 className="text-2xl font-bold">No cars found</h3>
			<p className="text-sm text-white/80 max-w-xs ">
				There are no cars to display. Try adjusting your filters or adding a new
				car.
			</p>
		</div>
	);
};
