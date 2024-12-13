import React, { Children, useState } from 'react';
import './Navbar.css';
import logo_dark from '../../assets/logo_dark.png';
import logo_light from '../../assets/logo_light.png';
import light_mode from '../../assets/light_mode.png';
import dark_mode from '../../assets/dark_mode.png';
import { Dropdown, DropdownItem } from '../dropdown/Dropdown';
import { NavLink } from 'react-router-dom';

const Navbar = ({ theme, setTheme }) => {
    const changeTheme = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    };

    return (
        <div className='navbar'>
            <img src={theme === 'light' ? logo_light : logo_dark} alt='' className='logo' />

            <ul>
                <NavLink to='/home'><li>Dashboard</li></NavLink>
                <NavLink to='/dispatch'><li>Dispatch</li></NavLink>
                <li>
                    <Dropdown buttonText="Manage Order" content={
                        <>
                            <NavLink to='/manager-oder/view-order' className="no-underline"><DropdownItem>View Orders</DropdownItem></NavLink>
                            <NavLink to='/manager-oder/create-order' className="no-underline"><DropdownItem>Create Order</DropdownItem></NavLink>
                            <DropdownItem>Order History</DropdownItem>
                        </>
                    } />
                </li>
                <li>Drivers</li>
                <li>Map</li>
                <li>Reports</li>
                <li>About us</li>
            </ul>

            <div className='profile'>
                <Dropdown buttonText="Profile" content={
                    <>
                        <DropdownItem>Profile</DropdownItem>
                        <DropdownItem>Settings</DropdownItem>
                        <DropdownItem>Logout</DropdownItem>
                    </>
                } />
            </div>

            <img onClick={changeTheme} src={theme === 'light' ? light_mode : dark_mode} alt='' className='mode' />
        </div>
    );
};

export default Navbar;
