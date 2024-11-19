import React from 'react';

interface CardProps {
  name: string;
  vicinity: string;
  rating?: number;
  userRatingsTotal?: number;
  distance: string;
  icon: string;
  location: { lat: number; lng: number };
}

const Card: React.FC<CardProps> = ({ name, vicinity, rating, userRatingsTotal, distance, icon, location }) => {
  return (
    <div className="p-4 bg-white border rounded-lg shadow hover:shadow-md transition">
      <div className="flex items-center mb-2">
        <img src={icon} alt={`${name} icon`} className="w-6 h-6 mr-2" />
        <h2 className="text-xl font-semibold">{name}</h2>
      </div>
      <p className="mt-1">Address: {vicinity}</p>
      {rating && (
        <p className="mt-1">
          Rating: {rating} ⭐ ({userRatingsTotal} reviews)
        </p>
      )}
      <p className="mt-1">Distance: {distance} km</p>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block text-blue-600 hover:underline"
      >
        View on Google Maps
      </a>
    </div>
  );
};

export default Card;
