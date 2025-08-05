// src/pages/ServicePage.jsx
import { Link } from 'react-router-dom';
import './ServicePage.css';

// Correct imports for images
import cateringImg from '../../assets/catering.jpg';
import tentsImg from '../../assets/tents.jpg';
import deliveryImg from '../../assets/delivery.jpg';
import soundImg from '../../assets/sound.jpg';
import mcImg from '../../assets/mc.jpg';

const services = [
  {
    id: "catering",
    title: "Catering Services",
    image: cateringImg,
    description:
      "At JESUS IS LORD EATERY AND CATERING SERVICES, we understand the importance of creating a welcoming and organized environment for any event.",
  },
  {
    id: "tents",
    title: "Tent & Chairs",
    image: tentsImg,
    description:
      "We offer high-quality tents, chairs, and tables for hire to ensure your event is well-equipped and stylishly furnished.",
  },
  {
    id: "delivery",
    title: "Delivery Services",
    image: deliveryImg,
    description:
      "We proudly extend our exceptional culinary service to delivery, bringing fresh meals to your doorstep.",
  },
  {
    id: "sound",
    title: "Sound System",
    image: soundImg,
    description:
      "Our sound system rental ensures clear and effective communication for any type of event or gathering.",
  },
  {
    id: "mc",
    title: "MC Services",
    image: mcImg,
    description:
      "We provide professional Emcee (MC) services to elevate your event with smooth and lively hosting.",
  },
];

export default function ServicePage() {
  return (
    <div className="services-container">
      <h1>Our Services</h1>

      <div className="services-grid">
        {services.map((service) => (
          <div className="service-card" key={service.id}>
            <img src={service.image} alt={service.title} />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <Link to={`/services/${service.id}`} className="btn-learnmore">
              Learn More
            </Link>
          </div>
        ))}
      </div>

      <div className="more-services">
        <p>
          For any other services offered at JESUS IS LORD EATERY AND CATERING SERVICES,
          kindly <Link to="/services/more" className="btn-clickhere">Click Here</Link>
        </p>
      </div>
    </div>
  );
}
