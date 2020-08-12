import React from "react";
import { NavLink } from "react-router-dom";

function PageNotFound() {
  return (
    <div>
      <h2>Page not found!</h2>
      <p>
        <NavLink to="/">Back to Home</NavLink>
      </p>
    </div>
  );
}

export default PageNotFound;
