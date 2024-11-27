import "../styles/pageNotFound.css";
import React, { useEffect, useRef } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="background">
        <div className="fourOFour">
            404
        </div>
        <div className="text">
            PAGE NOT FOUND
        </div>
        <Link className="return-link" to="/">
            Return Home
        </Link>
    </div>
  );
};

export default PageNotFound;