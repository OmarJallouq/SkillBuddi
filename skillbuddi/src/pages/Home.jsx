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

  //This function takes in the so called "OG users" and filters them based on the value in the search, such that the users must include the word in the search.
  const filteredUsers = matchingUsers.filter(
    (user) =>
      searchValue.trim() === "" ||
      user.Skills.some((skill) =>
        skill.toLowerCase().includes(searchValue.toLowerCase())
      )
  );

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
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)} //onChange for real time changes
            />
          </div>
        </div>
        {loading ? (
          <p>Loading matches...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="cards-section">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <UserCard key={user.$id} username={user.$id} />
              ))
            ) : (
              <p>
                No matching users found, try adding skills or wanted skills!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
