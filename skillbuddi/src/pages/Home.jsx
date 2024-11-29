import React, { useState } from "react";
import "../styles/home.css";
import UserCard from "../components/UserCard";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");

  const users = ["omarjallouq", "fjanczak", "valentina12345", "cwelchuj123"];

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    console.log(searchValue);
  };

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
              onChange={handleSearchChange()}
            />

            <button className="search-button" onClick={() => handleSearch()}>
              🔎︎
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