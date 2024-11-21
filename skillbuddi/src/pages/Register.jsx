import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

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

    if (firstName.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: "Please enter a first name.",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: "",
      }));
      isValid = true;
    }

    if (lastName.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: "Please enter a last name.",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: "",
      }));
      isValid = true;
    }

    if (username.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Please enter a username.",
      }));
      isValid = false;
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username can only contain letters and numbers.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "",
      }));
      isValid = true;
    }

    if (!email.includes("@")) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email must contain @.",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
      isValid = true;
    }

    if (password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Minimum 6 characters required.",
      }));
      isValid = false;
    } else if (
      !/[a-zA-z]/.test(password) ||
      !/\d/.test(password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          "Must contain at least one letter, number, and special character.",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
      }));
      isValid = true;
    }

    if (password !== passwordConfirm) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordConfirm: "Passwords do not match.",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordConfirm: "",
      }));
      isValid = true;
    }

    if (!isValid) {
      //not valid
      alert("Registration Unsuccessful");
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
    <div className="registration-box">
      <h2 className="signup-text">Create a SkillBuddi Account</h2>
      <div className="i-hate-css">
        {" "}
        {/* this exists so that i can place the logo to the side of the form */}
        <form
          className="registration-form"
          ref={registerForm}
          onSubmit={handleSubmit}
        >
          <div className="form-field">
            {/*<label>First Name</label>*/}
            <input
              className="register-box"
              type="text"
              value={firstName}
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your First Name"
            />
            {errors.firstName && (
              <p className="registration-error">{errors.firstName}</p>
            )}
          </div>
          <div className="form-field">
            {/*<label>Last Name</label>*/}
            <input
              className="register-box"
              type="text"
              value={lastName}
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your Last Name"
            />
            {errors.lastName && (
              <p className="registration-error">{errors.lastName}</p>
            )}
          </div>
          <div className="form-field">
            {/*<label>Username</label>*/}
            <input
              className="register-box"
              type="text"
              value={username}
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="registration-error">{errors.username}</p>
            )}
          </div>

          <div className="form-field">
            {/*<label>Email</label>*/}
            <input
              className="register-box"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="registration-error">{errors.email}</p>
            )}
          </div>

          <div className="form-field">
            {/*<label>Password</label>*/}
            <input
              className="register-box"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="registration-error">{errors.password}</p>
            )}
          </div>

          <div className="form-field">
            {/*<label>Confirm Password</label>*/}
            <input
              className="register-box"
              type="password"
              name="password2"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="Confirm your password"
            />
            {errors.passwordConfirm && (
              <p className="registration-error">{errors.passwordConfirm}</p>
            )}
          </div>

          <button className="register-button" type="submit">
            Create SkillBuddi Account
          </button>
        </form>
        <div className="registration-img">
          <img
            className="registration-img"
            alt="omars face"
            src="https://i.ibb.co/Zdv59dK/omer.jpg"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Register;
