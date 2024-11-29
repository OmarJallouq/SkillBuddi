import React, { useState, useEffect } from "react";
import "../styles/home.css";
import UserCard from "../components/UserCard";
import { useDatabase } from "../utils/DatabaseContext";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const { fetchUserData } = useDatabase();
  const [profiles, setProfiles] = useState([]);
  const users = ["omarjallouq"];
  const [searchedUsers, setSearchedUsers] = useState([]);
  console.log("did all the consts");

  useEffect(() => {
    console.log("started useeffect");
    const fetchAllData = async () => {
      console.log("started fetchalldata");
      try {
        console.log("got to try");
        const userDataPromises = users.map((username) => fetchUserData(username));
        const userDatas = await Promise.all(userDataPromises);
        setProfiles(userDatas);
        console.log("finished try");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (users && users.length > 0) {
      fetchAllData();
      console.log("did fetchalldata");
    }
  }, [users]);

  setSearchedUsers(users);
  console.log("did setsearchedusers"); 

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    console.log(searchValue);
    
    if (searchValue == "") {
      setSearchedUsers(users);
    } else {
      const searchCondition = (user) => user.Skills.includes(searchValue.trim());

      const searchedUserDatas = profiles.filter(searchCondition);
      setSearchedUsers(searchedUserDatas.map((searchedData) => searchedData.username));
    }
  };

  return (
    <div className="home-page">
      {console.log("started return of home page")}
      {/*<div className="main-content">
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
      </div>*/}
    </div>
  );
  console.log("returned everything");
};

export default Home;