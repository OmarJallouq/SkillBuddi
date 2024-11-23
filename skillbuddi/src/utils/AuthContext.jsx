import { useContext, useState, useEffect, createContext } from "react";
import { account, databases, storage } from "../appwriteConfig";
import { ID } from "appwrite";

const AuthContext = createContext();

// Database and Collection IDs
const DATABASE_ID = "673ba5e5003626b2e2da";
const COLLECTION_ID = "673ba600001967a66f67";
const BUCKET_ID = "673bb76a0033fd6581b5";

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUserStatus();
  }, []);

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

  const logoutUser = async () => {
    try {
      await account.deleteSessions("current");
      return { success: true };
    } catch (error) {
      setError(error.message || "Something went wrong");
      return { success: false, error: error.message || "Something went wrong" };
    } finally {
      setUser(null);
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
      await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );

      const accountDetails = await account.get();
      setUser(accountDetails);

      // Add user to the database with basic details
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

  const uploadProfilePicture = async (file) => {
    try {
      const response = await storage.createFile(BUCKET_ID, ID.unique(), file);
      return response.$id; // Return the file ID
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const checkUserStatus = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {}
    setLoading(false);
  };

  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
    updateProfile,
    uploadProfilePicture,
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
