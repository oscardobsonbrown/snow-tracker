/**
 * Hotel Cost Estimation Service
 * Calculates hotel costs with filters applied
 */

import type { Hotel, HotelFilters } from '@/types';
import { getHotelsForResort, filterHotels } from '@/data/hotels';

/**
 * Calculate total hotel cost for a stay
 */
export function calculateHotelCost(
  hotel: Hotel,
  nights: number,
  rooms: number
): {
  perNight: number;
  total: number;
} {
  const total = hotel.pricePerNight * nights * rooms;
  
  // Apply slight discount for longer stays (7+ nights)
  const discount = nights >= 7 ? 0.95 : 1;
  
  return {
    perNight: hotel.pricePerNight,
    total: Math.round(total * discount),
  };
}

/**
 * Find best matching hotel based on filters and budget
 */
export function findBestHotel(
  resortId: string,
  filters: HotelFilters,
  nights: number,
  rooms: number,
  maxBudget?: number
): Hotel | null {
  const hotels = getHotelsForResort(resortId);
  
  if (hotels.length === 0) return null;
  
  // Filter hotels
  let matchingHotels = filterHotels(hotels, {
    starRating: filters.starRating.length > 0 ? filters.starRating : undefined,
    chains: filters.chains.length > 0 ? filters.chains : undefined,
    amenities: {
      skiInSkiOut: filters.amenities.skiInSkiOut,
      breakfastIncluded: filters.amenities.breakfastIncluded,
      pool: filters.amenities.pool,
      spa: filters.amenities.spa,
      gym: filters.amenities.gym,
      freeParking: filters.amenities.freeParking,
    },
    maxPrice: maxBudget ? Math.floor(maxBudget / nights / rooms) : undefined,
  });
  
  // If no hotels match filters, return the cheapest available
  if (matchingHotels.length === 0) {
    matchingHotels = hotels;
  }
  
  // Sort by value (star rating / price ratio)
  matchingHotels.sort((a, b) => {
    const valueA = a.starRating / a.pricePerNight;
    const valueB = b.starRating / b.pricePerNight;
    return valueB - valueA;
  });
  
  return matchingHotels[0];
}

/**
 * Get hotel score based on star rating and amenities
 * 0-100 scale
 */
export function calculateHotelScore(hotel: Hotel): number {
  let score = hotel.starRating * 15; // 45-75 points for stars
  
  // Add points for amenities
  if (hotel.amenities.skiInSkiOut) score += 15;
  if (hotel.amenities.breakfastIncluded) score += 5;
  if (hotel.amenities.spa) score += 3;
  if (hotel.amenities.pool) score += 2;
  if (hotel.amenities.gym) score += 2;
  if (hotel.amenities.freeParking) score += 3;
  
  return Math.min(100, score);
}

/**
 * Get available hotel chains for a resort
 */
export function getAvailableChains(resortId: string): string[] {
  const hotels = getHotelsForResort(resortId);
  const chains = new Set(hotels.map(h => h.chain));
  return Array.from(chains);
}

/**
 * Get price range for a resort
 */
export function getResortPriceRange(resortId: string): {
  min: number;
  max: number;
  average: number;
} {
  const hotels = getHotelsForResort(resortId);
  
  if (hotels.length === 0) {
    return { min: 0, max: 0, average: 0 };
  }
  
  const prices = hotels.map(h => h.pricePerNight);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const average = prices.reduce((a, b) => a + b, 0) / prices.length;
  
  return { min, max, average: Math.round(average) };
}
