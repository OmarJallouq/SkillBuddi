import React from "react";
import "../styles/home.css";
import UserCard from "../components/UserCard";

const Home = () => {
  return (
    <div className="home-page">
      <div className="main-content">
        <div className="head-section">

        </div>

        <div className="cards-section">
          <UserCard
            username="omarjallouq"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;