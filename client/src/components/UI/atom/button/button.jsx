import React from "react";
import "./button.scss";

const Button = ({ children }) => {
  return <Button className={`a-button `}>{children}</Button>;
};

export default Button;
