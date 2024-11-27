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



const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* 404 page */}
            <Route path="*" element={<PageNotFound />} />
            <Route element={<PrivateRoutes />}>
              {/* PUT THE ROUTES HERE THAT SHOULD ONLY BE ACCESSED IF THE USER IS LOGGED IN */}s
              <Route path="/" element={<Home />} />
              <Route path="/messages" element={<Messaging />} />
              <Route path="/myProfile" element={<MyProfile />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;
