import axios from "axios";
import { NAMESPACE } from "../constants/common";
import {
  fetchProductsError,
  fetchProductsPending,
  fetchProductsSuccess
} from "../actions/products";

const products = {
  get: (params) => {
    return (dispatch, getState) => {
      dispatch(fetchProductsPending());
      return axios(`http://localhost/api/products`, { params })
        .then(res => {
          const products = res.data;
          dispatch(fetchProductsSuccess(products));
        })
        .catch(error => {
          console.log(error);
          dispatch(fetchProductsError(error));
        })
    }
  },
}

export default {
  products
}
