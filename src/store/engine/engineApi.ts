import { baseApi } from '../baseApi'
import type {
  DriveEngineRequest,
  DriveEngineResponse,
  ToggleEngineStatusRequest,
  ToggleEngingeStatusResponse,
} from './types'

export const engineApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    toggleEngineStatus: builder.mutation<
      ToggleEngingeStatusResponse,
      ToggleEngineStatusRequest
    >({
      query: (params) => ({
        url: '/engine',
        method: 'PATCH',
        params,
      }),
    }),

    driveEngine: builder.mutation<DriveEngineResponse, DriveEngineRequest>({
      query: (params) => ({
        url: '/engine',
        method: 'PATCH',
        params,
      }),
    }),
  }),
})

export const { useToggleEngineStatusMutation, useDriveEngineMutation } =
  engineApi
