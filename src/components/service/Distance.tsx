// src/components/service/Distance.tsx
import React from 'react';

export const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

interface DistanceProps {
  userLat: number;
  userLng: number;
  serviceLat: number;
  serviceLng: number;
}

const Distance: React.FC<DistanceProps> = ({ userLat, userLng, serviceLat, serviceLng }) => {
  const distance = calculateDistance(userLat, userLng, serviceLat, serviceLng);
  return <p><strong>Distance:</strong> {distance.toFixed(2)} km</p>;
};

export default Distance;
