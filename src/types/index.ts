/**
 * Core types for SnowTrack application
 * Defines data structures for resorts, hotels, flights, trips, and scoring
 */

// Location coordinates
export interface Coordinates {
  lat: number;
  lng: number;
}

// Origin location (user's starting point)
export interface OriginLocation {
  id: string;
  name: string;
  city: string;
  country: string;
  coordinates: Coordinates;
  timezone: string;
  airportCode: string;
}

// Hotel types and amenities
export type HotelChain = 'marriott' | 'hyatt' | 'hilton' | 'ihg' | 'independent' | 'other';
export type StarRating = 3 | 4 | 5;

export interface Hotel {
  id: string;
  name: string;
  chain: HotelChain;
  starRating: StarRating;
  pricePerNight: number; // in AUD
  distanceFromResort: number; // in km
  amenities: {
    skiInSkiOut: boolean;
    breakfastIncluded: boolean;
    pool: boolean;
    spa: boolean;
    gym: boolean;
    freeParking: boolean;
  };
  coordinates: Coordinates;
}

// Flight information
export interface Flight {
  id: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: number; // in hours
  price: number; // in AUD
  airline: string;
  stops: number;
}

// Transfer/taxi from airport to resort
export interface Transfer {
  id: string;
  type: 'shuttle' | 'taxi' | 'private' | 'rental';
  duration: number; // in minutes
  price: number; // in AUD
  distance: number; // in km
}

// Snow conditions
export interface SnowConditions {
  baseDepth: number; // in cm
  last24Hours: number; // in cm
  last7Days: number; // in cm
  temperature: number; // in celsius
  forecast: {
    date: string;
    snowfall: number;
    temperature: number;
  }[];
}

// Resort size classification
export type ResortSize = 'small' | 'medium' | 'large' | 'epic';

// Ski resort definition
export interface Resort {
  id: string;
  name: string;
  region: string;
  country: string;
  coordinates: Coordinates;
  timezone: string;
  airportCode: string;
  size: ResortSize;
  totalRuns: number;
  kmOfRuns: number;
  liftCount: number;
  snow: SnowConditions;
  busyLevel: 'low' | 'medium' | 'high'; // crowd level
  website?: string;
}

// Travel configuration
export interface TravelConfig {
  origin: OriginLocation;
  startDate: Date;
  endDate: Date;
  adults: number;
  rooms: number;
  budget: {
    maxTotal: number; // in AUD
    currency: 'AUD';
  };
}

// Hotel filters
export interface HotelFilters {
  starRating: StarRating[];
  chains: HotelChain[];
  amenities: {
    skiInSkiOut: boolean;
    breakfastIncluded: boolean;
    pool: boolean;
    spa: boolean;
    gym: boolean;
    freeParking: boolean;
  };
}

// Travel filters
export interface TravelFilters {
  maxTravelTime: number; // in hours
  maxFlightDuration: number; // in hours
}

// Snow filters
export interface SnowFilters {
  minBaseDepth: number; // in cm
  minLast24Hours: number; // in cm
  forecastDays: number;
}

// Complete filter state
export interface FilterState {
  travelers: {
    adults: number;
    rooms: number;
  };
  hotel: HotelFilters;
  travel: TravelFilters;
  snow: SnowFilters;
  resortSize: ResortSize[];
}

// Score components (0-100 each)
export interface ScoreComponents {
  travel: number; // based on flight time + transfers
  timezone: number; // based on timezone difference
  snow: number; // based on current + forecast snow
  hotels: number; // based on availability and quality
  busy: number; // inverse of crowd level (100 = empty)
}

// Overall score with breakdown
export interface ResortScore {
  overall: number; // 0-100 weighted average
  components: ScoreComponents;
}

// Trip cost breakdown
export interface TripCost {
  flights: number;
  hotel: {
    perNight: number;
    total: number;
  };
  transfers: number;
  total: number;
  underBudget: number; // positive = under, negative = over
}

// Complete trip calculation for a resort
export interface TripCalculation {
  resort: Resort;
  flights: Flight[];
  recommendedHotel: Hotel;
  transfers: Transfer;
  cost: TripCost;
  score: ResortScore;
  totalTravelTime: number; // in hours
}

// Display view mode
export type ViewMode = 'list' | 'map';

// Application state
export interface AppState {
  viewMode: ViewMode;
  config: TravelConfig;
  filters: FilterState;
  selectedResort: string | null;
  mapZoom: number;
}
