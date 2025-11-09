import { createRouter, RouterProvider } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import { routeTree } from "./routeTree.gen";

import "./styles.css";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals.ts";
import { store } from "./store/store";

const router = createRouter({
	routeTree,
	context: {},
	defaultPreload: "intent",
	scrollRestoration: true,
	defaultStructuralSharing: true,
	defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<Provider store={store}>
			<Toaster position="top-right" />
			<RouterProvider router={router} />
		</Provider>,
	);
}

reportWebVitals();
