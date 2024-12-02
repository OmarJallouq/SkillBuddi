import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import PrivateRoutes from './utils/PrivateRoutes'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { DatabaseProvider } from './utils/DatabaseContext';
import Logout from './pages/Logout';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Home from './pages/Home';
import MyProfile from './pages/MyProfile';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound';



const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Router>
        <DatabaseProvider>
          <AuthProvider>
            <Header />
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />\
              <Route path="*" element={<PageNotFound />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Home />} />
                <Route path="/myProfile" element={<MyProfile />} />
                <Route path="/profile/:username" element={<Profile />} />
              </Route>
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </AuthProvider>
        </DatabaseProvider>
      </Router>
    </>
  );
};

export default App;
