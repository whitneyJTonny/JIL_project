import React, { useEffect, useState } from 'react';
import './GalleryPage.css';
import API from '../../utils/api';

const GalleryItem = React.memo(({ image }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Construct full URL for images using environment variable
  const apiUrl = process.env.REACT_APP_API_URL || window.location.origin;
  const imageUrl = `${apiUrl}/static/gallery/${image.image_url.split('/').pop()}`;
  
  return (
    <div className="gallery-item">
      {!isLoaded && !hasError && (
        <div className="image-placeholder">
          <div className="skeleton-loader"></div>
        </div>
      )}
      
      <img
        src={imageUrl}
        alt={image.title || `Gallery Image ${image.id}`}
        style={{ display: isLoaded ? 'block' : 'none' }}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
      />
      
      {hasError && (
        <div className="error-placeholder">
          <span>Image unavailable</span>
        </div>
      )}
      
      {image.title && (
        <div className="image-caption">{image.title}</div>
      )}
    </div>
  );
});

const GalleryPage = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        console.log("Fetching gallery images...");
        const response = await API.get('/v1/gallery/');
        
        console.log("Gallery API Response:", response.data);
        
        if (response.data && Array.isArray(response.data)) {
          setGalleryImages(response.data);
        } else {
          throw new Error('Unexpected API response format');
        }
      } catch (err) {
        console.error("Error fetching gallery images:", err);
        
        let errorMessage = "Failed to fetch gallery images";
        if (err.response) {
          errorMessage = `Server error: ${err.response.status} - ${err.response.data.error || err.response.data.message}`;
        } else if (err.request) {
          errorMessage = "Network error - no response from server";
        } else {
          errorMessage = `Request setup error: ${err.message}`;
        }
        
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGalleryImages();
  }, []);

  if (loading) {
    return (
      <div className="gallery-page">
        <div className="loading-spinner"></div>
        <p>Loading gallery...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="gallery-page">
        <h1 className="gallery-page-title">Gallery</h1>
        <div className="error-container">
          <h3>Error</h3>
          <p>{error}</p>
          <p>Showing sample gallery instead</p>
        </div>
        <div className="gallery-grid">
          {[1, 2, 3].map(i => (
            <div key={i} className="gallery-item">
              <div className="placeholder-image">Gallery {i}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-page">
      <h1 className="page-title">Gallery</h1>
      <div className="gallery-grid">
        {galleryImages.length > 0 ? (
          galleryImages.map((image) => (
            <GalleryItem 
              key={`gallery-${image.id}`} 
              image={image} 
            />
          ))
        ) : (
          <div className="no-images-message">
            <p>No gallery images available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;