import React from "react";
import { Link } from "react-router-dom";

export const Filters = () => {
  return (
    <div>
      <div>
        <h1>price</h1>
      </div>
      <div>
        <h1>color</h1>
      </div>
      <div>
        <Link to="/catergories">brand</Link>
      </div>
    </div>
  );
};
