import { TOTAL_COUNT_HEADER } from "@/const/api";
import { GET_WINNERS_MAX_LIMIT, TAGS } from "@/const/store";
import { baseApi } from "../baseApi";
import type { RootState } from "../store";
import type {
	CreateWinnerRequest,
	CreateWinnerResponse,
	DeleteWinnerRequest,
	DeleteWinnerResponse,
	GetAllWinnersRequest,
	GetAllWinnersResponse,
	GetWinnerRequest,
	GetWinnerResponse,
	UpdateWinnerRequest,
	UpdateWinnerResponse,
} from "./types";
import { winnersActions } from "./winnersSlice";

export const winnersApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllWinners: builder.query<GetAllWinnersResponse, GetAllWinnersRequest>({
			query: (params) => ({
				url: "/winners",
				params: params,
			}),

			onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
				const data = await queryFulfilled;
				const totalCount = data.meta?.response?.headers.get(TOTAL_COUNT_HEADER);

				if (totalCount && Number.parseInt(totalCount, 10)) {
					dispatch(winnersActions.setTotalCount(+totalCount));
				}
			},

			providesTags: [TAGS.cars],
		}),

		getOneWinner: builder.query<GetWinnerResponse, GetWinnerRequest>({
			query: ({ id }) => ({
				url: `/winners/${id}`,
			}),
		}),

		createWinner: builder.mutation<CreateWinnerResponse, CreateWinnerRequest>({
			query: (body) => ({
				url: "/winners",
				method: "POST",
				body,
			}),
			invalidatesTags: [TAGS.winners],
		}),

		updateWinner: builder.mutation<UpdateWinnerResponse, UpdateWinnerRequest>({
			query: ({ id, ...body }) => ({
				url: `/winners/${id}`,
				method: "PUT",
				body,
			}),
			onQueryStarted: async (
				winner,
				{ queryFulfilled, getState, dispatch },
			) => {
				await queryFulfilled;
				const { filters } = (getState() as RootState).winners;

				dispatch(
					winnersApi.util.updateQueryData("getAllWinners", filters, (data) => {
						const index = data.findIndex((w) => w.id === winner.id);
						if (index !== -1) {
							data[index] = winner;
							return;
						}

						winnersApi.util.invalidateTags([TAGS.winners]);
					}),
				);
			},
		}),

		deleteWinner: builder.mutation<DeleteWinnerResponse, DeleteWinnerRequest>({
			query: ({ id }) => ({
				url: `/winners/${id}`,
				method: "DELETE",
			}),
			onQueryStarted: async (_, { queryFulfilled, getState, dispatch }) => {
				await queryFulfilled;
				const { filters, totalCount } = (getState() as RootState).winners;

				if (totalCount && totalCount === 1) {
					dispatch(winnersActions.setTotalCount(0));
					return;
				}

				if (
					totalCount &&
					totalCount !== 1 &&
					totalCount % GET_WINNERS_MAX_LIMIT === 1
				) {
					dispatch(
						winnersActions.setFilters({
							key: "_page",
							data: filters._page ? filters._page - 1 : 1,
						}),
					);
				}
			},
			invalidatesTags: [TAGS.winners],
		}),
	}),
});

export const {
	useLazyGetAllWinnersQuery,
	useLazyGetOneWinnerQuery,
	useCreateWinnerMutation,
	useUpdateWinnerMutation,
	useDeleteWinnerMutation,
} = winnersApi;
