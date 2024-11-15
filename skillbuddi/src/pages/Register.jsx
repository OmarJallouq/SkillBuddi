import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const registerForm = useRef(null);
  const { user, registerUser } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const firstName = registerForm.current.firstName.value;
    const lastName = registerForm.current.lastName.value;
    const username = registerForm.current.username.value;
    const email = registerForm.current.email.value;
    const password = registerForm.current.password.value;
    const passwordConfirm = registerForm.current.password2.value;

    let isValid = true;

    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username can only contain letters and numbers.",
      }));
      isValid = false;
    }

    if (!email.includes("@")) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email must contain @.",
      }));
      isValid = false;
    }

    if (password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters long.",
      }));
      isValid = false;
    }

    if (password !== passwordConfirm) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordConfirm: "Password confirmation must match password.",
      }));
      isValid = false;
    }

    if (!isValid) {
      //not valid
      alert("Please Check the Form");
      return;
    }

    const userInfo = {
      firstName,
      lastName,
      username,
      email,
      password,
      passwordConfirm,
    };

    const response = await registerUser(userInfo);
    console.log(response);
    if (response.success) {
      toast.success("Registration Successful!");
    } else {
      toast.error(response.error);
    }
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      <form ref={registerForm} onSubmit={handleSubmit}>
        <div className="form-field">
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            name="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your First Name"
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>
        <div className="form-field">
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            name="lastName"
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your Last Name"
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>
        <div className="form-field">
          <label>Username</label>
          <input
            type="text"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>

        <div className="form-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="form-field">
          <label>Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="Confirm your password"
          />
          {errors.passwordConfirm && (
            <p className="error">{errors.passwordConfirm}</p>
          )}
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
