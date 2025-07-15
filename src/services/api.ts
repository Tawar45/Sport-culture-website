import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: '/', // Changed from 'http://localhost:3000/api'
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types for our data
export interface Turf {
  id: string;
  name: string;
  city: string;
  sport: string;
  price: number;
  rating: number;
  images: string[];
  availableSlots: {
    date: string;
    timeSlots: string[];
  }[];
  facilities: string[];
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface SearchParams {
  city: string;
  sport: string;
  date: string;
  time: string;
}

// API functions
export const turfApi = {
  // Search turfs based on filters
  searchTurfs: async (params: SearchParams) => {
    const response = await api.get<Turf[]>('/turfs/search', { params });
    return response.data;
  },

  // Get turf details by ID
  getTurfById: async (id: string) => {
    const response = await api.get<Turf>(`/turfs/${id}`);
    return response.data;
  },

  // Get available time slots for a turf
  getAvailableSlots: async (turfId: string, date: string) => {
    const response = await api.get(`/turfs/${turfId}/slots`, {
      params: { date },
    });
    return response.data;
  },

  // Book a turf slot
  bookSlot: async (turfId: string, bookingData: {
    date: string;
    time: string;
    userId: string;
  }) => {
    const response = await api.post(`/turfs/${turfId}/book`, bookingData);
    return response.data;
  },
};

export default api; 