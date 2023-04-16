import React from "react";
import carImage from "../../../../assets/images/car.svg";
import "./logo.scss";

const Logo = ({ isSecondary }) => {
  return (
    <div className="a-logo">
      <div
        className={`a-logo__image ${
          isSecondary ? "a-logo__image--secondary" : ""
        }`}
      >
        <img src={carImage} alt="car" />
      </div>
      <div
        className={`a-logo__text ${
          isSecondary ? "a-logo__text--secondary" : ""
        }`}
      >
        Car Lagbe
      </div>
    </div>
  );
};

export default Logo;
