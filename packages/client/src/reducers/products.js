import {
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_PENDING,
  SELECT_FILTER
} from "../constants/actionTypes";

const defaultState = {
  items: [],
  filters: [],
  currentPage: 1,
  totalPages: 1,
  error: null,
  loading: false,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_PRODUCTS_SUCCESS:
      const { filters, currentPage, items, totalPages } = action.payload.products;
      return {
        ...state,
        ...(filters && { filters }),
        items: currentPage > 1 ? [...state.items, ...items] : items,
        currentPage,
        totalPages,
        loading: false
      }
    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.payload.error,
        loading: false
      }
    case SELECT_FILTER:
      const select = (filter) => {
        const { name, type, selected } = action.payload;
        // console.log(name);
        // console.log(selected);
        if (type === "checkbox_group") {
          return {
            ...filter,
            items: filter.items.map(item => ({
              ...item,
              selected: item.name === selected
                ? !item.selected
                : item.selected
            }))
          }
        }
        return filter;
      }
      return {
        ...state,
        filters: state.filters.map(filter => (
          filter.name === action.payload.name
            ? select(filter)
            : filter
        ))
      }
    default:
      return state;
  }
}