import { GET_CARS_DEFAULT_LIMIT } from "@/const/store";
import { carsActions, carsSelectors } from "@/store/cars/carsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
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
		<Pagination
			className={className}
			totalPages={Math.ceil(total / (_limit ?? GET_CARS_DEFAULT_LIMIT))}
			currentPage={_page || 1}
			onPageChange={(page) =>
				dispatch(carsActions.setFilters({ key: "_page", data: page }))
			}
		></Pagination>
	);
};
