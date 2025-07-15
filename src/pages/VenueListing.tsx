import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Chip,
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

interface Venue {
  id: string;
  name: string;
  city: string;
  sport: string;
  price: number;
  rating: number;
  address: string;
  images: string[];
  availableSlots: string[];
  facilities: string[];
  location: {
    lat: number;
    lng: number;
  };
}

const VenueListing = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedSport, setSelectedSport] = useState(searchParams.get('sport') || 'all');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || 'all');
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs(searchParams.get('date') || undefined));
  const [selectedTime, setSelectedTime] = useState<dayjs.Dayjs | null>(dayjs(searchParams.get('time') || undefined));
  
  const sports = ['all', 'badminton', 'volleyball', 'basketball', 'table-tennis', 'tennis', 'pickleball'];
  const cities = ['Ahmedabad', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune'];

  useEffect(() => {
    fetchVenues();
  }, [selectedSport, selectedCity, selectedDate, selectedTime]);

  const fetchVenues = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedSport !== 'all') params.append('sport', selectedSport);
      if (selectedCity !== 'all') params.append('city', selectedCity);
      if (selectedDate) params.append('date', selectedDate.format('YYYY-MM-DD'));
      if (selectedTime) params.append('time', selectedTime.format('HH:mm'));

      console.log('Fetching with params:', params.toString()); // Debug log
      const response = await fetch(`http://localhost:3000/api/turfs/search?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch venues');
      
      const data = await response.json();
      console.log('Received data:', data); // Debug log
      setVenues(data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching venues:', err); // Debug log
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    fetchVenues();
  };

  const VenueCard = ({ venue }: { venue: Venue }) => {
    return (
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          height="200"
          image={venue.images[0] || 'https://via.placeholder.com/300x200'}
          alt={venue.name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="h2">
            {venue.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {venue.address}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={venue.rating} precision={0.5} readOnly size="small" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({venue.rating})
            </Typography>
          </Box>
          <Typography variant="h6" color="primary" gutterBottom>
            ₹{venue.price}/hour
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            {venue.facilities.map((facility, index) => (
              <Chip key={index} label={facility} size="small" />
            ))}
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sports Venues in {selectedCity === 'all' ? 'All Cities' : selectedCity}
        </Typography>
      </Box>

      {/* Filters */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
          <Box>
            <TextField
              select
              fullWidth
              label="Sport"
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
            >
              <MenuItem value="all">All Sports</MenuItem>
              {sports.filter(sport => sport !== 'all').map((sport) => (
                <MenuItem key={sport} value={sport}>
                  {sport.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box>
            <TextField
              select
              fullWidth
              label="City"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <MenuItem value="all">All Cities</MenuItem>
              {cities.map((city) => (
                <MenuItem key={city} value={city}>{city}</MenuItem>
              ))}
            </TextField>
          </Box>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Box>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Time"
                value={selectedTime}
                onChange={(newValue) => setSelectedTime(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Box>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleFilter}
          >
            Apply Filters
          </Button>
        </Box>
      </Box>

      {/* Results */}
      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : venues.length === 0 ? (
        <Typography>No venues found matching your criteria.</Typography>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {venues.map((venue) => (
            <Box key={venue.id}>
              <VenueCard venue={venue} />
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default VenueListing; 