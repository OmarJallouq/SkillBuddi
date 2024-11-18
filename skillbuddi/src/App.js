import React from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import Matching from './pages/Matching';
import MyProfile from './pages/MyProfile';
import Messaging from './pages/Messaging';
import Register from './pages/Register';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/Matching" element={<Matching />} />
          <Route path="/MyProfile" element={<MyProfile />} />
          <Route path="/Messaging" element={<Messaging />} />
          <Route path="/Register" element={<Register />} />
          {/* PUT THE ROUTES HERE THAT SHOULD ONLY BE ACCESSED IF THE USER IS LOGGED IN */}
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
