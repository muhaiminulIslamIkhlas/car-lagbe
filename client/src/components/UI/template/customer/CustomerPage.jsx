import React from "react";
import Footer from "../../../Footer/Footer";
import Header from "../../../Header/Header";

const CustomerPage = ({ children, headerContent }) => {
  return (
    <div>
      <Header content={headerContent} />
      {children}
      <Footer />
    </div>
  );
};

export default CustomerPage;
