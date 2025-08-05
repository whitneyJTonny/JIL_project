import React from 'react';
import './AboutUs.css';

import visionImg from '../../assets/vision.jpg';
import missionImg from '../../assets/mission.jpg';
import valuesImg from '../../assets/values.jpg';
import teamPlaceholder from '../../assets/team-placeholder.png';

const AboutUs = () => {
  return (
    <section className="aboutus-section">
      <div className="container">
        <h2 className="section-title">ABOUT US</h2>
        <p className="intro-text">
          Jesus Is Lord is a business dedicated to providing high quality services with a toch of excellence and heart of service
          We are a food company passionate about providing mouth-watering meals,
          snacks, and drinks to satisfy every craving.
        </p>

        <div className="info-block">
          <div className="text-block">
            <h3>Vision</h3>
            <p>To be the leading provider if exceptational eatery and Catering service,
              Car hire, Tents, Chairs, Hire Urshers. We are Known of our commitment of quality, Customer satisfaction, and
              a welcoming environment that reflects our faith-based principles.
            </p>
          </div>
          <img src={visionImg} alt="Vision" />
        </div>

        <div className="info-block reverse">
          <img src={missionImg} alt="Mission" />
          <div className="text-block">
            <h3>Mission</h3>
            <p>
              To deliver outstanding culinary
              experiences that
              honor God and enrich the lives of our customers
              through the exceptational services.
            </p>
          </div>
        </div>

        <div className="info-block">
          <div className="text-block">
            <h3>Core Values</h3>
            <ul>
              <li>
                Faith;
                We operate with integrity, guided by  our Christian values.
              </li>
              <li>
                Community;
                We aim building strong relationships within our community through our services.
              </li>
              <li>
                Customer Satisfaction;
                 We are dedicated to exceeding our customer expectations.
              </li>
              <li>
                Hospitality;
                 We provide a warm and welcoming atmosphere for all our guests
              </li>
            </ul>
          </div>
          <img src={valuesImg} alt="Core Values" />
        </div>

        <div className="team-section">
          <h3>OUR TEAMMATES</h3>
          <div className="team-members">
            <img src={teamPlaceholder} alt="Team member1" />
            <img src={teamPlaceholder} alt="Team member" />
            <img src={teamPlaceholder} alt="Team member" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
