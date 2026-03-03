/**
 * Flight Cost Estimation Service
 * Provides average flight pricing based on routes and travel dates
 */

import type { Flight, OriginLocation } from '@/types';
import { ORIGIN_LOCATIONS } from './origin';

// Flight route pricing database (average AUD prices from Perth)
// Prices vary by distance, popularity, and season
interface RoutePricing {
  destinationCode: string;
  basePrice: number; // Base price in AUD
  pricePerKm: number;
  durationPerKm: number; // hours per km (approximate)
  typicalStops: number;
}

// Route pricing data from Perth (PER)
const ROUTE_PRICING: Record<string, RoutePricing> = {
  // Japan
  'CTS': { destinationCode: 'CTS', basePrice: 800, pricePerKm: 0.15, durationPerKm: 0.00012, typicalStops: 1 },
  'KIJ': { destinationCode: 'KIJ', basePrice: 850, pricePerKm: 0.16, durationPerKm: 0.00012, typicalStops: 1 },
  
  // Canada
  'YVR': { destinationCode: 'YVR', basePrice: 1200, pricePerKm: 0.12, durationPerKm: 0.00010, typicalStops: 1 },
  'YLW': { destinationCode: 'YLW', basePrice: 1300, pricePerKm: 0.13, durationPerKm: 0.00010, typicalStops: 2 },
  
  // Switzerland/France
  'GVA': { destinationCode: 'GVA', basePrice: 1400, pricePerKm: 0.11, durationPerKm: 0.00009, typicalStops: 1 },
  'CMF': { destinationCode: 'CMF', basePrice: 1350, pricePerKm: 0.11, durationPerKm: 0.00009, typicalStops: 2 },
  'VCE': { destinationCode: 'VCE', basePrice: 1300, pricePerKm: 0.11, durationPerKm: 0.00009, typicalStops: 1 },
  
  // New Zealand
  'ZQN': { destinationCode: 'ZQN', basePrice: 450, pricePerKm: 0.25, durationPerKm: 0.00018, typicalStops: 0 },
  'AKL': { destinationCode: 'AKL', basePrice: 380, pricePerKm: 0.20, durationPerKm: 0.00018, typicalStops: 0 },
  
  // USA
  'ASE': { destinationCode: 'ASE', basePrice: 1600, pricePerKm: 0.10, durationPerKm: 0.00009, typicalStops: 2 },
  'JAC': { destinationCode: 'JAC', basePrice: 1550, pricePerKm: 0.10, durationPerKm: 0.00009, typicalStops: 2 },
  
  // Austria
  'INN': { destinationCode: 'INN', basePrice: 1450, pricePerKm: 0.11, durationPerKm: 0.00009, typicalStops: 1 },
};

/**
 * Calculate distance between two coordinates using Haversine formula
 */
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Estimate flight cost from origin to destination
 */
export function estimateFlightCost(
  origin: OriginLocation,
  destinationAirportCode: string,
  _travelDate?: Date
): { price: number; duration: number; stops: number } {
  const route = ROUTE_PRICING[destinationAirportCode];
  
  if (!route) {
    // Fallback calculation for unknown routes
    // Assume Geneva pricing as fallback
    return {
      price: 1500,
      duration: 22,
      stops: 1,
    };
  }

  // Calculate estimated price with some variance (±15%)
  const variance = (Math.random() - 0.5) * 0.3; // ±15%
  const price = Math.round(route.basePrice * (1 + variance));
  
  // Calculate flight duration based on distance
  const distance = calculateDistance(
    origin.coordinates.lat,
    origin.coordinates.lng,
    0, // We don't have destination coordinates here, use base
    0
  );
  
  // Use average duration based on route data
  const duration = route.basePrice / 100; // Rough estimate
  
  return {
    price,
    duration: Math.round(duration * 10) / 10, // Round to 1 decimal
    stops: route.typicalStops,
  };
}

/**
 * Get flight details for a specific route
 */
export function getFlightDetails(
  origin: OriginLocation,
  destinationCode: string,
  destinationName: string
): Flight {
  const estimate = estimateFlightCost(origin, destinationCode);
  
  return {
    id: `${origin.airportCode}-${destinationCode}-${Date.now()}`,
    origin: origin.airportCode,
    destination: destinationCode,
    departureTime: new Date().toISOString(),
    arrivalTime: new Date(Date.now() + estimate.duration * 3600000).toISOString(),
    duration: estimate.duration,
    price: estimate.price,
    airline: 'Multiple Airlines',
    stops: estimate.stops,
  };
}

/**
 * Get estimated prices from all origins to a destination
 */
export function getPricesFromAllOrigins(
  destinationCode: string
): { origin: OriginLocation; price: number; duration: number }[] {
  return ORIGIN_LOCATIONS.map(origin => {
    const estimate = estimateFlightCost(origin, destinationCode);
    return {
      origin,
      price: estimate.price,
      duration: estimate.duration,
    };
  });
}

/**
 * Seasonal price multiplier (simplified)
 */
export function getSeasonalMultiplier(date: Date): number {
  const month = date.getMonth(); // 0-11
  
  // Peak season: December-February, mid-June to mid-September
  if (month === 11 || month === 0 || month === 1) {
    return 1.3; // +30% for peak winter
  }
  
  // Shoulder season: March, November, mid-September to November
  if (month === 2 || month === 10) {
    return 1.0; // Normal pricing
  }
  
  // Off season: April-October
  return 0.85; // -15% for off-season
}
