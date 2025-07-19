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
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL; // For Vite

interface Venue {
  id: string;
  name: string;
  city: string;
  sport: string;
  price: number;
  rating: number;
  address: string;
  images: string[];
  imageUrl: string;
  availableSlots: string[];
  facilities: string[];
  location: {
    lat: number;
    lng: number;
  };
  amenityNames: { id: number; name: string }[]; // <-- Add this line
}

const VenueListing = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
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

      const response = await fetch(`${API_URL}/api/ground/list`);
      if (!response.ok) throw new Error('Failed to fetch venues');      
      const data = await response.json();
      setVenues(data.grounds);
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
  const viewDetails = (id:any) =>{
    navigate(`/venues/${id}`);
  }

  const VenueCard = ({ venue }: { venue: Venue }) => {
    return (
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          height="200"
          image={venue?.imageUrl}
          alt={venue?.name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="h2">
            {venue?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {venue?.address}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={venue?.rating} precision={0.5} readOnly size="small" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({venue?.rating ?  venue?.rating :'0'})
            </Typography>
          </Box>
          <Typography variant="h6" color="primary" gutterBottom>
            ₹{venue?.price}/hour
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            {venue?.amenityNames.map((amenities) => (
              <Chip key={amenities?.id} label={amenities?.name} size="small" />
            ))}
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth  
            onClick={() => viewDetails(venue.id)}
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