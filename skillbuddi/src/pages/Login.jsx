
import React, { useState } from 'react';
import "../styles/login.css"

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple validation check
    if (username === 'user' && password === 'password') {
      alert('Login successful!');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="wholething">
    <div className="login">
      <form className="form" onSubmit={handleLogin} >
        <h1 className="heading">Log In</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className = "input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className = "input"
        />
        <button className = "button" type="submit" >Continue</button>
      </form>
    </div>
    </div>
  );
};

export default Login;
