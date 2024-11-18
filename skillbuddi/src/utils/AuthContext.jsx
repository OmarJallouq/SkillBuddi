import { useContext, useState, useEffect, createContext } from "react";
import { account } from "../appwriteConfig";
import { ID } from "appwrite";
import { toast, ToastContainer } from "react-toastify";
const AuthContext = createContext();

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
      let accountDetails = await account.get();
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
      await account.create(
        ID.unique(),
        userInfo.email,
        userInfo.password,
        userInfo.firstName + " " + userInfo.lastName
      );

      await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );
      let accountDetails = await account.get();
      setUser(accountDetails);
      return { success: true };
    } catch (error) {
      setError(error.message || "Something went wrong");
      return { success: false, error: error.message || "Something went wrong" };
    } finally {
      setLoading(false);
    }
  };

  const checkUserStatus = async () => {
    try {
      let accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {}
    setLoading(false);
  };

  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
  };

  return (
    <>
      <AuthContext.Provider value={contextData}>
        {loading ? <p>Loading...</p> : children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthContext;
