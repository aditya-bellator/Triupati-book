import React from "react";

import "./Button.scss";

const Button = (props) => {
  const { children } = props;
  
  return (
    <div>
      <button
        onClick={props.onClick}
        className={`btn ${props.size} ${props.color}`}
        type={props.type}
        disabled={props.disabled}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
