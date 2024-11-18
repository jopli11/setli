import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Service {
  name: string;
  vicinity: string;
}

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const { place } = location.state || {};
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNearbyServices = async (lat: number, lng: number) => {
      try {
        const response = await fetch(`/api/nearby?lat=${lat}&lng=${lng}&type=establishment`);
        
        // Log the response for debugging
        console.log('Raw response:', response);
  
        if (response.headers.get('content-type')?.includes('application/json')) {
          const data = await response.json();
          setServices(data.results || []);
        } else {
          throw new Error('Response is not JSON');
        }
      } catch (error) {
        console.error('Error fetching nearby services:', error);
      } finally {
        setLoading(false);
      }
    };
  
    if (place?.geometry?.location) {
      const lat = place.geometry.location.lat;
      const lng = place.geometry.location.lng;
      fetchNearbyServices(lat, lng);
    }
  }, [place]);
  

  if (!place) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-lightGrey">
        <p className="text-center text-xl text-slateBlue">
          No place data available. Please go back and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lightGrey p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-primary mb-4">
          Results for: <span className="text-highlight">{place.formatted_address}</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <p className="text-center text-lg text-slateBlue">Loading services...</p>
          ) : (
            services.length > 0 ? (
              services.map((service, index) => (
                <div key={index} className="p-4 bg-teal text-offWhite rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold">{service.name}</h2>
                  <p className="mt-2">{service.vicinity}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-lg text-slateBlue">No nearby services found.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
