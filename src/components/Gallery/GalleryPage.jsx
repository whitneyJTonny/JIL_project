import React from 'react';
import './GalleryPage.css';

// Import gallery images
import gallery1 from '../../assets/gallery1.jpg';
import gallery2 from '../../assets/gallery2.jpg';
import gallery3 from '../../assets/gallery3.jpg';
import gallery4 from '../../assets/gallery4.jpg';
import gallery5 from '../../assets/gallery5.jpg';
import gallery6 from '../../assets/gallery6.jpg';
import gallery7 from '../../assets/gallery7.jpg';
import gallery8 from '../../assets/gallery8.jpg';
import food1 from '../../assets/food1.png';
import food2 from '../../assets/food2.png';
import food3 from '../../assets/food3.png';
import food4 from '../../assets/food4.png';
import food5 from '../../assets/food5.png';
import food6 from '../../assets/food6.png';


const images = [
  gallery1, gallery2, gallery3, gallery4,
  gallery5, gallery6, gallery7, gallery8,food1,
  food2,food3,food4,food5,food6
];

const GalleryPage = () => {
  return (
    <div className="gallery-page">
      {/* Gallery Heading */}
      <h1 className="gallery-title">Gallery</h1>

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {images.map((img, index) => (
          <div key={index} className="gallery-item">
            <img src={img} alt={`Gallery ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
