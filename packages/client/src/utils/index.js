import { selectFilter } from "../actions/products";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import api from "../api";
import { useReducer, useState } from "react";
import { useEffect } from "react";

export const buildQuery = (filters) => {
  console.log(filters);
  const query = {};
  filters.forEach((filter => {
    const found = filter.items.find(fl => fl.name === filter.selected);
    if (found) {
      query[filter.name] = found.value;
    }
  }));
  return query;
}

export const range = (args) => {
  return [
    Math.min(...args),
    Math.max(...args)
  ];
}

export const useForceUpdate = () => {
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  forceUpdate();
}

export const useQuery = (path) => {
  const history = useHistory();
  const params = new URLSearchParams(useLocation().search);
  let query = {};

  for (let pair of params.entries()) {
    if (Array.isArray(query[pair[0]])) {
      query[pair[0]].push(pair[1]);
      continue;
    }
    query[pair[0]] = [pair[1]]
  }

  const setQuery = (queryObject) => {
    const urlSearchParams = new URLSearchParams();

    for (const key in queryObject) {
      const params = queryObject[key];
      if (Array.isArray(params)) {
        params.forEach(param => urlSearchParams.append(key, param));
        continue;
      }
      urlSearchParams.append(key, queryObject[key]);
    }

    history.push({
      path,
      search: urlSearchParams.toString()
    });

    query = {...queryObject};
  }

  return [query, setQuery];
}
