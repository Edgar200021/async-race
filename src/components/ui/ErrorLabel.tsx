import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
	className?: string;
	message?: string;
}

export const ErrorLabel = ({
	className,
	message = "Something went wrong",
}: Props) => {
	return (
		<div
			className={cn(
				"flex max-w-[800px] mx-auto w-full items-center gap-x-3",
				className,
			)}
		>
			<TriangleAlert className="text-red-500" size={200} />
			<p className="text-3xl font-bold text-white">{message}</p>
		</div>
	);
};
