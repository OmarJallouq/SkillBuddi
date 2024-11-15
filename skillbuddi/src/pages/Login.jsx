import "../styles/login.css"
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { user, loginUser } = useAuth();

  const loginForm = useRef(null);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = loginForm.current.email.value;
    const password = loginForm.current.password.value;

    const userInfo = { email, password };
    loginUser(userInfo);
  };

  return (

    <div className="wholething">
    <div className="login">
      <form className="form"
        onSubmit={handleSubmit}
        ref={loginForm}
      >
        <h1 className="heading">Log In</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className = "input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className = "input"
        />
        <button className = "button" type="submit" >Continue</button>
      </form>
    </div>
    </div>
  );
};

export default Login;
