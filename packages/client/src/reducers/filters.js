import {
  FETCH_FILTERS_ERROR,
  FETCH_FILTERS_PENDING,
  FETCH_FILTERS_SUCCESS,
  SELECT_FILTER
} from "../constants/actionTypes";

const defaultState = {
  filters: [],
  error: null,
  loading: false,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_FILTERS_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_FILTERS_SUCCESS:
      return {
        ...state,
        filters: action.payload.filters,
        loading: false
      };
    case FETCH_FILTERS_ERROR:
      return {
        ...state,
        error: action.payload.error,
        loading: false
      }
    case SELECT_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          selected: action.payload.filter
        }
      }
    default:
      return state;
  }
}