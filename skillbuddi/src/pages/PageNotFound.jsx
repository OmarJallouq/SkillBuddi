import "../styles/pageNotFound.css";
import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="background">
      <div className="fourOFour">404</div>
      <div className="error-text">PAGE NOT FOUND</div>
      <Link className="return-link" to="/">
        Return Home
      </Link>
    </div>
  );
};

export default PageNotFound;
