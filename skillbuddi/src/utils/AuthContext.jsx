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

  const hasCheckedStatus = useRef(false);

  useEffect(() => {
    if (hasCheckedStatus.current) return; // Prevent re-execution
    hasCheckedStatus.current = true;

    const initializeUser = async () => {
      await checkUserStatus();
    };

    initializeUser();
  }, []);

  const loginUser = async (userInfo) => {
    setLoading(true);
    try {
      await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );
      const accountDetails = await account.get();
      const userDetails = await fetchUserData(accountDetails.$id);

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

      setUser({ ...accountDetails, ...userDetails });

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
      const session = await account.getSession("current");
      console.log(session);
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
      if (error.message.includes("missing scope")) {
        console.warn("User is not authenticated. Redirecting to login.");
      }
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
