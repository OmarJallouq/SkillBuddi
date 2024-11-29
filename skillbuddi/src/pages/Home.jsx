import React, { useState, useEffect } from "react";
import "../styles/home.css";
import UserCard from "../components/UserCard";
import { useAuth } from "../utils/AuthContext";
import { useDatabase } from "../utils/DatabaseContext";

const Home = () => {
  const { user } = useAuth(); // Access the currently logged-in user
  const { fetchMatchingUsers } = useDatabase(); // Access the fetchMatchingUsers function
  const [searchValue, setSearchValue] = useState("");
  const [matchingUsers, setMatchingUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch matching users whenever the user changes
  useEffect(() => {
    const loadMatchingUsers = async () => {
      if (user?.Skills_wanted) {
        setLoading(true);
        setError(null);
        try {
          const users = await fetchMatchingUsers(user.Skills_wanted);
          setMatchingUsers(users);
        } catch (err) {
          console.error("Error fetching matching users:", err);
          setError("Failed to load matching users.");
        } finally {
          setLoading(false);
        }
      }
    };

    loadMatchingUsers();
  }, [user, fetchMatchingUsers]);

  // Filter users based on search value
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
              onChange={(e) => setSearchValue(e.target.value)} // onChange for real-time changes
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
