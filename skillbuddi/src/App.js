import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Home from './pages/Home';
import Messages from './pages/Messages';
import Chat from './pages/Chat'; // Use Chat from the pages folder
import MyProfile from './pages/MyProfile';
import Profile from './pages/Profile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import PrivateRoutes from './utils/PrivateRoutes';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ConversationList from "./components/ConversationList";
import { DatabaseProvider } from './utils/DatabaseContext';

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
                {/* Routes accessible only to logged-in users */}
                <Route path="/" element={<Home />} />
                <Route path="/conversations" element={<ConversationList />} />
                <Route path="/messages/:username" element={<Chat />} />
                <Route path="/messages" element={<Messages />} />
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
