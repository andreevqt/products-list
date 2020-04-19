import {
  FETCH_FILTERS_ERROR,
  FETCH_FILTERS_SUCCESS,
  FETCH_FILTERS_PENDING,
  SELECT_FILTER
} from "../constants/actionTypes";

export const fetchFiltersPending = () => {
  return {
    type: FETCH_FILTERS_PENDING,
  }
}

export const fetchFiltersSuccess = (filters) => {
  return {
    type: FETCH_FILTERS_SUCCESS,
    payload: { filters }
  }
}

export const fetchFiltersError = (error) => {
  return {
    type: FETCH_FILTERS_ERROR,
    payload: { error }
  }
}

export const selectFilter = (filter, type) => {
  return {
    type: SELECT_FILTER,
    payload: { filter }
  }
}