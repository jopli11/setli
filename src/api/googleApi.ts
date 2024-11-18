
// src/api/googleApi.ts
export const getPlaceDetails = async (placeId: string, apiKey: string) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`
    );
    const data = await response.json();
    return data;
  };
  