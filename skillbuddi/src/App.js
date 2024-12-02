import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Home from './pages/Home';
import Messaging from './pages/Messaging';
import MyProfile from './pages/MyProfile';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import PrivateRoutes from './utils/PrivateRoutes'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
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
              {/* 404 page */}
              <Route path="*" element={<PageNotFound />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Home />} />
                <Route path="/myProfile" element={<MyProfile />} />
                <Route path="/profile:username" element={<Profile />} />
                <Route path="/about" element={<About />} />
              </Route>
            </Routes>
          </AuthProvider>
        </DatabaseProvider>
      </Router>
    </>
  );
};

export default App;
