import React from "react";
import NavBar from "/Users/vale/Desktop/tests/tests/src/components/navbar.jsx";
import SearchBar from "/Users/vale/Desktop/tests/tests/src/components/searchbar.jsx";
import "./homepage.css";

const Home = () => {
  return (
    <div className="homepage-container">
      {/* Side Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      <div className="main-content">
        <h1>Welcome to SkillBuddi!</h1>
        <p>Find and share skills in a connected community</p>

        {/* Search Bar */}
       <SearchBar />
        
      </div>
    </div>
  );
};

export default Home;