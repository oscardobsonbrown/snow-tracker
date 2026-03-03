/**
 * Hotel Data for each resort
 * Includes various hotel chains, star ratings, and amenities
 */

import type { Hotel } from '@/types';

// Hotels for Niseko
export const NISEKO_HOTELS: Hotel[] = [
  {
    id: 'niseko-hilton',
    name: 'Hilton Niseko Village',
    chain: 'hilton',
    starRating: 5,
    pricePerNight: 450,
    distanceFromResort: 0.1,
    amenities: {
      skiInSkiOut: true,
      breakfastIncluded: true,
      pool: true,
      spa: true,
      gym: true,
      freeParking: true,
    },
    coordinates: { lat: 42.805, lng: 140.688 },
  },
  {
    id: 'niseko-ki',
    name: 'Ki Niseko',
    chain: 'independent',
    starRating: 5,
    pricePerNight: 520,
    distanceFromResort: 0,
    amenities: {
      skiInSkiOut: true,
      breakfastIncluded: true,
      pool: true,
      spa: true,
      gym: true,
      freeParking: true,
    },
    coordinates: { lat: 42.8045, lng: 140.687 },
  },
  {
    id: 'niseko-hyatt',
    name: 'Park Hyatt Niseko',
    chain: 'hyatt',
    starRating: 5,
    pricePerNight: 680,
    distanceFromResort: 0.2,
    amenities: {
      skiInSkiOut: true,
      breakfastIncluded: false,
      pool: true,
      spa: true,
      gym: true,
      freeParking: true,
    },
    coordinates: { lat: 42.804, lng: 140.686 },
  },
  {
    id: 'niseko-mid',
    name: 'Niseko Grand Hotel',
    chain: 'independent',
    starRating: 4,
    pricePerNight: 280,
    distanceFromResort: 0.5,
    amenities: {
      skiInSkiOut: false,
      breakfastIncluded: true,
      pool: false,
      spa: true,
      gym: false,
      freeParking: true,
    },
    coordinates: { lat: 42.806, lng: 140.69 },
  },
  {
    id: 'niseko-budget',
    name: 'Niseko Lodge',
    chain: 'independent',
    starRating: 3,
    pricePerNight: 140,
    distanceFromResort: 1.2,
    amenities: {
      skiInSkiOut: false,
      breakfastIncluded: false,
      pool: false,
      spa: false,
      gym: false,
      freeParking: true,
    },
    coordinates: { lat: 42.81, lng: 140.695 },
  },
];

// Hotels for Whistler
export const WHISTLER_HOTELS: Hotel[] = [
  {
    id: 'whistler-fairmont',
    name: 'Fairmont Chateau Whistler',
    chain: 'independent',
    starRating: 5,
    pricePerNight: 520,
    distanceFromResort: 0.1,
    amenities: {
      skiInSkiOut: true,
      breakfastIncluded: false,
      pool: true,
      spa: true,
      gym: true,
      freeParking: false,
    },
    coordinates: { lat: 50.1165, lng: -122.957 },
  },
  {
    id: 'whistler-four-seasons',
    name: 'Four Seasons Whistler',
    chain: 'independent',
    starRating: 5,
    pricePerNight: 580,
    distanceFromResort: 0.2,
    amenities: {
      skiInSkiOut: true,
      breakfastIncluded: true,
      pool: true,
      spa: true,
      gym: true,
      freeParking: true,
    },
    coordinates: { lat: 50.116, lng: -122.9565 },
  },
  {
    id: 'whistler-westin',
    name: 'Westin Resort & Spa',
    chain: 'marriott',
    starRating: 4,
    pricePerNight: 380,
    distanceFromResort: 0.3,
    amenities: {
      skiInSkiOut: false,
      breakfastIncluded: false,
      pool: true,
      spa: true,
      gym: true,
      freeParking: false,
    },
    coordinates: { lat: 50.1155, lng: -122.956 },
  },
  {
    id: 'whistler-hilton',
    name: 'Hilton Whistler',
    chain: 'hilton',
    starRating: 4,
    pricePerNight: 320,
    distanceFromResort: 0.5,
    amenities: {
      skiInSkiOut: false,
      breakfastIncluded: false,
      pool: true,
      spa: false,
      gym: true,
      freeParking: true,
    },
    coordinates: { lat: 50.115, lng: -122.955 },
  },
  {
    id: 'whistler-delta',
    name: 'Delta Whistler',
    chain: 'marriott',
    starRating: 3,
    pricePerNight: 220,
    distanceFromResort: 0.8,
    amenities: {
      skiInSkiOut: false,
      breakfastIncluded: false,
      pool: true,
      spa: false,
      gym: true,
      freeParking: true,
    },
    coordinates: { lat: 50.114, lng: -122.954 },
  },
];

// Hotels for Zermatt
export const ZERMATT_HOTELS: Hotel[] = [
  {
    id: 'zermatt-mont-cervin',
    name: 'Mont Cervin Palace',
    chain: 'independent',
    starRating: 5,
    pricePerNight: 780,
    distanceFromResort: 0.1,
    amenities: {
      skiInSkiOut: true,
      breakfastIncluded: true,
      pool: true,
      spa: true,
      gym: true,
      freeParking: false,
    },
    coordinates: { lat: 46.0208, lng: 7.7493 },
  },
  {
    id: 'zermatt-omnio',
    name: 'The Omnia',
    chain: 'independent',
    starRating: 5,
    pricePerNight: 850,
    distanceFromResort: 0.3,
    amenities: {
      skiInSkiOut: false,
      breakfastIncluded: true,
      pool: true,
      spa: true,
      gym: true,
      freeParking: true,
    },
    coordinates: { lat: 46.0205, lng: 7.7488 },
  },
  {
    id: 'zermatt-hotel-matterhorn',
    name: 'Hotel Matterhorn Focus',
    chain: 'independent',
    starRating: 4,
    pricePerNight: 380,
    distanceFromResort: 0.2,
    amenities: {
      skiInSkiOut: true,
      breakfastIncluded: true,
      pool: true,
      spa: true,
      gym: false,
      freeParking: false,
    },
    coordinates: { lat: 46.021, lng: 7.7495 },
  },
  {
    id: 'zermatt-holiday',
    name: 'Holiday Hotel Zermatt',
    chain: 'independent',
    starRating: 3,
    pricePerNight: 220,
    distanceFromResort: 0.5,
    amenities: {
      skiInSkiOut: false,
      breakfastIncluded: true,
      pool: false,
      spa: false,
      gym: false,
      freeParking: false,
    },
    coordinates: { lat: 46.0215, lng: 7.75 },
  },
];

// Hotels for Queenstown (Coronet Peak)
export const QUEENSTOWN_HOTELS: Hotel[] = [
  {
    id: 'queenstown-hilton',
    name: 'Hilton Queenstown',
    chain: 'hilton',
    starRating: 5,
    pricePerNight: 380,
    distanceFromResort: 16, // Coronet Peak is 16km from Queenstown
    amenities: {
      skiInSkiOut: false,
      breakfastIncluded: false,
      pool: true,
      spa: true,
      gym: true,
      freeParking: true,
    },
    coordinates: { lat: -45.0206, lng: 168.6263 },
  },
  {
    id: 'queenstown-sherwood',
    name: 'Sherwood Queenstown',
    chain: 'independent',
    starRating: 4,
    pricePerNight: 165,
    distanceFromResort: 18,
    amenities: {
      skiInSkiOut: false,
      breakfastIncluded: true,
      pool: false,
      spa: false,
      gym: false,
      freeParking: true,
    },
    coordinates: { lat: -45.0196, lng: 168.6243 },
  },
  {
    id: 'queenstown-nomads',
    name: 'Nomads Queenstown',
    chain: 'independent',
    starRating: 3,
    pricePerNight: 95,
    distanceFromResort: 16,
    amenities: {
      skiInSkiOut: false,
      breakfastIncluded: false,
      pool: false,
      spa: false,
      gym: false,
      freeParking: false,
    },
    coordinates: { lat: -45.0323, lng: 168.661 },
  },
];

// Map of hotels by resort ID
export const RESORT_HOTELS: Record<string, Hotel[]> = {
  'niseko-united': NISEKO_HOTELS,
  'whistler-blackcomb': WHISTLER_HOTELS,
  'zermatt': ZERMATT_HOTELS,
  'coronet-peak': QUEENSTOWN_HOTELS,
  // Default hotels for other resorts (simplified)
  'aspen-snowmass': [
    { id: 'aspen-lux', name: 'The Little Nell', chain: 'independent', starRating: 5, pricePerNight: 850, distanceFromResort: 0, amenities: { skiInSkiOut: true, breakfastIncluded: false, pool: true, spa: true, gym: true, freeParking: false }, coordinates: { lat: 39.2086, lng: -106.9493 } },
    { id: 'aspen-mid', name: 'Aspen Square', chain: 'independent', starRating: 4, pricePerNight: 420, distanceFromResort: 0.2, amenities: { skiInSkiOut: false, breakfastIncluded: false, pool: true, spa: false, gym: true, freeParking: true }, coordinates: { lat: 39.209, lng: -106.948 } },
    { id: 'aspen-budget', name: 'St Moritz Lodge', chain: 'independent', starRating: 3, pricePerNight: 180, distanceFromResort: 0.5, amenities: { skiInSkiOut: false, breakfastIncluded: false, pool: false, spa: false, gym: false, freeParking: true }, coordinates: { lat: 39.21, lng: -106.947 } },
  ],
  'chamonix': [
    { id: 'cham-lux', name: 'Hôtel Mont-Blanc', chain: 'independent', starRating: 5, pricePerNight: 450, distanceFromResort: 0.3, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: true, spa: true, gym: true, freeParking: false }, coordinates: { lat: 45.924, lng: 6.87 } },
    { id: 'cham-mid', name: 'Hotel Les Aiglons', chain: 'independent', starRating: 4, pricePerNight: 280, distanceFromResort: 0.5, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: true, spa: false, gym: true, freeParking: true }, coordinates: { lat: 45.925, lng: 6.872 } },
    { id: 'cham-budget', name: 'Alpy Hotel', chain: 'independent', starRating: 3, pricePerNight: 140, distanceFromResort: 0.8, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: false, spa: false, gym: false, freeParking: false }, coordinates: { lat: 45.926, lng: 6.874 } },
  ],
  'st-anton': [
    { id: 'stanton-lux', name: 'Hotel Tannbergerhof', chain: 'independent', starRating: 5, pricePerNight: 480, distanceFromResort: 0.2, amenities: { skiInSkiOut: true, breakfastIncluded: true, pool: true, spa: true, gym: true, freeParking: false }, coordinates: { lat: 47.1285, lng: 10.2635 } },
    { id: 'stanton-mid', name: 'Anthony\'s Life & Style Hotel', chain: 'independent', starRating: 4, pricePerNight: 280, distanceFromResort: 0.3, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: true, spa: true, gym: true, freeParking: true }, coordinates: { lat: 47.1288, lng: 10.2638 } },
    { id: 'stanton-budget', name: 'Hotel Garni Jennewein', chain: 'independent', starRating: 3, pricePerNight: 145, distanceFromResort: 0.6, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: false, spa: false, gym: false, freeParking: true }, coordinates: { lat: 47.129, lng: 10.264 } },
  ],
  'jackson-hole': [
    { id: 'jh-lux', name: 'Four Seasons Jackson Hole', chain: 'independent', starRating: 5, pricePerNight: 920, distanceFromResort: 0.1, amenities: { skiInSkiOut: true, breakfastIncluded: false, pool: true, spa: true, gym: true, freeParking: true }, coordinates: { lat: 43.583, lng: -110.822 } },
    { id: 'jh-mid', name: 'Snake River Lodge', chain: 'independent', starRating: 4, pricePerNight: 420, distanceFromResort: 0.2, amenities: { skiInSkiOut: true, breakfastIncluded: false, pool: true, spa: true, gym: true, freeParking: true }, coordinates: { lat: 43.5835, lng: -110.8215 } },
    { id: 'jh-budget', name: 'The Lexington', chain: 'independent', starRating: 3, pricePerNight: 180, distanceFromResort: 0.8, amenities: { skiInSkiOut: false, breakfastIncluded: false, pool: false, spa: false, gym: false, freeParking: true }, coordinates: { lat: 43.585, lng: -110.82 } },
  ],
  'hakuba': [
    { id: 'hakuba-lux', name: 'Hakuba Tokyu Hotel', chain: 'independent', starRating: 5, pricePerNight: 380, distanceFromResort: 0.3, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: true, spa: true, gym: true, freeParking: true }, coordinates: { lat: 36.6995, lng: 137.8635 } },
    { id: 'hakuba-mid', name: 'Hakuba Mominoki Hotel', chain: 'independent', starRating: 4, pricePerNight: 220, distanceFromResort: 0.5, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: true, spa: false, gym: true, freeParking: true }, coordinates: { lat: 36.7, lng: 137.864 } },
    { id: 'hakuba-budget', name: 'Hakuba Gondola Hotel', chain: 'independent', starRating: 3, pricePerNight: 120, distanceFromResort: 0.8, amenities: { skiInSkiOut: false, breakfastIncluded: false, pool: false, spa: false, gym: false, freeParking: true }, coordinates: { lat: 36.701, lng: 137.865 } },
  ],
  'cortina': [
    { id: 'cortina-lux', name: 'Cristallo Resort', chain: 'independent', starRating: 5, pricePerNight: 520, distanceFromResort: 0.5, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: true, spa: true, gym: true, freeParking: false }, coordinates: { lat: 46.541, lng: 12.1375 } },
    { id: 'cortina-mid', name: 'Hotel Ambra', chain: 'independent', starRating: 4, pricePerNight: 280, distanceFromResort: 0.3, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: false, spa: true, gym: false, freeParking: false }, coordinates: { lat: 46.5408, lng: 12.137 } },
    { id: 'cortina-budget', name: 'Hotel Meuble Oasi', chain: 'independent', starRating: 3, pricePerNight: 150, distanceFromResort: 0.6, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: false, spa: false, gym: false, freeParking: false }, coordinates: { lat: 46.5415, lng: 12.138 } },
  ],
  'revelstoke': [
    { id: 'revy-lux', name: 'Sutton Place Hotel', chain: 'independent', starRating: 5, pricePerNight: 380, distanceFromResort: 0.1, amenities: { skiInSkiOut: true, breakfastIncluded: false, pool: true, spa: true, gym: true, freeParking: true }, coordinates: { lat: 50.9588, lng: -118.164 } },
    { id: 'revy-mid', name: 'Revelstoke Lodge', chain: 'independent', starRating: 4, pricePerNight: 220, distanceFromResort: 0.5, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: true, spa: false, gym: true, freeParking: true }, coordinates: { lat: 50.9595, lng: -118.165 } },
    { id: 'revy-budget', name: 'Monashee Lodge', chain: 'independent', starRating: 3, pricePerNight: 130, distanceFromResort: 1.0, amenities: { skiInSkiOut: false, breakfastIncluded: false, pool: false, spa: false, gym: false, freeParking: true }, coordinates: { lat: 50.96, lng: -118.166 } },
  ],
  'val-thorens': [
    { id: 'vt-lux', name: 'Hotel Koh-I Nor', chain: 'independent', starRating: 5, pricePerNight: 620, distanceFromResort: 0.1, amenities: { skiInSkiOut: true, breakfastIncluded: true, pool: true, spa: true, gym: true, freeParking: false }, coordinates: { lat: 45.2988, lng: 6.5838 } },
    { id: 'vt-mid', name: 'Hotel Fahrenheit 7', chain: 'independent', starRating: 4, pricePerNight: 320, distanceFromResort: 0.2, amenities: { skiInSkiOut: true, breakfastIncluded: true, pool: true, spa: true, gym: true, freeParking: false }, coordinates: { lat: 45.299, lng: 6.584 } },
    { id: 'vt-budget', name: 'Hotel Le Val Thorens', chain: 'independent', starRating: 3, pricePerNight: 180, distanceFromResort: 0.4, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: false, spa: false, gym: false, freeParking: false }, coordinates: { lat: 45.2995, lng: 6.5845 } },
  ],
};

// Helper to get hotels for a resort
export function getHotelsForResort(resortId: string): Hotel[] {
  return RESORT_HOTELS[resortId] || [];
}

// Helper to filter hotels by criteria
export function filterHotels(
  hotels: Hotel[],
  filters: {
    starRating?: number[];
    chains?: string[];
    amenities?: Partial<Hotel['amenities']>;
    maxPrice?: number;
  }
): Hotel[] {
  return hotels.filter(hotel => {
    if (filters.starRating?.length && !filters.starRating.includes(hotel.starRating)) {
      return false;
    }
    if (filters.chains?.length && !filters.chains.includes(hotel.chain)) {
      return false;
    }
    if (filters.maxPrice && hotel.pricePerNight > filters.maxPrice) {
      return false;
    }
    if (filters.amenities) {
      for (const [key, value] of Object.entries(filters.amenities)) {
        if (value && !hotel.amenities[key as keyof Hotel['amenities']]) {
          return false;
        }
      }
    }
    return true;
  });
}
