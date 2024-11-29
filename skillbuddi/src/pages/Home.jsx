import React, { useState } from "react";
import "../styles/home.css";
import UserCard from "../components/UserCard";
import { useDatabase } from "../utils/DatabaseContext";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const { fetchUserData } = useDatabase();
  const [profile, setProfile] = useState(null);
  const userDatas = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData(username);
        setProfile(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  const users = ["omarjallouq", "fjanczak", "valentina12345", "cwelchuj123"];
  const searchedUsers = users;

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    console.log(searchValue);

    const searchCondition = (user) => user.Skills.includes(searchValue.trim());
    
    if (searchValue == "") {
      searchedUsers = users;
    } else {
      searchedUsers = users.filter(searchCondition)
    }
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
              onChange={handleSearchChange}
            />

            <button className="search-button" onClick={() => handleSearch()}>
              🔎︎
            </button>
          </div>
        </div>

        <div className="cards-section">
          {searchedUsers.map((username) => (
            <UserCard username={username} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;