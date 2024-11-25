import React from "react";
import "../styles/about.css";

const About = () => {
  return (
    <div className="container">
      <div className="header-section">
        <h1 className="title">Who are we?</h1>
        <p className="subtitle">
          Connecting people to share and exchange skills.
        </p>
      </div>
      <div className="content-section">
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
          - A safe and friendly environment for collaboration <br />
          - Easy-to-use
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
  );
};

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    lineHeight: "1.6",
    color: "#333",
  },
  headerSection: {
    textAlign: "center",
    padding: "40px 20px",
    backgroundColor: "#40E0D0", // Turquoise background
    color: "#fff",
  },
  title: {
    fontSize: "36px",
    margin: "0 0 10px",
  },
  subtitle: {
    fontSize: "18px",
    margin: "0",
  },
  contentSection: {
    padding: "20px 40px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  sectionTitle: {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#007BFF",
  },
  text: {
    fontSize: "16px",
    marginBottom: "20px",
    color: "#555",
  },
};

export default About;
