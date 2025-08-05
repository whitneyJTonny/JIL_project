// ContactPage.jsx
import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className="left-panel">
        <h1>Don't Hesitate to Contact Us<br />If You Need Any Help.</h1>
        <p>If you have queries or questions, please contact us using the form or reach out directly.</p>

        <div className="contact-info">
          <p><strong>Address:</strong> 1234 Church St, Lagos</p>
          <p><strong>Phone:</strong> +234 703 123 4567</p>
          <p><strong>Email:</strong> support@jileatery.com</p>
          <p><strong>Office Hours:</strong> Mon - Fri: 9am - 6pm</p>
        </div>
      </div>

      <div className="right-panel">
        <form className="contact-form">
          <input type="text" placeholder="Name*" required />
          <input type="email" placeholder="Email*" required />
          <input type="tel" placeholder="Phone Number" />
          <select required>
            <option value="">Type of Service</option>
            <option value="catering">Catering</option>
            <option value="delivery">Delivery</option>
            <option value="other">Other</option>
          </select>
          <textarea placeholder="Message*" required></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
