// src/pages/MoreServices.jsx
import { Link } from 'react-router-dom';
import './MoreServices.css'; // ✅ Correct CSS import

export default function MoreServices() {
  return (
    <div className="more-services-container">
      <h1>More Services</h1>
      <p>
        At JESUS IS LORD EATERY AND CATERING SERVICES, we go beyond food and furniture.
        Our extended services ensure your events are memorable, well-coordinated, and stress-free.
      </p>

      <ul className="more-services-list">
        <li>Event Planning & Coordination</li>
        <li>Buffet Setup & Decoration</li>
        <li>Corporate Lunches & Deliveries</li>
        <li>Wedding Packages</li>
        <li>Ushers & Event Staff</li>
        <li>Mobile Kitchen Services</li>
        <li>Customized Menu Packages</li>
      </ul>

      <p>
        We are constantly expanding our service offerings to better serve our clients.
        If you have a special request or a unique event idea, feel free to contact us!
      </p>

      <Link to="/services" className="btn-back">← Back to Services</Link>
    </div>
  );
}
