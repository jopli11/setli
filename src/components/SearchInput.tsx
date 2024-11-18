import React from 'react';
import Autocomplete from 'react-google-autocomplete';

interface SearchInputProps {
  onPlaceSelected: (place: any) => void; // Updated type to `any` for broader compatibility
}

const SearchInput: React.FC<SearchInputProps> = ({ onPlaceSelected }) => {
  return (
    <div className="relative w-full max-w-md">
      <Autocomplete
        apiKey={import.meta.env.VITE_GOOGLE_API_KEY} // Updated to use `import.meta.env`
        onPlaceSelected={(place: any) => { // Adjusted to `any`
          onPlaceSelected(place);
        }}
        options={{ types: ['address'], fields: ['formatted_address', 'geometry'] }}
        className="w-full p-4 border rounded shadow-sm"
      />
      <input
        type="text"
        placeholder="Enter your address..."
        className="absolute top-0 left-0 w-full h-full p-4 opacity-0 pointer-events-none"
      />
    </div>
  );
};

export default SearchInput;
