import React, { useState, useEffect } from "react";
import "../styles/home.css";
import UserCard from "../components/UserCard";
import { useAuth } from "../utils/AuthContext";
import { useDatabase } from "../utils/DatabaseContext";

const Home = () => {
  const { user } = useAuth(); // Access the currently logged-in user
  const { fetchMatchingUsers } = useDatabase();
  const [searchValue, setSearchValue] = useState("");
  const [matchingUsers, setMatchingUsers] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setLoading(true); // Set loading to true before fetching
      fetchMatchingUsers(user)
        .then((users) => {
          setMatchingUsers(users); // Update state with fetched users
        })
        .catch((err) => {
          setError(err.message); // Handle any errors
        })
        .finally(() => {
          setLoading(false); // Set loading to false after fetching is done
        });
    }
  }, [user, fetchMatchingUsers]);

  // This filters matching users based on search value, if any
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
              onChange={(e) => setSearchValue(e.target.value)} // OnChange for real-time search
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
