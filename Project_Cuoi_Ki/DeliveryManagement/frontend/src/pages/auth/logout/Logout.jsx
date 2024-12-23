import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Thực hiện các hành động đăng xuất, như xóa token
    localStorage.removeItem('token'); // Xóa token (nếu bạn lưu token ở localStorage)
    localStorage.removeItem('user');
    console.log('Đăng xuất thành công!');

    // Chuyển hướng đến trang đăng nhập
    navigate('/login');
  }, [navigate]);

  return (
    <div>
    </div>
  );
};

export default Logout;
