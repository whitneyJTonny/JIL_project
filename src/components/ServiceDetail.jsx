// components/ServiceDetail.jsx
import { useParams, Link } from 'react-router-dom';

const serviceDetails = {
  catering: {
    title: "Catering Services",
    description:
      "We offer top-tier catering services with a wide variety of delicious meals, perfect for weddings, birthdays, corporate events, and more.",
    image: "/images/catering.jpg",
  },
  tents: {
    title: "Tent & Chairs",
    description:
      "High-quality tents and chairs for hire — suitable for all kinds of indoor and outdoor events. Setup and delivery included.",
    image: "/images/tents.jpg",
  },
  delivery: {
    title: "Delivery Services",
    description:
      "Fast and reliable delivery for both food and packages. Our trained riders cover a wide area to ensure your orders arrive on time.",
    image: "/images/delivery.jpg",
  },
  sound: {
    title: "Sound System",
    description:
      "Professional audio equipment including speakers, mixers, and microphones — ideal for concerts, weddings, and more.",
    image: "/images/sound.jpg",
  },
  mc: {
    title: "MC Services",
    description:
      "Charismatic and professional MCs to guide your event with joy, clarity, and entertainment value.",
    image: "/images/mc.jpg",
  },
};

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const service = serviceDetails[serviceId];

  if (!service) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Service Not Found</h2>
        <Link to="/services">Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="service-detail" style={{ padding: '2rem' }}>
      <img
        src={service.image}
        alt={service.title}
        style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }}
      />
      <h1 style={{ marginTop: '1rem' }}>{service.title}</h1>
      <p style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>{service.description}</p>
      <Link to="/services" className="btn-learnmore" style={{ marginTop: '1rem', display: 'inline-block' }}>
        ← Back to Services
      </Link>
    </div>
  );
}
