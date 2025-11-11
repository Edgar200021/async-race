import { TOTAL_COUNT_HEADER } from "@/const/api";
import { GET_CARS_MAX_LIMIT, TAGS } from "@/const/store";
import { baseApi } from "../baseApi";
import type { RootState } from "../store";
import { carsActions } from "./carsSlice";
import type {
	CreateCarRequest,
	CreateCarResponse,
	DeleteCarRequest,
	DeleteCarResponse,
	GetAllCarsRequest,
	GetAllCarsResponse,
	GetCarRequest,
	GetCarResponse,
	UpdateCarRequest,
	UpdateCarResponse,
} from "./types";

export const carsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllCars: builder.query<GetAllCarsResponse, GetAllCarsRequest>({
			query: (params) => ({
				url: "/garage",
				params: params,
			}),
			onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
				const data = await queryFulfilled;
				const totalCount = data.meta?.response?.headers.get(TOTAL_COUNT_HEADER);

				dispatch(
					carsActions.setCurrentPageCarsCount({
						type: "bulk",
						number: data.data.length,
					}),
				);
				if (totalCount && Number.parseInt(totalCount, 10)) {
					dispatch(carsActions.setTotalCount(+totalCount));
				}
			},
			providesTags: [TAGS.cars],
		}),

		getOneCar: builder.query<GetCarResponse, GetCarRequest>({
			query: ({ id }) => ({
				url: `/garage/${id}`,
			}),
		}),

		createCar: builder.mutation<CreateCarResponse, CreateCarRequest>({
			query: (body) => ({
				url: "/garage",
				method: "POST",
				body,
			}),
			onQueryStarted: async (_, { dispatch, queryFulfilled, getState }) => {
				const { data: responseData } = await queryFulfilled;
				const { filters, totalCount } = (getState() as RootState).cars;

				dispatch(
					carsApi.util.updateQueryData("getAllCars", filters, (data) => {
						if (data.length === GET_CARS_MAX_LIMIT) {
							const nextPage = Math.ceil(
								((totalCount ?? 1) + 1) / GET_CARS_MAX_LIMIT,
							);

							dispatch(
								carsActions.setFilters({
									key: "_page",
									data: nextPage,
								}),
							);
						}

						data.push(responseData);
						dispatch(
							carsActions.setTotalCount(!totalCount ? 1 : totalCount + 1),
						);

						dispatch(
							carsActions.setCurrentPageCarsCount({ type: "increment" }),
						);
					}),
				);
			},
		}),

		updateCar: builder.mutation<UpdateCarResponse, UpdateCarRequest>({
			query: ({ id, ...body }) => ({
				url: `/garage/${id}`,
				method: "PUT",
				body,
			}),
			onQueryStarted: async (car, { queryFulfilled, getState, dispatch }) => {
				await queryFulfilled;
				const { filters } = (getState() as RootState).cars;

				dispatch(
					carsApi.util.updateQueryData("getAllCars", filters, (data) => {
						const index = data.findIndex((c) => c.id === car.id);
						if (index !== -1) data[index] = car;
					}),
				);
			},
		}),

		deleteCar: builder.mutation<DeleteCarResponse, DeleteCarRequest>({
			query: ({ id }) => ({
				url: `/garage/${id}`,
				method: "DELETE",
			}),
			onQueryStarted: async (_, { queryFulfilled, getState, dispatch }) => {
				await queryFulfilled;
				const { filters, totalCount } = (getState() as RootState).cars;

				if (totalCount && totalCount === 1) {
					dispatch(carsActions.setTotalCount(0));
					dispatch(
						carsActions.setCurrentPageCarsCount({ type: "bulk", number: 0 }),
					);
					return;
				}

				if (
					totalCount &&
					totalCount !== 1 &&
					totalCount % GET_CARS_MAX_LIMIT === 1
				) {
					dispatch(
						carsActions.setFilters({
							key: "_page",
							data: filters._page ? filters._page - 1 : 1,
						}),
					);
				}
			},
			invalidatesTags: [TAGS.cars],
		}),
	}),
});

export const {
	useLazyGetAllCarsQuery,
	useLazyGetOneCarQuery,
	useCreateCarMutation,
	useUpdateCarMutation,
	useDeleteCarMutation,
} = carsApi;
