import React from "react";
import "../styles/about.css";

const About = () => {
  return (
    <div className="container">
      <div className="header-section">
        <h1 className="title">Who are we?</h1>
        <p className="subtitle">
          BRINGING PEOPLE TOGETHER TO SHARE SKILLS
        </p>
      </div>
      <div className="content-section">
        <div className="logo-section">

        </div>
        <div className="text-section">
          <h2 className="section-title">Our Mission</h2>
          <p className="text">
            Our platform is designed to bring individuals together to exchange
            skills, learn from one another, and grow as a community. Whether you
            want to teach coding, learn a new language, or improve your painting
            skills, we make it easy to connect with others who share your
            passions.
          </p>

          <h2 className="section-title">Why Choose Us?</h2>
          <p className="text">
            - Personalized profiles to showcase your skills and interests <br />
            - Matching with like-minded individuals <br />
            - A safe and friendly environment for collaboration
          </p>

          <h2 className="section-title">Our Values</h2>
          <p className="text">
            We believe in the power of collaboration, lifelong learning, and
            fostering meaningful connections. Our goal is to empower individuals
            to achieve their full potential by sharing what they know and learning
            from others.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
