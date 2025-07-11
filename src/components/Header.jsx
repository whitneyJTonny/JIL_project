import React from 'react';
import logo from '../assets/logo.png';
import searchIcon from '../assets/search-icon.png';
import emailIcon from '../assets/email-icon.png';

const Header = () => {
  return (
    <header className="jil-header">
      {}
      <div className="logo">
        <img src={logo} alt="JIL Eatery Logo" />
      </div>
<div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button className="search-button">
            <img src={searchIcon} alt="Search" />
          </button>
        </div>
      {/* Center: Navigation + Search */}
      <div className="center-section">
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#menu">Menu</a>
          <a href="#gallery">Gallery</a>
          <a href="#services">Services</a>
          <a href="#more">More</a>
          <a href="#contact">Contact</a>
        </nav>

        
      </div>

      {/* Right: Email + Login */}
      <div className="right-section">
        <div className="email-us">
          <img src={emailIcon} alt="Email Icon" />
          <span>Email Us</span>
        </div>
        <button className="login-button">LOG IN</button>
      </div>
    </header>
  );
};

export default Header;
