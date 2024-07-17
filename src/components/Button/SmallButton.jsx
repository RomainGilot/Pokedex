import React from "react";
import "./Button.css";

const SmallButton = ({ name, ...props }) => {
  return (
    <button className="custom-small-button" {...props}>
      {name}
    </button>
  );
};

export default SmallButton;
