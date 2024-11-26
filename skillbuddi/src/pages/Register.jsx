import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import "../styles/register.css";
import logo from "../logo.PNG";

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
  const [dateOfBirth, setDateOfBirth] = useState({});
  const [location, setLocation] = useState("");

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
    dateOfBirth: "",
    location: "",
    Bio: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const firstName = registerForm.current.firstName.value;
    const lastName = registerForm.current.lastName.value;
    const username = registerForm.current.username.value;
    const email = registerForm.current.email.value;
    const password = registerForm.current.password.value;
    const passwordConfirm = registerForm.current.password2.value;
    const dateOfBirth = registerForm.current.dateOfBirth.value;
    const location = registerForm.current.location.value;
    const Bio = registerForm.current.Bio.value;

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
      isValid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "",
      }));
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
    }

    if (password.length < 8) {
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
    }

    if (!dateOfBirth) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        dateOfBirth: "Please select a date of birth.",
      }));
      isValid = false;
    } else {
      const today = new Date();
      const thresholdDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );
      const dateAsDate = new Date(dateOfBirth);
      if (dateAsDate > thresholdDate) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          dateOfBirth: "You must be over 18 to use SkillBuddi",
        }));
        isValid = false;
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          dateOfBirth: "",
        }));
      }
    }

    // Validate Location
    if (location.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        location: "Please enter a location.",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        location: "",
      }));
    }

    if (!isValid) {
      toast.error("Registration not successful. Please check the form.");
      return;
    }

    const userInfo = {
      firstName,
      lastName,
      username,
      email,
      password,
      passwordConfirm,
      dateOfBirth,
      location,
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
      <h2 className="signup-text">Sign Up for SkillBuddi</h2>
      <div className="i-hate-css">
        {" "}
        {/* this exists so that i can place the logo to the side of the form */}
        <form
          className="registration-form"
          ref={registerForm}
          onSubmit={handleSubmit}
        >
          <div className="form-field">
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
            <input
              className="register-box"
              type="text"
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

          <div className="form-field">
            <input
              className="register-box"
              type="date"
              name="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(Date(e.target.value))}
              placeholder="Enter your date of birth"
            />
            {errors.dateOfBirth && (
              <p className="registration-error">{errors.dateOfBirth}</p>
            )}
          </div>

          <div className="form-field">
            <input
              className="register-box"
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your location"
            />
            {errors.location && (
              <p className="registration-error">{errors.location}</p>
            )}
          </div>

          <div className="stuff-container">
            {" "}
            {/* this div is to reduce the margin between the button and the link */}
            <button className="register-button" type="submit">
              Create SkillBuddi Account
            </button>
            <div className="loginer">
              <Link className="loginer" to="/">
                Already have an account?
              </Link>
            </div>
          </div>
        </form>
        <div className="registration-img">
          <img className="registration-img" alt="omars face" src={logo}></img>
        </div>
      </div>
    </div>
  );
};

export default Register;
