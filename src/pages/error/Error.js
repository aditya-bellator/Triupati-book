import React from "react";
import logo from "./logo.svg";
export default function Error() {
  var classes = {}

  return (
      <div className={classes.logotype}>
        <img className={classes.logotypeIcon} src={logo} alt="logo" />
          Page not found.
      </div>
  );
}
