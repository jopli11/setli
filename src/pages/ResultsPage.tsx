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
        console.log('Fetching nearby services for lat:', lat, 'lng:', lng);
        const response = await fetch(`/api/nearby?lat=${lat}&lng=${lng}&type=establishment`);
        
        console.log('Raw response:', response);

        if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
          const data = await response.json();
          console.log('Parsed JSON data:', data);
          setServices(data.results || []);
        } else {
          console.error('Response is not JSON or not OK:', response);
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
      console.log('Place geometry found. Latitude:', lat, 'Longitude:', lng);
      fetchNearbyServices(lat, lng);
    } else {
      console.error('No valid place geometry found.');
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
