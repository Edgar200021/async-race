import { motorRacingHelmet } from "@lucide/lab";
import { Car as CarIcon, Icon } from "lucide-react";
import finishIcon from "@/assets/finish.svg";
import { cn } from "@/lib/utils";
import type { Car as TCar } from "@/types/car";
import { RaceTrack } from "../ui/RaceTrack";
import { CarActions } from "./CarActions";

interface Props {
	className?: string;
	car: TCar;
}

export const Car = ({ className, car }: Props) => {
	return (
		<div className={cn("flex items-center gap-x-3 p-0", className)}>
			<CarActions car={car} className="mr-8" />
			<div className="flex flex-col p-0 -translate-y-1 ">
				<span className="text-sm font-semibold text-white -mb-6 leading-0">
					{car.name}
				</span>
				<Icon
					className="p-0 translate-y-15 translate-x-8 "
					style={{
						color: car.color,
					}}
					iconNode={motorRacingHelmet}
				/>
				<CarIcon
					size={100}
					style={{
						color: car.color,
					}}
				/>
			</div>
			<RaceTrack />
			<img
				className="-translate-y-2"
				src={finishIcon}
				alt="finish"
				width={50}
				height={50}
			/>
		</div>
	);
};
