import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditCateringEvent = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/catering-events/${id}`)
      .then((res) => res.json())
      .then(setFormData)
      .catch(console.error);
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/catering-events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      alert('Event updated!');
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  if (!formData) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Catering Event</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={formData.title} onChange={handleChange} required />
        <input name="date" type="date" value={formData.date} onChange={handleChange} required />
        <input name="location" value={formData.location} onChange={handleChange} required />
        <textarea name="description" value={formData.description} onChange={handleChange} />
        <button type="submit">Update Event</button>
      </form>
    </div>
  );
};

export default EditCateringEvent;
