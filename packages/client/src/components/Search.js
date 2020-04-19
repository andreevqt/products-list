import React, { useEffect } from "react";
import Layout from "./Layout";
import Sidebar from "./Sidebar";
import ProductsGrid from "./ProductsGrid";
import api from "../api";
import { connect } from "react-redux";
import { } from "react-router-dom"

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: (params) => dispatch(api.products.get(params))
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.items,
    currentPage: state.products.currentPage
  }
}

const Search = ({
  products,
  fetchProducts,
  currentPage
}) => {

  useEffect(() => {
    fetchProducts({ page: currentPage });
  }, [])

  return (
    <Layout>
      <Sidebar />
      <div className="content">
        <div className="container-xl">
          <ProductsGrid />
        </div>
      </div>
    </Layout>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);