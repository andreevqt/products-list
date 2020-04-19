import {
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  SELECT_FILTER
} from "../constants/actionTypes";

export const fetchProductsPending = () => {
  return {
    type: FETCH_PRODUCTS_PENDING,
  }
}

export const fetchProductsSuccess = (products) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: { products }
  }
}

export const fetchProductsError = (error) => {
  return {
    type: FETCH_PRODUCTS_ERROR,
    payload: { error }
  }
}

export const selectFilter = (name, selected, type) => {
  return {
    type: SELECT_FILTER,
    payload: { name, selected, type }
  }
}
