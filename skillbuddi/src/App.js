import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Home from './pages/Home';
import Messaging from './pages/Messaging';
import MyProfile from './pages/MyProfile';
import Profile from './pages/Profile'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Logout from './pages/Logout';
import { AuthProvider } from './utils/AuthContext';
import PrivateRoutes from './utils/PrivateRoutes'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { DatabaseProvider } from './utils/DatabaseContext';
import Chat from "./components/Chat";
import ConversationList from "./components/ConversationList";




const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Router>
        <DatabaseProvider>
          <AuthProvider>
            <Header />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<PrivateRoutes />}>
                {/* PUT THE ROUTES HERE THAT SHOULD ONLY BE ACCESSED IF THE USER IS LOGGED IN */}s
                <Route path="/" element={<Home />} />
                <Route path="/conversations" element={<ConversationList />} />
                <Route path="/chat/:partnerId" element={<Chat />} />
                <Route path="/messages" element={<Messaging />} />
                <Route path="/myProfile" element={<MyProfile />} />
                <Route path="/profile/:id" element={<Profile />} />
              </Route>
            </Routes>
          </AuthProvider>
        </DatabaseProvider>
      </Router>
    </>
  );
};

export default App;
