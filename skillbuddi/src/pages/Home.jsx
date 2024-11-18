import React from "react";
import NavBar from "../components/NavBar.jsx";

import "../styles/Home.css";

const Home = () => {
  return (
    <div className="homepage-container">
      {/* Side Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      <div className="main-content">
        <h1>Welcome to SkillBuddi!</h1>
        <p>Find and share skills in a connected community</p>
        
      </div>
    </div>
  );
};

export default Home;