import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, title, ...rest }) => {
  return (
    <>
      <Header title={title} />
      {children}
      <Footer />
    </>
  );

};

export default Layout;