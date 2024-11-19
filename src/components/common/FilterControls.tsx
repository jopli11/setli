// src/components/common/FilterControls.tsx
import React from 'react';

interface FilterControlsProps {
  distanceFilter: number;
  setDistanceFilter: React.Dispatch<React.SetStateAction<number>>;
  ratingFilter: number | null;
  setRatingFilter: React.Dispatch<React.SetStateAction<number | null>>;
  openStatusFilter: boolean | null;
  setOpenStatusFilter: React.Dispatch<React.SetStateAction<boolean | null>>;
  typeFilter: string;
  setTypeFilter: React.Dispatch<React.SetStateAction<string>>;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  distanceFilter,
  setDistanceFilter,
  ratingFilter,
  setRatingFilter,
  openStatusFilter,
  setOpenStatusFilter,
  typeFilter,
  setTypeFilter,
}) => {
  return (
    <div className="flex flex-wrap items-center mb-6 gap-4">
      <label className="flex items-center text-slateBlue font-medium">
        Distance (km):
        <input
          type="range"
          min="1"
          max="20"
          value={distanceFilter}
          onChange={(e) => setDistanceFilter(Number(e.target.value))}
          className="ml-2"
        />
        <span className="ml-2">{distanceFilter} km</span>
      </label>

      <label className="flex items-center text-slateBlue font-medium">
        Rating:
        <select
          value={ratingFilter !== null ? String(ratingFilter) : ''}
          onChange={(e) => setRatingFilter(e.target.value ? Number(e.target.value) : null)}
          className="p-2 border rounded bg-offWhite ml-2"
        >
          <option value="">All</option>
          <option value="4.5">4.5+ stars</option>
          <option value="4.0">4.0+ stars</option>
          <option value="3.5">3.5+ stars</option>
          <option value="3.0">3.0+ stars</option>
        </select>
      </label>

      <label className="flex items-center text-slateBlue font-medium">
        Open Status:
        <select
          value={openStatusFilter !== null ? String(openStatusFilter) : ''}
          onChange={(e) => {
            const selectedValue = e.target.value;
            setOpenStatusFilter(selectedValue === 'true' ? true : selectedValue === 'false' ? false : null);
          }}
          className="p-2 border rounded bg-offWhite ml-2"
        >
          <option value="">All</option>
          <option value="true">Open</option>
          <option value="false">Closed</option>
        </select>
      </label>

      <label className="flex items-center text-slateBlue font-medium">
        Type:
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="p-2 border rounded bg-offWhite ml-2"
        >
          <option value="All">All</option>
          <option value="restaurant">Restaurant</option>
          <option value="hotel">Hotel</option>
          <option value="school">School</option>
          <option value="store">Store</option>
          <option value="gym">Gym</option>
          {/* Add more types as needed */}
        </select>
      </label>
    </div>
  );
};

export default FilterControls;
