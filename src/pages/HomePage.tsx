// src/pages/HomePage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../components/SearchInput';

const HomePage: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const navigate = useNavigate();

  const handlePlaceSelected = (place: any) => {
    console.log('Selected Place:', place);
    // Extract serializable properties
    const placeData = {
      formatted_address: place.formatted_address,
      place_id: place.place_id,
      geometry: {
        location: {
          lat: place.geometry?.location?.lat(),
          lng: place.geometry?.location?.lng(),
        },
      },
    };
    setSelectedPlace(placeData);
  };

  const handleContinue = () => {
    if (selectedPlace) {
      navigate('/results', { state: { place: selectedPlace } });
    }
  };


  return (
    <div className="relative min-h-screen bg-lightGrey flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Background Circles */}
      <div className="absolute w-32 h-32 bg-primary rounded-full opacity-30" style={{ top: '5%', left: '10%' }}></div>
      <div className="absolute w-48 h-48 bg-highlight rounded-full opacity-30" style={{ top: '15%', left: '50%' }}></div>
      <div className="absolute w-40 h-40 bg-slateBlue rounded-full opacity-30" style={{ top: '30%', left: '80%' }}></div>
      <div className="absolute w-24 h-24 bg-teal rounded-full opacity-30" style={{ top: '60%', left: '20%' }}></div>
      <div className="absolute w-28 h-28 bg-tan rounded-full opacity-30" style={{ top: '75%', left: '40%' }}></div>
      <div className="absolute w-36 h-36 bg-primary rounded-full opacity-30" style={{ bottom: '10%', right: '15%' }}></div>
      <div className="absolute w-20 h-20 bg-highlight rounded-full opacity-30" style={{ bottom: '20%', left: '5%' }}></div>
      <div className="absolute w-44 h-44 bg-slateBlue rounded-full opacity-30" style={{ bottom: '5%', left: '50%' }}></div>
      <div className="absolute w-26 h-26 bg-teal rounded-full opacity-30" style={{ bottom: '30%', right: '10%' }}></div>
      <div className="absolute w-30 h-30 bg-tan rounded-full opacity-30" style={{ bottom: '50%', right: '35%' }}></div>

 {/* Main Content */}
 <h1 className="text-4xl font-bold text-primary mb-6">Welcome to Setli</h1>
      <p className="text-lg text-slateBlue mb-4 text-center">
        Enter your address to find the best local services around you.
      </p>
      <SearchInput onPlaceSelected={handlePlaceSelected} />
      {selectedPlace && (
        <button
          onClick={handleContinue}
          className="mt-4 bg-highlight text-white py-2 px-6 rounded hover:bg-primary transition duration-300"
        >
          Continue
        </button>
      )}
    </div>
  );
};

export default HomePage;