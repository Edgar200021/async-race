import { Link } from "@tanstack/react-router";
import { engineActions } from "@/store/engine/engineSlice";
import { useAppDispatch } from "@/store/hooks";
import { winnersActions } from "@/store/winners/winnersSlice";

export const Header = () => {
	const dispatch = useAppDispatch();

	return (
		<header className="bg-slate-900 text-white border-b border-slate-800 shadow-sm">
			<div className=" flex items-center justify-between p-4">
				<h1 className="text-xl font-bold tracking-wide ">🚗 Async Race</h1>

				<nav className="flex gap-3">
					<Link
						to="/"
						preload="intent"
						activeProps={{
							className:
								"text-white bg-slate-700 px-4 py-2 rounded-lg transition shadow-sm",
						}}
						inactiveProps={{
							className:
								"text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white px-4 py-2 rounded-lg transition border border-slate-700",
						}}
					>
						Garage
					</Link>

					<Link
						onClick={() => {
							dispatch(engineActions.clearState());
							dispatch(winnersActions.resetState());
						}}
						to="/winners"
						preload="intent"
						activeProps={{
							className:
								"text-white bg-slate-700 px-4 py-2 rounded-lg transition shadow-sm",
						}}
						inactiveProps={{
							className:
								"text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white px-4 py-2 rounded-lg transition border border-slate-700",
						}}
					>
						Winners
					</Link>
				</nav>
			</div>
		</header>
	);
};
