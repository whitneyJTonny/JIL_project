import React from 'react';
import twitterIcon from '../assets/twitter-icon.png';
import instagramIcon from '../assets/instagram-icon.png';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>WELCOME TO</h1>
        <h2>JESUS IS LORD EATERY AND CATERING SERVICES</h2>
        <p>“Where quality meets perfection”</p>
        <button className="hero-btn">Order Now</button>

        {/* Follow Us */}
        <div className="follow-us">
          <span>FOLLOW US:</span>
          <img src={twitterIcon} alt="Twitter" />
          <img src={instagramIcon} alt="Instagram" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
