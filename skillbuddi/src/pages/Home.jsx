import React from "react";
import "../styles/home.css";
import UserCard from "../components/UserCard";

const Home = () => {
  const users = ["omarjallouq", "fjanczak", "valentina12345"];

  return (
    <div className="home-page">
      <div className="main-content">
        <div className="head-section">
          <p className="matching-title">
            Your Matches
          </p>

          <div className="search">
            <input
              className="search-bar"
              type="text"
              placeholder="Search for a skill..."
            />
            <button className="search-button">
              
            </button>
          </div>
        </div>

        <div className="cards-section">
          {users.map((username) => (
            <UserCard username={username} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;