import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './Dropdown.css';

const DropdownButton = ({ children }) => {
    return (
        <div className="dropdown-btn">
            {children}
            <span className="toggle-icon">
                <FaChevronDown />
            </span>
        </div>
    );
};


const DropdownContent = ({ children }) => {
    
    return (
        <div className="dropdown-content">
            {children}
        </div>
    );
};

const DropdownItem = ({ children, onClick }) => {
    return (
        <div className='dropdown-item' onClick={onClick}>
            {children}
        </div>
    );
};

const Dropdown = ({ buttonText, content }) => {

    return (
        <div className='dropdown'>
            <DropdownButton>
                {buttonText}
            </DropdownButton>
            <DropdownContent>
                {content}
            </DropdownContent>
        </div>
    );
};

export { Dropdown, DropdownItem };
