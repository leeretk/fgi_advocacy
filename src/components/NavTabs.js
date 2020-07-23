import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function NavTabs(props) {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link
          to="/"
          className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}
        >
          Saved Books
      </Link>
      </li>
      <li className="nav-item">
      </li>
      <li className="nav-item">
      <Link
          to="/addbooks"
          className={window.location.pathname === "addbooks" ? "nav-link active" : "nav-link"}
        >
          Add Books
        </Link>
      </li>
    </ul>
  );
}

export default NavTabs;
