import "../styles/login.css";
import React, { useEffect, useRef } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { user, loginUser } = useAuth();

  const loginForm = useRef(null);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = loginForm.current.email.value;
    const password = loginForm.current.password.value;

    const userInfo = { email, password };
    const response = await loginUser(userInfo);
    if (response.success) {
      toast.success("Login Successful!");
    } else {
      toast.error(response.error);
    }
  };

  return (
    <div className="wholething">
      <div className="login">
        <form className="form" onSubmit={handleSubmit} ref={loginForm}>
          <h1 className="heading">Log In</h1>
          <input
            type="text"
            name="email"
            placeholder="Email"
            required
            className="input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="input"
          />
          <button className="button" type="submit">
            Continue
          </button>
          <div className="registerer" type="register">
            <Link className="registerer" to="/register">
              No Account? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
