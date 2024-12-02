import React, { useState, useEffect } from "react";
import "../styles/home.css";
import UserCard from "../components/UserCard";
import { useAuth } from "../utils/AuthContext";
import { useDatabase } from "../utils/DatabaseContext";
import { toast } from "react-toastify";

const Home = () => {
  const { user } = useAuth(); // Access the currently logged-in user
  const { fetchMatchingUsers, fetchPending } = useDatabase();
  const [searchValue, setSearchValue] = useState("");
  const [matchingUsers, setMatchingUsers] = useState([]); // Initialize as an empty array
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      const response = await fetchPending(user.$id);
      if (response.success) {
        setPendingUsers(response.response);
        console.log(response.response);
      } else {
        toast.error("Error fetching pending requests");
      }
    };

    if (user) {
      fetchPendingUsers();
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
        <>
          <div className="pending-requests">
            <h3 className="requests-title">Pending Requests</h3>
            <div className="requests-scroll">
              {pendingUsers.length > 0 ? (
                pendingUsers.map((request) => (
                  <UserCard key={request.$id} username={request.senderId} />
                ))
              ) : (
                <p>No pending requests</p>
              )}
            </div>
          </div>
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
        </>
      </div>
    </div>
  );
};

export default Home;
