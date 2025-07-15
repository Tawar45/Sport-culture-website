import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  MenuItem,
  Stack,
  Alert,
  Snackbar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
// import { turfApi } from '../services/api';
import type { SearchParams } from '../services/api';

const HeroContainer = styled(Box)(() => ({
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/turf-background.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '500px',
  display: 'flex',
  alignItems: 'center',
  color: 'white',
}));

const SearchContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}));

const sports = [
  'Football',
  'Cricket',
  'Tennis',
  'Basketball',
  'Badminton',
];

const HeroBanner = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [sport, setSport] = useState('');
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [time, setTime] = useState<dayjs.Dayjs | null>(dayjs());
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city || !sport || !date || !time) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const searchParams: SearchParams = {
        city,
        sport,
        date: date.format('YYYY-MM-DD'),
        time: time.format('HH:mm'),
      };

      // Store search params in localStorage for the results page
      localStorage.setItem('searchParams', JSON.stringify(searchParams));
      
      // Navigate to search results page
      navigate('/search-results');
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HeroContainer>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={4}>
          <Typography variant="h2" component="h1" gutterBottom>
            Book Your Perfect Turf
          </Typography>
          <Typography variant="h5">
            Find and book sports facilities in your city
          </Typography>
        </Box>

        <SearchContainer>
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
                error={!!error && !city}
                helperText={error && !city ? 'City is required' : ''}
              />
              <TextField
                fullWidth
                select
                label="Sport"
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                error={!!error && !sport}
                helperText={error && !sport ? 'Sport is required' : ''}
              >
                {sports.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  sx={{ width: '100%' }}
                />
                <TimePicker
                  label="Time"
                  value={time}
                  onChange={(newValue) => setTime(newValue)}
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>
            </Stack>

            <Button
              variant="contained"
              size="large"
              startIcon={<SearchIcon />}
              onClick={handleSearch}
              sx={{ py: 1.5 }}
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search Turfs'}
            </Button>
          </Stack>
        </SearchContainer>
      </Container>

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </HeroContainer>
  );
};

export default HeroBanner; 