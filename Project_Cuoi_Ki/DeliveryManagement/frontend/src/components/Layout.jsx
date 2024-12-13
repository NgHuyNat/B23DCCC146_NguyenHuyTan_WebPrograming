import React from "react";
import Navbar from "./navigation/Navbar";
import { useState } from "react";

const Layout = ({ children }) => {
    const [theme, setTheme] = useState('light');

  return (
    <div>
        <Navbar theme={theme} setTheme={setTheme}/>
        <div>{children}</div>
    </div>
  );
};

export default Layout;