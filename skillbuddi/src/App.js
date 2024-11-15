import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Header from './components/Header';
import { Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import PrivateRoutes from './utils/PrivateRoutes'

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            {/* PUT THE ROUTES HERE THAT SHOULD ONLY BE ACCESSED IF THE USER IS LOGGED IN */}
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
