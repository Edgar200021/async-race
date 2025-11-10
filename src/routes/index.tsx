import { createFileRoute } from "@tanstack/react-router";
import { CarFormWrapper } from "@/components/Car/CarFormWrapper";
import { CarList } from "@/components/Car/CarList";
import { CarPagination } from "@/components/Car/CarPagination";
import { GenerateCars } from "@/components/Car/GenerateCars";
import { EngineActions } from "@/components/Engine/EngineActions";
import { EngineAudio } from "@/components/Engine/EngineAudio";
import { RaceWinner } from "@/components/Winner/RaceWinner";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<main className="py-5">
			<h1 className="mb-5 text-white text-3xl font-bold">Garage</h1>
			<div className="flex items-center justify-between mb-10">
				<EngineActions />
				<div className="flex flex-col gap-y-5">
					<CarFormWrapper />
					<GenerateCars />
				</div>
			</div>

			<CarList className="mb-10" />
			<CarPagination />

			<RaceWinner />
			<EngineAudio />
		</main>
	);
}
