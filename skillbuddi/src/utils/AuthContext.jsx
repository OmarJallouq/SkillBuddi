import { useContext, useState, useEffect, createContext, useMemo } from "react";
import { account, databases, storage } from "../appwriteConfig";
import { ID } from "appwrite";

const AuthContext = createContext();

// Database and Collection IDs from environment variables
const DATABASE_ID = `${process.env.REACT_APP_APPWRITE_DATABASE}`;
const COLLECTION_ID = `${process.env.REACT_APP_APPWRITE_COLLECTION}`;
const BUCKET_ID = `${process.env.REACT_APP_APPWRITE_STORAGE}`;

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUserStatus();
  }, []);

  // Login User
  const loginUser = async (userInfo) => {
    setLoading(true);
    try {
      await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );
      const accountDetails = await account.get();
      setUser(accountDetails);

      return { success: true };
    } catch (error) {
      setError(error.message || "Something went wrong");
      return { success: false, error: error.message || "Something went wrong" };
    } finally {
      setLoading(false);
    }
  };

  // Logout User
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

  // Register User
  const registerUser = async (userInfo) => {
    setLoading(true);
    try {
      const userId = ID.unique();
      await account.create(
        userId,
        userInfo.email,
        userInfo.password,
        `${userInfo.firstName} ${userInfo.lastName}`
      );
      await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );

      const accountDetails = await account.get();
      setUser(accountDetails);

      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        accountDetails.$id, // Use Appwrite user ID as the document ID
        {
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          Bio: "",
          Skills: [],
          location: "",
          dateOfBirth: null,
          profilePicture: null,
        }
      );

      return { success: true };
    } catch (error) {
      setError(error.message || "Something went wrong");
      return { success: false, error: error.message || "Something went wrong" };
    } finally {
      setLoading(false);
    }
  };

  // Update User Profile
  const updateProfile = async (userId, updates) => {
    try {
      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        userId,
        updates
      );
      return { success: true };
    } catch (error) {
      setError(error.message || "Something went wrong");
      return { success: false, error: error.message || "Something went wrong" };
    }
  };

  // Upload Profile Picture
  const uploadProfilePicture = async (file) => {
    try {
      const response = await storage.createFile(BUCKET_ID, ID.unique(), file);
      return response.$id; // Return the file ID
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // Check User Status
  const checkUserStatus = async () => {
    try {
      const accountDetails = await account.get();
      setUser((prevUser) => {
        if (!prevUser || prevUser.$id !== accountDetails.$id) {
          return accountDetails;
        }
        return prevUser;
      });
    } catch (error) {
      console.error("Error checking user status:", error);
    } finally {
      setLoading(false);
    }
  };

  // Context Data (Memoized)
  const contextData = useMemo(
    () => ({
      user,
      loginUser,
      logoutUser,
      registerUser,
      updateProfile,
      uploadProfilePicture,
    }),
    [user]
  );

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
