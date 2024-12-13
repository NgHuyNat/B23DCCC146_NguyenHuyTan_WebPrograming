import React from 'react';
import Home from './pages/home/Home.jsx';
import { Route, Routes } from "react-router-dom";
import Layout from './components/Layout.jsx';
import Dispatch from './pages/dispatch/Dispatch.jsx';
import CreateOrder from './pages/manageOder/createOder/CreateOrder.jsx';
import ViewOder from './pages/manageOder/viewOder/ViewOder.jsx';

const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Layout><Home/></Layout>}/>  
        <Route path="/home" element={<Layout><Home/></Layout>}/>
        <Route path="/dispatch" element={<Layout><Dispatch/></Layout>}/>
        <Route path="/manager-oder/create-order" element={<Layout><CreateOrder/></Layout>}/>
        <Route path='/manager-oder/view-order' element={<Layout><ViewOder/></Layout>}/>
        <Route path="/driver" element={<Layout><Home/></Layout>}/>
        <Route path="/map" element={<Layout><Home/></Layout>}/>
        <Route path="/aboutus" element={<Layout><Home/></Layout>}/>
      </Routes>

    </div>
  );
}

export default App;
