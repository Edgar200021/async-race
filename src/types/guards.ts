import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export const isRtkErrorWithOriginalStatus = (
  error: unknown,
): error is Extract<FetchBaseQueryError, { originalStatus: number }> => {
  const err = error as FetchBaseQueryError
  return err && 'originalStatus' in err && err.status !== undefined
}

export const isRtkErrorWithStatus = (
  error: unknown,
): error is Extract<FetchBaseQueryError, { status: number }> => {
  const err = error as FetchBaseQueryError
  return (
    err &&
    'status' in err &&
    err.status !== undefined &&
    !Number.isNaN(err.status)
  )
}
