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
  ],
  // ===== Japanese Kogen Resorts =====
  'appi-kogen': [
    { id: 'appi-lux', name: 'Appi Kogen Hotel', chain: 'independent', starRating: 4, pricePerNight: 280, distanceFromResort: 0.1, amenities: { skiInSkiOut: true, breakfastIncluded: true, pool: false, spa: true, gym: false, freeParking: true }, coordinates: { lat: 40.007, lng: 140.934 } },
    { id: 'appi-mid', name: 'Appi Grand Villa', chain: 'independent', starRating: 3, pricePerNight: 180, distanceFromResort: 0.3, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: false, spa: false, gym: false, freeParking: true }, coordinates: { lat: 40.008, lng: 140.935 } },
    { id: 'appi-budget', name: 'Appi Lodge', chain: 'independent', starRating: 3, pricePerNight: 110, distanceFromResort: 0.5, amenities: { skiInSkiOut: false, breakfastIncluded: false, pool: false, spa: false, gym: false, freeParking: true }, coordinates: { lat: 40.009, lng: 140.936 } },
  ],
  'zao-onsen': [
    { id: 'zao-lux', name: 'Zao Royal Hotel', chain: 'independent', starRating: 4, pricePerNight: 320, distanceFromResort: 0.2, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: true, spa: true, gym: false, freeParking: true }, coordinates: { lat: 38.151, lng: 140.444 } },
    { id: 'zao-mid', name: 'Zao Onsen Hotel', chain: 'independent', starRating: 3, pricePerNight: 190, distanceFromResort: 0.4, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: false, spa: true, gym: false, freeParking: true }, coordinates: { lat: 38.152, lng: 140.445 } },
    { id: 'zao-budget', name: 'Zao Youth Hostel', chain: 'independent', starRating: 3, pricePerNight: 75, distanceFromResort: 0.6, amenities: { skiInSkiOut: false, breakfastIncluded: false, pool: false, spa: false, gym: false, freeParking: true }, coordinates: { lat: 38.153, lng: 140.446 } },
  ],
  'shiga-kogen': [
    { id: 'shiga-lux', name: 'Shiga Kogen Hotel', chain: 'independent', starRating: 4, pricePerNight: 260, distanceFromResort: 0.1, amenities: { skiInSkiOut: true, breakfastIncluded: true, pool: false, spa: true, gym: false, freeParking: true }, coordinates: { lat: 36.752, lng: 138.512 } },
    { id: 'shiga-mid', name: 'Prince Hotel East', chain: 'independent', starRating: 3, pricePerNight: 170, distanceFromResort: 0.2, amenities: { skiInSkiOut: true, breakfastIncluded: true, pool: false, spa: false, gym: false, freeParking: true }, coordinates: { lat: 36.753, lng: 138.513 } },
    { id: 'shiga-budget', name: 'Shiga Lodge', chain: 'independent', starRating: 3, pricePerNight: 90, distanceFromResort: 0.4, amenities: { skiInSkiOut: false, breakfastIncluded: false, pool: false, spa: false, gym: false, freeParking: true }, coordinates: { lat: 36.754, lng: 138.514 } },
  ],
  'nozawa-onsen': [
    { id: 'nozawa-lux', name: 'Nozawa Grand Hotel', chain: 'independent', starRating: 4, pricePerNight: 290, distanceFromResort: 0.2, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: true, spa: true, gym: false, freeParking: true }, coordinates: { lat: 36.922, lng: 138.453 } },
    { id: 'nozawa-mid', name: 'Nozawa Onsen Lodge', chain: 'independent', starRating: 3, pricePerNight: 180, distanceFromResort: 0.3, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: false, spa: true, gym: false, freeParking: true }, coordinates: { lat: 36.923, lng: 138.454 } },
    { id: 'nozawa-budget', name: 'Nozawa Guesthouse', chain: 'independent', starRating: 3, pricePerNight: 85, distanceFromResort: 0.5, amenities: { skiInSkiOut: false, breakfastIncluded: false, pool: false, spa: false, gym: false, freeParking: true }, coordinates: { lat: 36.924, lng: 138.455 } },
  ],
  'myoko-kogen': [
    { id: 'myoko-lux', name: 'Myoko Kogen Hotel', chain: 'independent', starRating: 4, pricePerNight: 310, distanceFromResort: 0.2, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: true, spa: true, gym: false, freeParking: true }, coordinates: { lat: 36.884, lng: 138.101 } },
    { id: 'myoko-mid', name: 'Akakura Onsen Hotel', chain: 'independent', starRating: 3, pricePerNight: 195, distanceFromResort: 0.3, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: false, spa: true, gym: false, freeParking: true }, coordinates: { lat: 36.885, lng: 138.102 } },
    { id: 'myoko-budget', name: 'Myoko Lodge', chain: 'independent', starRating: 3, pricePerNight: 95, distanceFromResort: 0.5, amenities: { skiInSkiOut: false, breakfastIncluded: false, pool: false, spa: false, gym: false, freeParking: true }, coordinates: { lat: 36.886, lng: 138.103 } },
  ],
  'madarao-kogen': [
    { id: 'madarao-lux', name: 'Madarao Kogen Hotel', chain: 'independent', starRating: 3, pricePerNight: 220, distanceFromResort: 0.1, amenities: { skiInSkiOut: true, breakfastIncluded: true, pool: false, spa: true, gym: false, freeParking: true }, coordinates: { lat: 36.867, lng: 138.434 } },
    { id: 'madarao-mid', name: 'Madarao Lodge', chain: 'independent', starRating: 3, pricePerNight: 150, distanceFromResort: 0.2, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: false, spa: false, gym: false, freeParking: true }, coordinates: { lat: 36.868, lng: 138.435 } },
    { id: 'madarao-budget', name: 'Madarao Pension', chain: 'independent', starRating: 3, pricePerNight: 80, distanceFromResort: 0.4, amenities: { skiInSkiOut: false, breakfastIncluded: false, pool: false, spa: false, gym: false, freeParking: true }, coordinates: { lat: 36.869, lng: 138.436 } },
  ],
  // ===== Austrian Independent Resorts =====
  'saalbach-hinterglemm': [
    { id: 'saalbach-lux', name: 'Hotel Saalbacher Hof', chain: 'independent', starRating: 5, pricePerNight: 420, distanceFromResort: 0.1, amenities: { skiInSkiOut: true, breakfastIncluded: true, pool: true, spa: true, gym: true, freeParking: true }, coordinates: { lat: 47.391, lng: 12.64 } },
    { id: 'saalbach-mid', name: 'Hotel Berner', chain: 'independent', starRating: 4, pricePerNight: 260, distanceFromResort: 0.2, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: true, spa: true, gym: false, freeParking: true }, coordinates: { lat: 47.392, lng: 12.641 } },
    { id: 'saalbach-budget', name: 'Pension Hinterglemm', chain: 'independent', starRating: 3, pricePerNight: 130, distanceFromResort: 0.5, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: false, spa: false, gym: false, freeParking: true }, coordinates: { lat: 47.393, lng: 12.642 } },
  ],
  'ischgl': [
    { id: 'ischgl-lux', name: 'Hotel Trofana Royal', chain: 'independent', starRating: 5, pricePerNight: 580, distanceFromResort: 0.1, amenities: { skiInSkiOut: true, breakfastIncluded: true, pool: true, spa: true, gym: true, freeParking: true }, coordinates: { lat: 46.994, lng: 10.294 } },
    { id: 'ischgl-mid', name: 'Hotel Yscla', chain: 'independent', starRating: 4, pricePerNight: 320, distanceFromResort: 0.2, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: true, spa: true, gym: false, freeParking: true }, coordinates: { lat: 46.995, lng: 10.295 } },
    { id: 'ischgl-budget', name: 'Pension Ischgl', chain: 'independent', starRating: 3, pricePerNight: 160, distanceFromResort: 0.4, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: false, spa: false, gym: false, freeParking: true }, coordinates: { lat: 46.996, lng: 10.296 } },
  ],
  'kitzbuhel': [
    { id: 'kitz-lux', name: 'Arlberg Hospiz', chain: 'independent', starRating: 5, pricePerNight: 650, distanceFromResort: 0.2, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: true, spa: true, gym: true, freeParking: true }, coordinates: { lat: 47.446, lng: 12.395 } },
    { id: 'kitz-mid', name: 'Hotel Weisses Rössl', chain: 'independent', starRating: 4, pricePerNight: 380, distanceFromResort: 0.3, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: true, spa: true, gym: false, freeParking: false }, coordinates: { lat: 47.447, lng: 12.396 } },
    { id: 'kitz-budget', name: 'Pension Kitzbühel', chain: 'independent', starRating: 3, pricePerNight: 175, distanceFromResort: 0.5, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: false, spa: false, gym: false, freeParking: true }, coordinates: { lat: 47.448, lng: 12.397 } },
  ],
  'solden': [
    { id: 'solden-lux', name: 'Hotel Bergland', chain: 'independent', starRating: 4, pricePerNight: 340, distanceFromResort: 0.1, amenities: { skiInSkiOut: true, breakfastIncluded: true, pool: true, spa: true, gym: false, freeParking: true }, coordinates: { lat: 46.971, lng: 11.009 } },
    { id: 'solden-mid', name: 'Hotel Tyrol', chain: 'independent', starRating: 3, pricePerNight: 210, distanceFromResort: 0.3, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: false, spa: true, gym: false, freeParking: true }, coordinates: { lat: 46.972, lng: 11.01 } },
    { id: 'solden-budget', name: 'Pension Sölden', chain: 'independent', starRating: 3, pricePerNight: 95, distanceFromResort: 0.5, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: false, spa: false, gym: false, freeParking: true }, coordinates: { lat: 46.973, lng: 11.011 } },
  ],
  'lech-zurs': [
    { id: 'lech-lux', name: 'Hotel Arlberg', chain: 'independent', starRating: 5, pricePerNight: 520, distanceFromResort: 0.1, amenities: { skiInSkiOut: true, breakfastIncluded: true, pool: true, spa: true, gym: true, freeParking: true }, coordinates: { lat: 47.207, lng: 10.166 } },
    { id: 'lech-mid', name: 'Hotel Goldener Berg', chain: 'independent', starRating: 4, pricePerNight: 290, distanceFromResort: 0.2, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: true, spa: true, gym: false, freeParking: true }, coordinates: { lat: 47.208, lng: 10.167 } },
    { id: 'lech-budget', name: 'Pension Lech', chain: 'independent', starRating: 3, pricePerNight: 145, distanceFromResort: 0.4, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: false, spa: false, gym: false, freeParking: true }, coordinates: { lat: 47.209, lng: 10.168 } },
  ],
  'obergurgl-hochgurgl': [
    { id: 'obergurgl-lux', name: 'Hotel Crystal', chain: 'independent', starRating: 4, pricePerNight: 380, distanceFromResort: 0.1, amenities: { skiInSkiOut: true, breakfastIncluded: true, pool: true, spa: true, gym: false, freeParking: true }, coordinates: { lat: 46.867, lng: 11.017 } },
    { id: 'obergurgl-mid', name: 'Hotel Olympia', chain: 'independent', starRating: 3, pricePerNight: 230, distanceFromResort: 0.2, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: false, spa: true, gym: false, freeParking: true }, coordinates: { lat: 46.868, lng: 11.018 } },
    { id: 'obergurgl-budget', name: 'Pension Obergurgl', chain: 'independent', starRating: 3, pricePerNight: 105, distanceFromResort: 0.4, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: false, spa: false, gym: false, freeParking: true }, coordinates: { lat: 46.869, lng: 11.019 } },
  ],
  'mayrhofen': [
    { id: 'mayrhofen-lux', name: 'Hotel Elisabeth', chain: 'independent', starRating: 4, pricePerNight: 320, distanceFromResort: 0.2, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: true, spa: true, gym: true, freeParking: true }, coordinates: { lat: 47.169, lng: 11.866 } },
    { id: 'mayrhofen-mid', name: 'Hotel Neue Post', chain: 'independent', starRating: 3, pricePerNight: 195, distanceFromResort: 0.3, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: false, spa: true, gym: false, freeParking: true }, coordinates: { lat: 47.17, lng: 11.867 } },
    { id: 'mayrhofen-budget', name: 'Pension Mayrhofen', chain: 'independent', starRating: 3, pricePerNight: 90, distanceFromResort: 0.5, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: false, spa: false, gym: false, freeParking: true }, coordinates: { lat: 47.171, lng: 11.868 } },
  ],
  // ===== Additional European Resorts =====
  'courchevel': [
    { id: 'courchevel-lux', name: 'Les Airelles', chain: 'independent', starRating: 5, pricePerNight: 1200, distanceFromResort: 0.1, amenities: { skiInSkiOut: true, breakfastIncluded: true, pool: true, spa: true, gym: true, freeParking: false }, coordinates: { lat: 45.411, lng: 6.635 } },
    { id: 'courchevel-mid', name: 'Hotel Chabichou', chain: 'independent', starRating: 4, pricePerNight: 480, distanceFromResort: 0.2, amenities: { skiInSkiOut: true, breakfastIncluded: true, pool: true, spa: true, gym: false, freeParking: false }, coordinates: { lat: 45.412, lng: 6.636 } },
    { id: 'courchevel-budget', name: 'Hotel Le Pilatus', chain: 'independent', starRating: 3, pricePerNight: 220, distanceFromResort: 0.4, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: false, spa: false, gym: false, freeParking: true }, coordinates: { lat: 45.413, lng: 6.637 } },
  ],
  'cervinia': [
    { id: 'cervinia-lux', name: 'Hotel Cervinia', chain: 'independent', starRating: 4, pricePerNight: 380, distanceFromResort: 0.1, amenities: { skiInSkiOut: true, breakfastIncluded: true, pool: true, spa: true, gym: false, freeParking: true }, coordinates: { lat: 45.938, lng: 7.629 } },
    { id: 'cervinia-mid', name: 'Hotel Bucaneve', chain: 'independent', starRating: 3, pricePerNight: 210, distanceFromResort: 0.3, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: false, spa: true, gym: false, freeParking: true }, coordinates: { lat: 45.939, lng: 7.63 } },
    { id: 'cervinia-budget', name: 'Pension Cervinia', chain: 'independent', starRating: 3, pricePerNight: 95, distanceFromResort: 0.5, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: false, spa: false, gym: false, freeParking: true }, coordinates: { lat: 45.94, lng: 7.631 } },
  ],
  'livigno': [
    { id: 'livigno-lux', name: 'Hotel Livigno', chain: 'independent', starRating: 4, pricePerNight: 290, distanceFromResort: 0.2, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: true, spa: true, gym: false, freeParking: true }, coordinates: { lat: 46.537, lng: 10.139 } },
    { id: 'livigno-mid', name: 'Hotel Lac Salin', chain: 'independent', starRating: 3, pricePerNight: 175, distanceFromResort: 0.3, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: false, spa: true, gym: false, freeParking: true }, coordinates: { lat: 46.538, lng: 10.14 } },
    { id: 'livigno-budget', name: 'Pension Livigno', chain: 'independent', starRating: 3, pricePerNight: 85, distanceFromResort: 0.5, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: false, spa: false, gym: false, freeParking: true }, coordinates: { lat: 46.539, lng: 10.141 } },
  ],
  'alta-badia': [
    { id: 'altabadia-lux', name: 'Hotel Gardena', chain: 'independent', starRating: 4, pricePerNight: 350, distanceFromResort: 0.1, amenities: { skiInSkiOut: true, breakfastIncluded: true, pool: true, spa: true, gym: false, freeParking: true }, coordinates: { lat: 46.554, lng: 11.872 } },
    { id: 'altabadia-mid', name: 'Hotel Col Alto', chain: 'independent', starRating: 3, pricePerNight: 195, distanceFromResort: 0.2, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: false, spa: true, gym: false, freeParking: true }, coordinates: { lat: 46.555, lng: 11.873 } },
    { id: 'altabadia-budget', name: 'Pension Alta Badia', chain: 'independent', starRating: 3, pricePerNight: 90, distanceFromResort: 0.4, amenities: { skiInSkiOut: false, breakfastIncluded: true, pool: false, spa: false, gym: false, freeParking: true }, coordinates: { lat: 46.556, lng: 11.874 } },
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
