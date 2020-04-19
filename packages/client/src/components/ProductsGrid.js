import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    products: state.products.items,
    loading: state.products.loading
  }
}

const ProductsGrid = ({
  products,
  loading
}) => {
  return (
    <div className="products-grid">
      {
        loading
          ? "loading..."
          : products.map((product, idx) => {
            return (
              <p key={idx}>{product.name + " | " + product.ram + "gb RAM"}</p>
            )
          })
      }
    </div>
  );
}

export default connect(mapStateToProps)(ProductsGrid);