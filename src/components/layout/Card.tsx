// src/components/layout/Card.tsx
import React from 'react';
import { getCategoryStyle } from '../../utils/categoryUtils';

interface CardProps {
  name: string;
  vicinity: string;
  rating?: number;
  userRatingsTotal?: number;
  distance: string;
  types?: string[];
  location: { lat: number; lng: number };
}

const Card: React.FC<CardProps> = ({ name, vicinity, rating, userRatingsTotal, distance, types, location }) => {
  // Determine the primary type for styling
  const primaryType = types && types.length > 0 ? types[0] : 'default';
  const { icon, color } = getCategoryStyle(primaryType);

  return (
    <div className="p-4 border rounded-lg shadow hover:shadow-md transition" style={{ borderColor: color }}>
      <div className="flex items-center mb-2">
        <span style={{ fontSize: '1.5rem', color }} className="mr-2">{icon}</span>
        <h2 className="text-xl font-semibold" style={{ color }}>{name}</h2>
      </div>
      <p className="mt-1">Address: {vicinity}</p>
      {rating && (
        <p className="mt-1">
          Rating: {rating} ⭐ ({userRatingsTotal} reviews)
        </p>
      )}
      <p className="mt-1">Distance: {distance} km</p>
      {types && (
        <p className="mt-1 text-sm text-gray-600">
          Subcategories: {types.join(', ')}
        </p>
      )}
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
