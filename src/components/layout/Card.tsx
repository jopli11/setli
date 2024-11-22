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
  // Find the first matching subcategory for the main icon and color
  const primaryCategory = types?.find((type) => getCategoryStyle(type).icon !== '❓') || 'default';
  const { icon: mainIcon, color: mainColor } = getCategoryStyle(primaryCategory);

  return (
    <div className="p-4 border rounded-lg shadow hover:shadow-md transition bg-white" style={{ borderColor: mainColor }}>
      {/* Main Icon and Title */}
      <div className="flex items-center mb-2">
        <span
          style={{
            fontSize: '1.5rem',
            color: mainColor,
          }}
          className="mr-2"
        >
          {mainIcon}
        </span>
        <h2
          className="text-xl font-semibold"
          style={{
            color: mainColor,
          }}
        >
          {name}
        </h2>
      </div>

      {/* Address and Distance */}
      <p className="mt-1">Address: {vicinity}</p>
      {rating && (
        <p className="mt-1">
          Rating: {rating} ⭐ ({userRatingsTotal} reviews)
        </p>
      )}
      <p className="mt-1">Distance: {distance} km</p>

      {/* Subcategories */}
      {types && (
        <div className="mt-2 text-sm text-gray-600">
          <p>Subcategories:</p>
          <ul className="flex flex-wrap gap-2 mt-1">
            {types.map((type, index) => {
              const { icon, color } = getCategoryStyle(type);
              return (
                <li
                  key={index}
                  className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full"
                  style={{ border: `1px solid ${color}` }}
                >
                  <span style={{ color }}>{icon}</span>
                  <span>{type.replace(/_/g, ' ')}</span> {/* Replace underscores with spaces */}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Google Maps Link */}
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-blue-600 hover:underline"
      >
        View on Google Maps
      </a>
    </div>
  );
};

export default Card;
