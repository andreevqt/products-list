import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Radio from "./filters/Radio";
import RadioGroup from "./filters/RadioGroup";
import CheckboxGroup from "./filters/CheckboxGroup";
import Range from "./filters/Range";
import { selectFilter } from "../actions/products";
import { useQuery, range, useForceUpdate } from "../utils";
import Checkbox from "./filters/Checkbox";
import CheckboxFilter from "./filters/CheckboxFilter";
import api from "../api";

const mapStateToProps = (state) => {
  return {
    currentPage: state.products.currentPage,
    filters: state.products.filters,
    loading: state.products.loading
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectFilter: (name, selected, type) => {
      dispatch(selectFilter(name, selected, type));
    },
    fetchProducts: (params) => dispatch(api.products.get(params))
  };
}

const Sidebar = ({
  filters,
  loading,
  selectFilter,
  fetchProducts,
  currentPage
}) => {

  const [query, setQuery] = useQuery("/search");

  const updateQuery = (name, value) => {
    if (typeof query[name] === "undefined") {
      setQuery({ ...query, [name]: [value] });
      return;
    }

    let index;
    if ((index = query[name].indexOf(value)) !== -1) {
      const filtered = query[name]
        .filter((item, idx) => {
          return idx !== index;
        });

      setQuery({
        ...query,
        [name]: filtered
      });
      return;
    }

    setQuery({ ...query, [name]: [...query[name], value] });
  }

  useEffect(() => {

  }, [])

  useEffect(() => {
    console.log("changing");
    console.log(query);
    // fetchProducts({ page: currentPage, category: 1 });
  }, [query])

  const onChange = (e, name, value) => {
    updateQuery(name, value);
    selectFilter(name, value, "checkbox_group");
    // fetchProducts({ page: currentPage })
  }

  const printFilters = () => {
    return filters.map((filter, idx) => {
      if (filter.type === "checkbox_group") {
        const values = filter.items.map(item => item.selected ? item.value : false);
        return (
          <CheckboxFilter
            key={idx}
            label={filter.label}
            name={filter.name}
            value={values}
            onChange={onChange}
            items={filter.items}
          />
        )
      }

      if (filter.type === "range") {
        const values = filter.items.map(item => item.value);
        const [min, max] = range(values);
        const step = 10;
        const onChange = (e) => {
          const value = e.target.value.toString();
          setQuery({
            ...query,
            [`${filter.name}From`]: value,
            [`${filter.name}to`]: max
          });
          selectFilter(filter.name, value);
        };

        return (
          <Range
            key={idx}
            min={min}
            max={max}
            label={filter.label}
            onChange={onChange}
            step={step}
          />
        )
      }

      return null;
    })
  }

  return (
    <div className="sidebar">
      {
        loading
          ? "loading..."
          : printFilters(filters, selectFilter)
      }
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);