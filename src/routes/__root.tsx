import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "@/components/Header";

export const Route = createRootRoute({
	component: () => (
		<div className="max-w-[1740px] w-full mx-auto px-5 py-4">
			<Header />
			<Outlet />
		</div>
	),
});
