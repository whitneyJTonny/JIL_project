
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h4>VISIT US</h4>
          <p>
            Madugu Pandyat street<br />
            opposite ECWA church<br />
            Opposite St. Michael Secondary School<br />
            Egbeada Block
          </p>
          <p><a href="#">Get Directions</a></p>
        </div>
        <div className="footer-column">
          <h4>FOLLOW US</h4>
          <p><a href="#">Instagram</a></p>
          <p><a href="#">Twitter</a></p>
        </div>
        <div className="footer-column">
          <h4>OUR ORGANISATION</h4>
          <p>
            JESUS IS LORD<br />
            EATERY AND CATERING SERVICES
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>TERMS OF USE &nbsp; | &nbsp; PRIVACY POLICY &nbsp; | &nbsp; CONTACT US</p>
        <p>©2025 Jesus Is Lord Eatery And Catering Services</p>
      </div>
    </footer>
  );
};

export default Footer;
