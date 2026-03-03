/**
 * Trip Calculation Service
 * Combines all services to calculate complete trip details
 */

import type {
  TripCalculation,
  TripCost,
  TravelConfig,
  HotelFilters,
  OriginLocation,
  Resort,
} from '@/types';
import { getResortById } from '@/data/resorts';
import { findBestHotel, calculateHotelCost } from './hotels';
import { estimateFlightCost } from './flights';
import { getRecommendedTransfer } from './transfers';
import { calculateResortScore } from './scoring';
import { calculateTotalTravelTime } from './travelTime';

/**
 * Calculate complete trip for a resort
 */
export function calculateTrip(
  resortId: string,
  config: TravelConfig,
  filters: HotelFilters
): TripCalculation | null {
  const resort = getResortById(resortId);
  if (!resort) return null;
  
  // Find best hotel
  const nights = Math.ceil(
    (config.endDate.getTime() - config.startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const hotel = findBestHotel(
    resortId,
    filters,
    nights,
    config.rooms,
    config.budget.maxTotal / 3 // Rough estimate for hotel budget
  );
  
  if (!hotel) return null;
  
  // Calculate costs
  const flightEstimate = estimateFlightCost(config.origin, resort.airportCode);
  const flight = {
    id: `${config.origin.airportCode}-${resort.airportCode}-${Date.now()}`,
    origin: config.origin.airportCode,
    destination: resort.airportCode,
    departureTime: config.startDate.toISOString(),
    arrivalTime: new Date(config.startDate.getTime() + flightEstimate.duration * 3600000).toISOString(),
    duration: flightEstimate.duration,
    price: flightEstimate.price,
    airline: 'Multiple Airlines',
    stops: flightEstimate.stops,
  };
  
  const hotelCost = calculateHotelCost(hotel, nights, config.rooms);
  const transfer = getRecommendedTransfer(resort.airportCode);
  
  // Calculate total cost
  const totalCost: TripCost = {
    flights: flight.price,
    hotel: hotelCost,
    transfers: transfer?.price || 85,
    total: flight.price + hotelCost.total + (transfer?.price || 85),
    underBudget: config.budget.maxTotal - (flight.price + hotelCost.total + (transfer?.price || 85)),
  };
  
  // Calculate score
  const score = calculateResortScore(resort, config.origin, hotel);
  
  // Calculate total travel time
  const totalTravelTime = calculateTotalTravelTime(config.origin, resort);
  
  return {
    resort,
    flights: [flight],
    recommendedHotel: hotel,
    transfers: transfer || {
      id: 'default',
      type: 'shuttle',
      duration: 60,
      price: 85,
      distance: 50,
    },
    cost: totalCost,
    score,
    totalTravelTime,
  };
}

/**
 * Calculate trips for all resorts
 */
export function calculateAllTrips(
  config: TravelConfig,
  filters: HotelFilters
): TripCalculation[] {
  const { getAllResorts } = require('@/data/resorts');
  const resorts: Resort[] = getAllResorts();
  
  return resorts
    .map((resort: Resort) => calculateTrip(resort.id, config, filters))
    .filter((trip): trip is TripCalculation => trip !== null)
    .sort((a, b) => b.score.overall - a.score.overall);
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number, currency: string = 'AUD'): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Get budget status
 */
export function getBudgetStatus(underBudget: number): {
  status: 'under' | 'over' | 'on';
  amount: number;
  color: string;
} {
  if (underBudget > 0) {
    return { status: 'under', amount: underBudget, color: '#22c55e' };
  }
  if (underBudget < 0) {
    return { status: 'over', amount: Math.abs(underBudget), color: '#ef4444' };
  }
  return { status: 'on', amount: 0, color: '#666' };
}
