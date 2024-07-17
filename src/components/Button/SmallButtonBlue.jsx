import React from "react";
import "./Button.css";

const SmallButtonBlue = ({ name, ...props }) => {
  return (
    <button className="custom-small-blue-button" {...props}>
      {name}
    </button>
  );
};

export default SmallButtonBlue;
