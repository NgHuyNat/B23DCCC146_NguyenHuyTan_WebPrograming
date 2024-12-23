import React, { useState, useEffect } from 'react';
import './Navbar.css';
import axios from 'axios';
import { Dropdown, DropdownItem } from '../dropdown/Dropdown';
import { NavLink } from 'react-router-dom';
import Modal from '../modal/Modal';
import logo_light from '../../assets/logo_light.png';
import coverPhoto from '../../assets/home2.png';
import avatar_profile from '../../assets/avatar_profile.png';
import test from '../../assets/test.webp';

function Navbar({ theme, setTheme }) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [profile, setProfile] = useState({
        full_name: '',
        email: '',
        phone_number: '',
        role: '',
    });
    const [editProfile, setEditProfile] = useState({}); // Dùng để lưu các thay đổi tạm thời
    const [loading, setLoading] = useState(false);

    // Fetch user profile
    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3010/auth/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProfile(response.data);
                setEditProfile(response.data); // Sao chép dữ liệu ban đầu vào editProfile
            } catch (error) {
                console.error('Error fetching profile:', error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    // Cập nhật dữ liệu tạm thời trong editProfile
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Gửi toàn bộ dữ liệu đã chỉnh sửa
    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                'http://localhost:3010/auth/profile',
                editProfile, // Gửi toàn bộ dữ liệu đã chỉnh sửa
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setProfile(editProfile); // Cập nhật profile với dữ liệu mới
            setIsProfileOpen(false); // Đóng modal sau khi lưu
        } catch (error) {
            console.error('Error saving profile:', error.message);
        }
    };


    return (
        <>
            <div className='navbar'>
                <img src={logo_light} alt='Logo' className='logo' />
                <ul>
                    <NavLink to='/home'><li>Home</li></NavLink>
                    <NavLink to='/dispatch'><li>Dispatch</li></NavLink>
                    <li>
                        <Dropdown
                            buttonText="Manage Order"
                            content={
                                <>
                                    <NavLink to='/manager-oder/view-order' className="no-underline"><DropdownItem>View Orders</DropdownItem></NavLink>
                                    <NavLink to='/manager-oder/create-order' className="no-underline"><DropdownItem>Create Order</DropdownItem></NavLink>
                                    <NavLink to='/manager-oder/analytics' className="no-underline"><DropdownItem>Analytics</DropdownItem></NavLink>
                                </>
                            }
                        />
                    </li>
                    <NavLink to='/driver'><li>Drivers</li></NavLink>
                    <NavLink to='/map'><li>Map</li></NavLink>
                </ul>
                <div className='profile'>
                    <Dropdown
                        buttonText={<img src={avatar_profile} alt="Profile" className="profile-image" />}
                        content={
                            <>
                                <DropdownItem onClick={() => setIsProfileOpen(true)}>Profile</DropdownItem>
                                <NavLink to='/logout' className="no-underline"><DropdownItem>Logout</DropdownItem></NavLink>
                            </>
                        }
                    />
                </div>
            </div>
            <Modal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)}>
                <div className="profile-container">
                    <div className="cover-photo">
                        <img src={coverPhoto} alt="Cover" />
                    </div>
                    <div className="avatar-container">
                        <img src={test} alt="Avatar" className="avatar" />
                    </div>
                    <div className="profile-info">
                        <h1>{editProfile.full_name}</h1>
                        <div className="profile-field">
                            <label>Full Name: </label>
                            <input
                                type="text"
                                name="full_name"
                                value={editProfile.full_name || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="profile-field">
                            <label>Email: </label>
                            <span>{profile.email}</span> {/* Email cố định, không chỉnh sửa */}
                        </div>
                        <div className="profile-field">
                            <label>Phone Number: </label>
                            <input
                                type="text"
                                name="phone_number"
                                value={editProfile.phone_number || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="profile-field">
                            <label>Role: </label>
                            <span>{profile.role}</span> {/* Role cố định, không chỉnh sửa */}
                        </div>
                    </div>
                    <div className="modal-buttons">
                        <button onClick={handleSave} className="small-button">Save</button>
                        <button onClick={() => setIsProfileOpen(false)} className="small-button">Cancel</button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default Navbar;
