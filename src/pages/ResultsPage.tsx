// src/pages/ResultsPage.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../components/layout/Card';
import FilterControls from '../components/common/FilterControls';

interface Service {
  name: string;
  vicinity: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  rating?: number;
  user_ratings_total?: number;
  business_status?: string;
  types?: string[];
  icon: string;
}

const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const { place } = location.state || {};
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [distanceFilter, setDistanceFilter] = useState<number>(5);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [openStatusFilter, setOpenStatusFilter] = useState<boolean | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>('All');

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

  const filteredServices = services.filter(service => {
    const distance = calculateDistance(
      place.geometry.location.lat,
      place.geometry.location.lng,
      service.geometry.location.lat,
      service.geometry.location.lng
    );
    const withinDistance = distance <= distanceFilter;
    const withinRating = ratingFilter ? (service.rating ?? 0) >= ratingFilter : true;
    const isOpen = openStatusFilter !== null ? (service.business_status === 'OPERATIONAL') === openStatusFilter : true;
    const matchesType = typeFilter === 'All' || (service.types?.includes(typeFilter.toLowerCase()) ?? false);

    return withinDistance && withinRating && isOpen && matchesType;
  });

  const uniqueTopRatedServices = Array.from(
    new Map(
      filteredServices.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
        .map(service => [service.types?.[0], service])
    ).values()
  );

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
      <div className="max-w-5xl mx-auto bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-primary mb-4">
          Results for: <span className="text-highlight">{place.formatted_address}</span>
        </h1>

        {/* Filters Section */}
        <FilterControls
          distanceFilter={distanceFilter}
          setDistanceFilter={setDistanceFilter}
          ratingFilter={ratingFilter}
          setRatingFilter={setRatingFilter}
          openStatusFilter={openStatusFilter}
          setOpenStatusFilter={setOpenStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
        />

        {/* Displaying Top Rated Services */}
        <h2 className="text-2xl font-semibold text-teal mb-4">Top Rated Services by Industry</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {uniqueTopRatedServices.map((service, index) => (
            <Card
              key={index}
              name={service.name}
              vicinity={service.vicinity}
              rating={service.rating}
              userRatingsTotal={service.user_ratings_total}
              distance={calculateDistance(
                place.geometry.location.lat,
                place.geometry.location.lng,
                service.geometry.location.lat,
                service.geometry.location.lng
              ).toFixed(2)}
              types={service.types}
              location={service.geometry.location}
            />
          ))}
        </div>

        {/* Displaying Other Services */}
        <h2 className="text-2xl font-semibold text-teal mb-4">Other Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <p className="text-center text-lg text-slateBlue">Loading services...</p>
          ) : (
            filteredServices.map((service, index) => (
              <Card
                key={index}
                name={service.name}
                vicinity={service.vicinity}
                rating={service.rating}
                userRatingsTotal={service.user_ratings_total}
                distance={calculateDistance(
                  place.geometry.location.lat,
                  place.geometry.location.lng,
                  service.geometry.location.lat,
                  service.geometry.location.lng
                ).toFixed(2)}
                types={service.types}
                location={service.geometry.location}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
