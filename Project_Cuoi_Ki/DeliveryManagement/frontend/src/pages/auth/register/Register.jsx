import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import register from '../../../assets/register.jpg';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Cập nhật dữ liệu form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Xử lý đăng ký
  const handleRegister = async (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu khớp nhau
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      // Gửi yêu cầu đến API
      const response = await axios.post('http://localhost:3010/auth/register', {
        full_name: formData.name,
        email: formData.email,
        phone_number: formData.phone,
        password: formData.password,
      });

      // Nếu đăng ký thành công
      setSuccess('Registration successful! You can now log in.');
      setError(null);
      toast.success('Registration successful! Redirecting to login page in 3 seconds...');

      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
      // Xóa dữ liệu form
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      });
    } catch (err) {
      // Xử lý lỗi từ API
      toast.error(err.response?.data?.message || 'Registration failed!');
      setError(err.response?.data?.message || 'Registration failed!');
      setSuccess(null);
    }
  };

  return (
    <>
      <div className="register-container">
        <div className="register-left">
          <img
            src={register}
            alt="Sample"
            className="register-image"
          />
          <div className="register-message">
            <p>Empowering Global Trade, One Shipment at a Time</p>
          </div>
        </div>
        <div className="register-right">
          <div className="register-form">
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name..."
                required
                value={formData.name}
                onChange={handleChange}
              />

              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email..."
                required
                value={formData.email}
                onChange={handleChange}
              />

              <label htmlFor="phone">Phone Number *</label>
              <input
                type="text"
                id="phone"
                placeholder="Enter your phone number..."
                required
                value={formData.phone}
                onChange={handleChange}
              />

              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password..."
                required
                value={formData.password}
                onChange={handleChange}
              />

              <label htmlFor="confirm-password">Confirm Password *</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password..."
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <button type="submit" className="register-btn">Register</button>
            </form>
            <div className='register-options'>
              <p className="login-link">
                Already have an account? <a href="/login">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>

  );
};

export default Register;
