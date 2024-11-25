import { useContext, useState, useEffect, createContext } from "react";
import { useDatabase } from "./DatabaseContext";
import { account } from "../appwriteConfig";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { createUserData, fetchUserData, deleteUserData } = useDatabase();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const loginUser = async (userInfo) => {
    setLoading(true);
    try {
      // Logs the User In
      await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );

      // Gets all User Information
      const accountDetails = await account.get();
      const userDetails = await fetchUserData(accountDetails.$id);

      // Sets the User
      setUser({ ...accountDetails, ...userDetails });

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
      // Deletes the Current Session and Sets the User to Null
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
      const userId = ID.unique();

      // Makes the Auth Record
      await account.create(
        userId,
        userInfo.email,
        userInfo.password,
        `${userInfo.firstName} ${userInfo.lastName}`
      );

      // Logs the User In
      await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );

      // Information for Database Entry
      const accountDetails = await account.get();
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

      // Creates Database Record
      await createUserData(accountDetails.$id, data);

      const userDetails = await fetchUserData(accountDetails.$id);

      // Sets the User with all Information
      setUser({ ...accountDetails, ...userDetails });

      return { success: true };
    } catch (error) {
      setError(error.message || "Something went wrong");
      return { success: false, error: error.message || "Something went wrong" };
    } finally {
      setLoading(false);
    }
  };

  const deleteProfile = async () => {
    if (!user) {
      return { success: false, error: "No user is logged in." };
    }

    try {
      const userId = user.$id;

      // Delete user data from the database
      const deleteDataResult = await deleteUserData(userId);
      if (!deleteDataResult.success) {
        throw new Error(deleteDataResult.error);
      }

      // Delete user account sessions (logs them out)
      try {
        await account.deleteSessions("current");
      } catch (sessionError) {
        console.warn("Failed to delete user session:", sessionError);

        // Rollback: Recreate the user document if necessary
        await createUserData(userId, { ...user });
        throw new Error("Failed to delete user session. Database restored.");
      }
      // Deletes user data from Auth
      try {
        await account.delete(userId);
      } catch (accountError) {
        console.warn("Failed to delete user account:", accountError);

        // Rollback: Recreate the user document
        await createUserData(userId, { ...user });
        throw new Error(
          "Failed to delete Appwrite account. Database restored."
        );
      }

      setUser(null); // Clear user context
      return { success: true };
    } catch (error) {
      console.error("Error deleting profile:", error);
      return { success: false, error: error.message || "Something went wrong" };
    }
  };

  const checkUserStatus = async () => {
    setLoading(true);
    try {
      // Attempts to check if there exists a session
      const session = await account.getSession("current");

      // If user is logged in, get their information, otherwise, null
      if (session) {
        const accountDetails = await account.get();
        const userDetails = await fetchUserData(accountDetails.$id);
        setUser({ ...accountDetails, ...userDetails });
      } else {
        console.warn("No active session found");
        setUser(null);
      }
    } catch (error) {
      console.error("Error in checkUserStatus:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
    deleteProfile,
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
