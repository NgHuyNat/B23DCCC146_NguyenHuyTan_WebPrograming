import React from 'react';
import './Home.css';
import home2 from '../../assets/home2.png';
import home1 from '../../assets/home1.jpg';

function Home() {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-text">
                    <div className='hero-content'>
                        <h1 className='hero-h1'>Welcome to Delivery Management</h1>
                        <p>Streamline your logistics with ease. Manage drivers, track deliveries, and optimize operations in one platform.</p>
                        <button className="cta-button">Get Started</button>
                    </div>
                    <div className="hero-image">
                        <img src={home1} alt="Hero" />
                    </div>
                </div>
            </div>


            <div className='service-section'>
                <h2 className='service-h2'>Our Services</h2>
                <div className='services'>
                    <div className='service-content'>
                        <h3>Maintenance and Repair Services</h3>
                        <p>Providing maintenance and repair services for equipment, machinery, and other assets to ensure optimal functioning and longevity.</p>
                    </div>
                    <div className='service-content'>
                        <h3>Technical Support</h3>
                        <p>Offering customer assistance and technical support to troubleshoot issues, answer queries, and provide guidance.</p>
                    </div>
                    <div className='service-content'>
                        <h3>Logistics and Delivery Services</h3>
                        <p>Providing maintenance and repair services for equipment, machinery, and other assets to ensure optimal functioning and longevity.</p>
                    </div>
                </div>
            </div>

            <div className='hero-section'>
                <div className='hero-text'>
                    <div className='mission-image'>
                        <img src={home2} alt="Mission" />
                    </div>
                    <div className='hero-content'>
                        <h2 className='hero-h1'>Our Mission</h2>
                        <p>Our mission is to empower businesses of all sizes to achieve seamless, agile, and cost-effective supply chain operations. We believe that a well-optimized supply chain is the backbone of successful businesses, enabling them to deliver exceptional products and services to customers around the world.</p>
                    </div>

                </div>
            </div>


            {/* Features Section */}
            <div className="feature-section">
                <h2 className='-h2feture'>Our Features</h2>
                <div className="features">
                    <div className="feature-card">
                        <i className="fas fa-truck"></i>
                        <h3>Real-Time Tracking</h3>
                        <p>Monitor every delivery step in real-time.</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-user-cog"></i>
                        <h3>Driver Management</h3>
                        <p>Assign tasks and oversee driver performance.</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-chart-line"></i>
                        <h3>Data Analytics</h3>
                        <p>Gain insights to improve logistics efficiency.</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-box"></i>
                        <h3>Order Management</h3>
                        <p>Organize and handle all orders with ease.</p>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="testimonials-section">
                <h2>What Our Users Say</h2>
                <div className="testimonials">
                    <div className="testimonial-card">
                        <p>"This platform has revolutionized the way we manage our logistics. Highly recommend it!"</p>
                        <h4>- John Doe, Logistics Manager</h4>
                    </div>
                    <div className="testimonial-card">
                        <p>"Our delivery times have improved dramatically since using Delivery Management."</p>
                        <h4>- Jane Smith, Operations Lead</h4>
                    </div>
                    <div className="testimonial-card">
                        <p>"The analytics tools have given us the insights we needed to grow."</p>
                        <h4>- Michael Brown, CEO</h4>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div className="footer">
                <div className="footer-content">
                    <div className="footer-logo">
                        <h3>Delivery Management</h3>
                        <p>Your trusted partner for efficient logistics.</p>
                    </div>
                    <div className="footer-links">
                        <h4>Quick Links</h4>
                        <ul>
                            <li>Home</li>
                            <li>About Us</li>
                            <li>Contact</li>
                            <li>Help Center</li>
                        </ul>
                    </div>
                    <div className="footer-social">
                        <h4>Follow Us</h4>
                        <i className="fab fa-facebook"></i>
                        <i className="fab fa-twitter"></i>
                        <i className="fab fa-linkedin"></i>
                        <i className="fab fa-instagram"></i>
                    </div>
                </div>
                <p>© 2024 Delivery Management. All rights reserved.</p>
            </div>
        </div>
    );
}

export default Home;
