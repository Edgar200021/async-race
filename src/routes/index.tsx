import { createFileRoute } from "@tanstack/react-router";
import { CarFormWrapper } from "@/components/Car/CarFormWrapper";
import { CarList } from "@/components/Car/CarList";
import { CarPagination } from "@/components/Car/CarPagination";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<main className="py-20">
			<h1 className="mb-10 text-white text-3xl md:text-7xl font-bold">
				Garage
			</h1>
			<CarFormWrapper className="mb-10" />
			<CarList className="mb-10" />
			<CarPagination className="mx-auto max-w-fit" />
		</main>
	);
}
