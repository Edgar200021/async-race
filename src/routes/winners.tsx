import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/winners")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/winners"!</div>;
}
