// src/utils/categoryUtils.ts

interface CategoryStyle {
    icon: string;
    color: string;
  }
  
  const categoryStyles: Record<string, CategoryStyle> = {
    // Restaurants and Food
    restaurant: { icon: '🍽️', color: '#FF6347' }, // Tomato red
    cafe: { icon: '☕', color: '#D2691E' }, // Chocolate brown
    bar: { icon: '🍻', color: '#FFD700' }, // Gold
    bakery: { icon: '🥐', color: '#FFA07A' }, // Light salmon
  
    // Lodging
    hotel: { icon: '🏨', color: '#4682B4' }, // Steel blue
    motel: { icon: '🛏️', color: '#5F9EA0' }, // Cadet blue
  
    // Education
    school: { icon: '🏫', color: '#FFD700' }, // Gold
    university: { icon: '🎓', color: '#2E8B57' }, // Sea green
    library: { icon: '📚', color: '#8B4513' }, // Saddle brown
  
    // Shopping and Stores
    store: { icon: '🛒', color: '#32CD32' }, // Lime green
    supermarket: { icon: '🛍️', color: '#FF4500' }, // Orange red
    pharmacy: { icon: '💊', color: '#20B2AA' }, // Light sea green
  
    // Fitness and Wellness
    gym: { icon: '🏋️', color: '#800080' }, // Purple
    spa: { icon: '💆', color: '#FF69B4' }, // Hot pink
    physiotherapy: { icon: '🩺', color: '#4682B4' }, // Steel blue
  
    // Entertainment
    movie_theater: { icon: '🎬', color: '#C71585' }, // Medium violet red
    park: { icon: '🌳', color: '#228B22' }, // Forest green
    museum: { icon: '🏛️', color: '#708090' }, // Slate grey
  
    // Health Services
    hospital: { icon: '🏥', color: '#FF6347' }, // Tomato red
    doctor: { icon: '👨‍⚕️', color: '#4682B4' }, // Steel blue
    dentist: { icon: '🦷', color: '#20B2AA' }, // Light sea green
  
    // Transport
    gas_station: { icon: '⛽', color: '#FF8C00' }, // Dark orange
    car_rental: { icon: '🚗', color: '#4682B4' }, // Steel blue
    bus_station: { icon: '🚌', color: '#FFD700' }, // Gold
  
    // Other Services
    bank: { icon: '🏦', color: '#2E8B57' }, // Sea green
    post_office: { icon: '📮', color: '#FF4500' }, // Orange red
    beauty_salon: { icon: '💇', color: '#FF69B4' }, // Hot pink
    laundry: { icon: '🧺', color: '#6BA39D' }, // Teal
  
    // Default
    default: { icon: '❓', color: '#B0B0B0' }, // Grey
  };
  
  export const getCategoryStyle = (type: string): CategoryStyle => {
    return categoryStyles[type] || categoryStyles.default; // Default if not found
  };
  