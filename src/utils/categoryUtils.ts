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
  fast_food: { icon: '🍔', color: '#FF4500' }, // Orange red
  ice_cream: { icon: '🍦', color: '#87CEEB' }, // Sky blue
  food: { icon: '🥗', color: '#32CD32' }, // Lime green

  // Lodging
  hotel: { icon: '🏨', color: '#4682B4' }, // Steel blue
  motel: { icon: '🛏️', color: '#5F9EA0' }, // Cadet blue
  hostel: { icon: '🏚️', color: '#B0C4DE' }, // Light steel blue
  lodging: { icon: '🏡', color: '#D2B48C' }, // Tan

  // Education
  school: { icon: '🏫', color: '#FFD700' }, // Gold
  university: { icon: '🎓', color: '#2E8B57' }, // Sea green
  library: { icon: '📚', color: '#8B4513' }, // Saddle brown
  college: { icon: '🏛️', color: '#708090' }, // Slate grey
  daycare: { icon: '🍼', color: '#FFB6C1' }, // Light pink

  // Shopping and Stores
  store: { icon: '🛒', color: '#32CD32' }, // Lime green
  supermarket: { icon: '🛍️', color: '#FF4500' }, // Orange red
  pharmacy: { icon: '💊', color: '#20B2AA' }, // Light sea green
  electronics_store: { icon: '📱', color: '#4682B4' }, // Steel blue
  clothing_store: { icon: '👗', color: '#FF69B4' }, // Hot pink
  furniture_store: { icon: '🪑', color: '#8B4513' }, // Saddle brown
  hardware_store: { icon: '🔧', color: '#708090' }, // Slate grey
  jewelry_store: { icon: '💍', color: '#FFD700' }, // Gold

  // Fitness and Wellness
  gym: { icon: '🏋️', color: '#800080' }, // Purple
  spa: { icon: '💆', color: '#FF69B4' }, // Hot pink
  physiotherapy: { icon: '🩺', color: '#4682B4' }, // Steel blue
  yoga: { icon: '🧘', color: '#6A5ACD' }, // Slate blue
  massage: { icon: '💆‍♂️', color: '#D2691E' }, // Chocolate brown

  // Entertainment
  movie_theater: { icon: '🎬', color: '#C71585' }, // Medium violet red
  park: { icon: '🌳', color: '#228B22' }, // Forest green
  museum: { icon: '🏛️', color: '#708090' }, // Slate grey
  zoo: { icon: '🦁', color: '#FF4500' }, // Orange red
  aquarium: { icon: '🐠', color: '#4682B4' }, // Steel blue

  // Health Services
  hospital: { icon: '🏥', color: '#FF6347' }, // Tomato red
  doctor: { icon: '👨‍⚕️', color: '#4682B4' }, // Steel blue
  dentist: { icon: '🦷', color: '#20B2AA' }, // Light sea green
  veterinary_care: { icon: '🐾', color: '#FFA07A' }, // Light salmon
  health: { icon: '🏥', color: '#FF6347' }, // Tomato red

  // Transport
  gas_station: { icon: '⛽', color: '#FF8C00' }, // Dark orange
  car_rental: { icon: '🚗', color: '#4682B4' }, // Steel blue
  bus_station: { icon: '🚌', color: '#FFD700' }, // Gold
  airport: { icon: '✈️', color: '#87CEFA' }, // Sky blue
  train_station: { icon: '🚉', color: '#2E8B57' }, // Sea green
  subway_station: { icon: '🚇', color: '#708090' }, // Slate grey

  // Hair-Related Services
  hair_salon: { icon: '💇', color: '#FF69B4' }, // Hot pink
  barbershop: { icon: '✂️', color: '#708090' }, // Slate grey
  wig_store: { icon: '💇‍♀️', color: '#D2B48C' }, // Tan
  hair_extensions: { icon: '✨', color: '#FFD700' }, // Gold
  hair_transplant: { icon: '🩺', color: '#4682B4' }, // Steel blue


  // Other Services
  bank: { icon: '🏦', color: '#2E8B57' }, // Sea green
  atm: { icon: '💳', color: '#4682B4' }, // Steel blue
  post_office: { icon: '📮', color: '#FF4500' }, // Orange red
  beauty_salon: { icon: '💇', color: '#FF69B4' }, // Hot pink
  laundry: { icon: '🧺', color: '#6BA39D' }, // Teal
  car_repair: { icon: '🔧', color: '#708090' }, // Slate grey
  home_goods_store: { icon: '🏠', color: '#D2B48C' }, // Tan
  real_estate_agency: { icon: '🏠', color: '#FFA07A' }, // Light salmon
  lawyer: { icon: '⚖️', color: '#8B4513' }, // Saddle brown
  accounting: { icon: '📊', color: '#4682B4' }, // Steel blue
  travel_agency: { icon: '✈️', color: '#FFD700' }, // Gold
  insurance_agency: { icon: '🛡️', color: '#708090' }, // Slate grey
  church: { icon: '⛪', color: '#6A5ACD' }, // Slate blue
  mosque: { icon: '🕌', color: '#228B22' }, // Forest green
  synagogue: { icon: '🕍', color: '#FFD700' }, // Gold
  funeral_home: { icon: '⚰️', color: '#708090' }, // Slate grey
  cemetery: { icon: '🪦', color: '#6B8E23' }, // Olive drab
  pet_store: { icon: '🐾', color: '#FF6347' }, // Tomato red
  animal_shelter: { icon: '🐕', color: '#B8860B' }, // Dark goldenrod
  tattoo_studio: { icon: '🖋️', color: '#708090' }, // Slate grey
  locksmith: { icon: '🔑', color: '#4682B4' }, // Steel blue
  shoe_store: { icon: '👞', color: '#D2691E' }, // Chocolate brown
  optician: { icon: '👓', color: '#6BA39D' }, // Teal
  dry_cleaner: { icon: '🧼', color: '#FFB6C1' }, // Light pink
  vape_shop: { icon: '💨', color: '#708090' }, // Slate grey
  toy_store: { icon: '🧸', color: '#FFA07A' }, // Light salmon
  garden_centre: { icon: '🌱', color: '#32CD32' }, // Lime green
  bike_store: { icon: '🚴', color: '#4682B4' }, // Steel blue
  bookstore: { icon: '📖', color: '#8B4513' }, // Saddle brown
  florist: { icon: '💐', color: '#FF69B4' }, // Hot pink
  tailor: { icon: '🧵', color: '#D2691E' }, // Chocolate brown
  printing_shop: { icon: '🖨️', color: '#708090' }, // Slate grey
  pawn_shop: { icon: '💎', color: '#FFD700' }, // Gold
  wedding_planner: { icon: '💍', color: '#FF69B4' }, // Hot pink
  fire_station: { icon: '🚒', color: '#FF4500' }, // Orange red
  police_station: { icon: '🚓', color: '#4682B4' }, // Steel blue
  courthouse: { icon: '🏛️', color: '#708090' }, // Slate grey
  taxi_stand: { icon: '🚕', color: '#FFD700' }, // Gold
  construction_company: { icon: '🏗️', color: '#A0522D' }, // Sienna
  employment_agency: { icon: '💼', color: '#2E8B57' }, // Sea green
  fitness_centre: { icon: '🏋️', color: '#800080' }, // Purple
  community_centre: { icon: '🏘️', color: '#B0C4DE' }, // Light steel blue
  consulting_firm: { icon: '📈', color: '#2E8B57' }, // Sea green
  care_home: { icon: '🏥', color: '#FF6347' }, // Tomato red
  veterinary_clinic: { icon: '🐾', color: '#FFA07A' }, // Light salmon
  cleaning_service: { icon: '🧹', color: '#32CD32' }, // Lime green
  plumber: { icon: '🚰', color: '#4682B4' }, // Steel blue
  electrician: { icon: '💡', color: '#FFD700' }, // Gold
  pest_control: { icon: '🐜', color: '#A52A2A' }, // Brown
  security_service: { icon: '🔒', color: '#708090' }, // Slate grey
  roofing_contractor: { icon: '🏠', color: '#D2691E' }, // Chocolate brown
  landscaping_service: { icon: '🌿', color: '#32CD32' }, // Lime green
  storage_facility: { icon: '📦', color: '#708090' }, // Slate grey
  water_supplier: { icon: '🚰', color: '#4682B4' }, // Steel blue
  waste_management: { icon: '♻️', color: '#32CD32' }, // Lime green
  public_relations: { icon: '📢', color: '#FFD700' }, // Gold
  advertising_agency: { icon: '🎨', color: '#FF69B4' }, // Hot pink
  media_production: { icon: '🎥', color: '#708090' }, // Slate grey
  translation_service: { icon: '🌐', color: '#4682B4' }, // Steel blue
  it_support: { icon: '💻', color: '#32CD32' }, // Lime green
  web_development: { icon: '🌐', color: '#2E8B57' }, // Sea green


  // Default
  default: { icon: '❓', color: '#B0B0B0' }, // Grey
};

export const getCategoryStyle = (type: string): CategoryStyle => {
  return categoryStyles[type] || categoryStyles.default; // Default if not found
};
