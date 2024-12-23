import React from 'react';
import Home from './pages/home/Home.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from './components/Layout.jsx';
import Dispatch from './pages/dispatch/Dispatch.jsx';
import CreateOrder from './pages/manageOder/createOder/CreateOrder.jsx';
import ViewOder from './pages/manageOder/viewOder/ViewOder.jsx';
import Login from './pages/auth/login/Login.jsx';
import Register from './pages/auth/register/Register.jsx';
import Logout from './pages/auth/logout/Logout.jsx';
import Drivers from './pages/drivers/Drivers.jsx';
import Analytics from './pages/manageOder/analytics/Analytics.jsx';
import MapComponent from './pages/map/MapComponent.jsx';

const App = () => {
  const isLoggedIn = localStorage.getItem("token") !== null;
  
  return (
    <>
      <div className="container">
        <Routes>
          {!isLoggedIn ? (
            <>
              {/* Chuyển hướng đến login nếu chưa đăng nhập */}
              <Route path="*" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          ) : (
            <>
              {/* Các trang cho người đã đăng nhập */}
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/home" element={<Layout><Home /></Layout>} />
              <Route path="/dispatch" element={<Layout><Dispatch /></Layout>} />
              <Route path="/manager-oder/create-order" element={<Layout><CreateOrder /></Layout>} />
              <Route path='/manager-oder/view-order' element={<Layout><ViewOder /></Layout>} />
              <Route path="/manager-oder/analytics" element={<Layout><Analytics /></Layout>} />
              <Route path="/driver" element={<Layout><Drivers /></Layout>} />
              <Route path="/map" element={<Layout><MapComponent /></Layout>} />
              <Route path="/logout" element={<Layout><Logout /></Layout>} />
            </>
          )}
        </Routes>
      </div>
    </>
  );
}

export default App;
