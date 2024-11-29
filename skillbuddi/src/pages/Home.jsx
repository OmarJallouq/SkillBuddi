import React, { useState, useEffect, useEffect } from "react";
import "../styles/home.css";
import UserCard from "../components/UserCard";
import { useAuth } from "../utils/AuthContext";
import { databases } from "../appwriteConfig";
import { Query } from "appwrite";

const DATABASE_ID = process.env.REACT_APP_APPWRITE_DATABASE;
const COLLECTION_ID = process.env.REACT_APP_APPWRITE_COLLECTION;

const Home = () => {
  const { user } = useAuth(); // Access the currently logged-in user
  const [searchValue, setSearchValue] = useState("");
  const [matchingUsers, setMatchingUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.Skills_wanted) {
      fetchMatchingUsers(user.Skills_wanted);
    }
  }, [user]);

  const fetchMatchingUsers = async (skillsWanted) => {
    setLoading(true);
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.search("Skills", skillsWanted.join(" "))]
      );

      setMatchingUsers(response.documents);
    } catch (err) {
      console.error("Error fetching matching users:", err);
      setError("Failed to load matching users.");
    } finally {
      setLoading(false);
    }
  };
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
    const filteredUsers = matchingUsers.filter((user) =>
      user.Skills.some((skill) =>
        skill.toLowerCase().includes(searchValue.trim().toLowerCase())
      )
    );

    setMatchingUsers(filteredUsers);
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
          <p className="matching-title">Your Matches</p>
          <div className="search">
            <input
              className="search-bar"
              type="text"
              placeholder="Search for a skill..."
              onChange={handleSearchChange}
            />
            <button className="search-button" onClick={handleSearch}>
              🔎︎
            </button>
          </div>
        </div>
        {loading ? (
          <p>Loading matches...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="cards-section">
            {matchingUsers.length > 0 ? (
              matchingUsers.map((user) => (
                <UserCard key={user.$id} username={user.username} />
              ))
            ) : (
              <p>No matching users found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
  console.log("returned everything");
};

export default Home;
