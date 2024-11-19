import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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
  const [distanceFilter, setDistanceFilter] = useState<number>(5); // Default distance filter in km
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
      <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-primary mb-4">
          Results for: <span className="text-highlight">{place.formatted_address}</span>
        </h1>

        {/* Filters Section */}
        <div className="mb-6">
          <label className="block mb-2 text-slateBlue font-medium">Filter by distance (km): {distanceFilter} km</label>
          <input
            type="range"
            min="1"
            max="20"
            value={distanceFilter}
            onChange={(e) => setDistanceFilter(Number(e.target.value))}
            className="w-full"
          />
          
          <label className="block mt-4 mb-2 text-slateBlue font-medium">Filter by rating:</label>
          <select
            value={ratingFilter !== null ? String(ratingFilter) : ''}
            onChange={(e) => setRatingFilter(e.target.value ? Number(e.target.value) : null)}
            className="p-2 border rounded bg-offWhite"
          >
            <option value="">All</option>
            <option value="4.5">4.5+ stars</option>
            <option value="4.0">4.0+ stars</option>
            <option value="3.5">3.5+ stars</option>
            <option value="3.0">3.0+ stars</option>
          </select>

          <label className="block mt-4 mb-2 text-slateBlue font-medium">Filter by open status:</label>
          <select
            value={openStatusFilter !== null ? String(openStatusFilter) : ''}
            onChange={(e) => {
              const selectedValue = e.target.value;
              setOpenStatusFilter(selectedValue === 'true' ? true : selectedValue === 'false' ? false : null);
            }}
            className="p-2 border rounded bg-offWhite"
          >
            <option value="">All</option>
            <option value="true">Open</option>
            <option value="false">Closed</option>
          </select>

          <label className="block mt-4 mb-2 text-slateBlue font-medium">Filter by type:</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="p-2 border rounded bg-offWhite"
          >
            <option value="All">All</option>
            <option value="restaurant">Restaurant</option>
            <option value="hotel">Hotel</option>
            <option value="school">School</option>
            <option value="store">Store</option>
            <option value="gym">Gym</option>
            {/* Add more types as needed */}
          </select>
        </div>

        {/* Displaying Top Rated Services */}
        <h2 className="text-2xl font-semibold text-teal mb-4">Top Rated Services by Industry</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {uniqueTopRatedServices.length > 0 ? (
            uniqueTopRatedServices.map((service, index) => (
              <div key={index} className="p-4 bg-white border rounded-lg shadow hover:shadow-md transition">
                <h2 className="text-xl font-semibold">{service.name}</h2>
                <p className="mt-2">Address: {service.vicinity}</p>
                {service.rating && (
                  <p className="mt-1">Rating: {service.rating} ⭐ ({service.user_ratings_total} reviews)</p>
                )}
                <p className="mt-1">
                  Distance: {calculateDistance(
                    place.geometry.location.lat,
                    place.geometry.location.lng,
                    service.geometry.location.lat,
                    service.geometry.location.lng
                  ).toFixed(2)} km
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-lg text-slateBlue">No top rated services found.</p>
          )}
        </div>

        {/* Displaying All Services */}
        <h2 className="text-2xl font-semibold text-teal mb-4">All Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <p className="text-center text-lg text-slateBlue">Loading services...</p>
          ) : (
            filteredServices.length > 0 ? (
              filteredServices.map((service, index) => (
                <div key={index} className="p-4 bg-white border rounded-lg shadow hover:shadow-md transition">
                  <h2 className="text-xl font-semibold">{service.name}</h2>
                  <p className="mt-2">Address: {service.vicinity}</p>
                  {service.rating && (
                    <p className="mt-1">Rating: {service.rating} ⭐ ({service.user_ratings_total} reviews)</p>
                  )}
                  <p className="mt-1">
                    Distance: {calculateDistance(
                      place.geometry.location.lat,
                      place.geometry.location.lng,
                      service.geometry.location.lat,
                      service.geometry.location.lng
                    ).toFixed(2)} km
                  </p>
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
