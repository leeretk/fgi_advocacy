import React from "react";
import "./style.css";

function LinkBtn(props) {
  return (
    <span className="link-btn" {...props} role="button" tabIndex="0">
      View
    </span>
  );
}

export default LinkBtn;



