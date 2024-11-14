import React from "react";

const Home = () => {
  return (
    <div className="homepage-container">
      {/* Side Navigation Bar */}
      <nav className="side-nav">
        <h2>SkillBuddi</h2>
        <button onClick={() => window.location.href = "/matching"}>Matching</button>
        <button onClick={() => window.location.href = "/profile"}>Profile</button>
        <button onClick={() => window.location.href = "/login/sign up"}>Login</button>
        <button onClick={() => window.location.href = "/messaging"}>Messaging</button>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <h1>Welcome to SkillBuddi!</h1>
        <p>Find and share skills in a connected community</p>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for skills..."
            className="search-bar"
          />
          <button className="search-button">Search</button>
        </div>
      </div>
    </div>
  );
};

export default Home;