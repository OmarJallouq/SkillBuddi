import React from 'react';
import Login from './Login';

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
