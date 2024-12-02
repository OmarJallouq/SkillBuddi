import React from "react";
import "../styles/about.css";
import logo from "../logo.PNG";
import brainIcon from "../icons/brain-line-icon.png";
import exchangeIcon from "../icons/business-task-exchange-icon.png";
import globeIcon from "../icons/globe-network-icon.png";
import { Link, useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="header-bar">
        <div className="header-logo">
          <Link to="/">
            <img className="logo-img" alt="logo" src={logo}></img>
          </Link>
        </div>
        <div className="links-container">
          <Link className="header-link" to="/">
            Matching
          </Link>
          <Link className="header-link" to="/myProfile">
            My Profile
          </Link>
          <Link className="header-link" to="/About">
            About Us
          </Link>
        </div>

        <button
          className="logout-button"
          onClick={() => {
            navigate(`/login`);
          }}
        >
          Log In
        </button>
      </nav>

      <div className="container">
        <div className="header-section">
          <div className="title-container">
            <h1 className="title">Who are we?</h1>
            <p className="subtitle">BRINGING PEOPLE TOGETHER TO SHARE SKILLS</p>
          </div>
        </div>
        <div className="content-section">
          <div className="text-section">
            <h2 className="section-title">Our Mission</h2>
            <div className="text-and-logos">
              <img className="icon" alt="" src={exchangeIcon}></img>
              <p className="text">
                Our platform is designed to bring individuals together to
                exchange skills, learn from one another, and grow as a
                community. Whether you want to teach coding, learn a new
                language, or improve your painting skills, we make it easy to
                connect with others who share your passions.
              </p>
              <img className="icon-hidden" alt="" src={exchangeIcon}></img>
            </div>

            <h2 className="section-title">Why Choose Us?</h2>
            <div className="text-and-logos">
              <img className="icon-hidden" alt="" src={brainIcon}></img>
              <p className="text">
                - Personalized profiles to showcase your skills and interests{" "}
                <br />
                - Matching with like-minded individuals <br />- A safe and
                friendly environment for collaboration
              </p>
              <img className="icon" alt="" src={brainIcon}></img>
            </div>

            <h2 className="section-title">Our Values</h2>
            <div className="text-and-logos">
              <img className="icon" alt="" src={globeIcon}></img>
              <p className="text">
                We believe in the power of collaboration, lifelong learning, and
                fostering meaningful connections. Our goal is to empower
                individuals to achieve their full potential by sharing what they
                know and learning from others.
              </p>
              <img className="icon-hidden" alt="" src={globeIcon}></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
