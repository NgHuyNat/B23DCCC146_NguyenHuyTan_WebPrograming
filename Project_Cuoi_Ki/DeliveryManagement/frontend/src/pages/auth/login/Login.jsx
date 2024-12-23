import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import login from '../../../assets/login.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3010/auth/login', {
        email,
        password,
      });

      const { token } = response.data;

      // Lưu token vào localStorage
      localStorage.setItem('token', token);

      // Điều hướng người dùng đến trang chính
      window.location.href = '/';
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed!');
      setError(err.response?.data?.message || 'Login failed!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-right">
        <div className="login-form">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="login-options">
              <div className='remember-me'>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <div className='forgot-password'>
                <a href="/forgot-password">Forgot password?</a>
              </div>

            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}

          <p className="register-link">
            Don't have an account? <a href="/register">Signup now</a>
          </p>
        </div>
      </div>
      <div className="login-left">
        <img
          src={login}
          alt="Sample"
          className="login-image"
        />
        <div className="login-message">
          <p>Simplifying Logistics, Connecting the World.</p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
