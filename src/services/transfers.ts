/**
 * Transfer/Taxi Cost Estimation Service
 * Provides ground transportation costs from airport to resort
 */

import type { Transfer } from '@/types';

// Transfer pricing by destination (in AUD)
interface TransferPricing {
  airportCode: string;
  distance: number; // km
  duration: number; // minutes
  shuttle: number; // AUD per person
  taxi: number; // AUD total
  private: number; // AUD total
  rental: number; // AUD per day
}

// Transfer pricing database
const TRANSFER_PRICING: Record<string, TransferPricing> = {
  // Japan
  'CTS': { airportCode: 'CTS', distance: 110, duration: 120, shuttle: 65, taxi: 350, private: 280, rental: 80 },
  'KIJ': { airportCode: 'KIJ', distance: 50, duration: 60, shuttle: 45, taxi: 180, private: 150, rental: 70 },
  
  // Canada
  'YVR': { airportCode: 'YVR', distance: 135, duration: 150, shuttle: 120, taxi: 450, private: 380, rental: 90 },
  'YLW': { airportCode: 'YLW', distance: 30, duration: 35, shuttle: 65, taxi: 120, private: 100, rental: 85 },
  
  // Switzerland/France/Italy
  'GVA': { airportCode: 'GVA', distance: 90, duration: 90, shuttle: 180, taxi: 450, private: 380, rental: 110 },
  'CMF': { airportCode: 'CMF', distance: 120, duration: 120, shuttle: 200, taxi: 500, private: 420, rental: 100 },
  'VCE': { airportCode: 'VCE', distance: 160, duration: 150, shuttle: 220, taxi: 550, private: 480, rental: 120 },
  
  // New Zealand
  'ZQN': { airportCode: 'ZQN', distance: 20, duration: 25, shuttle: 45, taxi: 85, private: 70, rental: 65 },
  'AKL': { airportCode: 'AKL', distance: 0, duration: 0, shuttle: 0, taxi: 0, private: 0, rental: 60 }, // Not a ski destination
  
  // USA
  'ASE': { airportCode: 'ASE', distance: 10, duration: 15, shuttle: 35, taxi: 85, private: 70, rental: 110 },
  'JAC': { airportCode: 'JAC', distance: 15, duration: 20, shuttle: 45, taxi: 95, private: 80, rental: 105 },
  
  // Austria
  'INN': { airportCode: 'INN', distance: 100, duration: 90, shuttle: 150, taxi: 380, private: 320, rental: 100 },
};

/**
 * Get transfer options for a destination
 */
export function getTransferOptions(airportCode: string): {
  shuttle: Transfer;
  taxi: Transfer;
  private: Transfer;
  rental: Transfer;
} | null {
  const pricing = TRANSFER_PRICING[airportCode];
  
  if (!pricing) return null;
  
  return {
    shuttle: {
      id: `${airportCode}-shuttle`,
      type: 'shuttle',
      duration: pricing.duration,
      price: pricing.shuttle,
      distance: pricing.distance,
    },
    taxi: {
      id: `${airportCode}-taxi`,
      type: 'taxi',
      duration: pricing.duration - 10, // Slightly faster
      price: pricing.taxi,
      distance: pricing.distance,
    },
    private: {
      id: `${airportCode}-private`,
      type: 'private',
      duration: pricing.duration - 10,
      price: pricing.private,
      distance: pricing.distance,
    },
    rental: {
      id: `${airportCode}-rental`,
      type: 'rental',
      duration: pricing.duration,
      price: pricing.rental * 7, // Weekly rate
      distance: pricing.distance,
    },
  };
}

/**
 * Get recommended transfer for a resort
 * Based on best value for 2 adults
 */
export function getRecommendedTransfer(airportCode: string): Transfer {
  const options = getTransferOptions(airportCode);
  
  if (!options) {
    return {
      id: `${airportCode}-default`,
      type: 'shuttle',
      duration: 60,
      price: 85,
      distance: 50,
    };
  }
  
  // For 2 adults, compare shuttle (2 × price) vs private
  const shuttleTotal = options.shuttle.price * 2;
  
  if (shuttleTotal > options.private.price) {
    return options.private;
  }
  
  return options.shuttle;
}

/**
 * Calculate total transfer cost for a group
 */
export function calculateTransferCost(
  airportCode: string,
  transferType: Transfer['type'],
  adults: number
): number {
  const options = getTransferOptions(airportCode);
  
  if (!options) return 85; // Default
  
  switch (transferType) {
    case 'shuttle':
      return options.shuttle.price * adults;
    case 'taxi':
      return options.taxi.price;
    case 'private':
      return options.private.price;
    case 'rental':
      return options.rental.price;
    default:
      return options.shuttle.price * adults;
  }
}
