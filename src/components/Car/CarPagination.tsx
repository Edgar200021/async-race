import { GET_CARS_MAX_LIMIT } from "@/const/store";
import { cn } from "@/lib/utils";
import { carsActions, carsSelectors } from "@/store/cars/carsSlice";
import { engineActions } from "@/store/engine/engineSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { winnersActions } from "@/store/winners/winnersSlice";
import { Pagination } from "../ui/Pagination";

interface Props {
	className?: string;
}

export const CarPagination = ({ className }: Props) => {
	const total = useAppSelector(carsSelectors.getTotalCount);
	const { _page, _limit } = useAppSelector(carsSelectors.getFilters);
	const dispatch = useAppDispatch();

	if (!total) return null;

	return (
		<div className={cn("flex items-center gap-x-2", className)}>
			<h2 className="text:3xl font-bold bg-linear-to-r from-indigo-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
				Total {total}
			</h2>
			<Pagination
				className="max-w-fit mx-auto"
				totalPages={Math.ceil(total / (_limit ?? GET_CARS_MAX_LIMIT))}
				currentPage={_page || 1}
				onPageChange={(page) => {
					dispatch(carsActions.setFilters({ key: "_page", data: page }));
					dispatch(carsActions.setCar(null));
					dispatch(engineActions.clearState());
					dispatch(winnersActions.resetState());
				}}
			/>
		</div>
	);
};
