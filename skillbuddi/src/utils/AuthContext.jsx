import { useContext, useState, useEffect, createContext, useRef } from "react";
import { useDatabase } from "./DatabaseContext";
import { account } from "../appwriteConfig";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { createUserData, updateUserData, fetchUserData } = useDatabase();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Ref to ensure `checkUserStatus` is only run once
  const hasCheckedStatus = useRef(false);

  useEffect(() => {
    if (!hasCheckedStatus.current) {
      hasCheckedStatus.current = true;
      checkUserStatus();
    }
  }, []); // Empty dependency array ensures it only runs once.

  const loginUser = async (userInfo) => {
    setLoading(true);
    try {
      await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );
      const accountDetails = await account.get();
      const userDetails = await fetchUserData(accountDetails.$id);
      setUser({
        ...accountDetails,
        ...userDetails,
      });

      return { success: true };
    } catch (error) {
      setError(error.message || "Something went wrong");
      return { success: false, error: error.message || "Something went wrong" };
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      await account.deleteSessions("current");
      setUser(null);
      return { success: true };
    } catch (error) {
      setError(error.message || "Something went wrong");
      return { success: false, error: error.message || "Something went wrong" };
    }
  };

  const registerUser = async (userInfo) => {
    setLoading(true);
    try {
      // Create user in Appwrite authentication
      const userId = ID.unique();
      await account.create(
        userId,
        userInfo.email,
        userInfo.password,
        `${userInfo.firstName} ${userInfo.lastName}`
      );
      console.log("User ID:", userId);

      // Logs user in
      await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );

      const accountDetails = await account.get();

      // Add user to the database with basic details
      const data = {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        Bio: "",
        Skills: [],
        location: "",
        dateOfBirth: null,
        profilePicture: null,
      };

      await createUserData(accountDetails.$id, data);
      const userDetails = await fetchUserData(accountDetails.$id);
      setUser({
        ...accountDetails,
        ...userDetails,
      });

      return { success: true };
    } catch (error) {
      setError(error.message || "Something went wrong");
      return { success: false, error: error.message || "Something went wrong" };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (userId, data) => {
    try {
      await updateUserData(userId, data);
      return { success: true };
    } catch (error) {
      setError(error.message || "Something went wrong");
      return { success: false, error: error.message || "Something went wrong" };
    }
  };

  const checkUserStatus = async () => {
    setLoading(true);

    try {
      const accountDetails = await account.get();

      // If user is already set and matches the fetched user, skip fetching
      if (user && user.$id === accountDetails.$id) {
        setLoading(false);
        return;
      }

      const userDetails = await fetchUserData(accountDetails.$id);
      setUser({
        ...accountDetails,
        ...userDetails,
      });
    } catch (error) {
      console.error("Error in checkUserStatus:", error);
    } finally {
      setLoading(false);
    }
  };

  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
