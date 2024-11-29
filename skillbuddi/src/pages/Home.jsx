
import React, { useState, useEffect } from "react";
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

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
   
  }

  return (
    <div className="home-page">
      <div className="main-content">
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
            {console.log(matchingUsers)}
            {matchingUsers.length > 0 ? (
              matchingUsers.map((user) => (
                <UserCard username={user.username} />
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
