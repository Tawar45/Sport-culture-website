import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { turfApi, type Turf, type SearchParams } from '../services/api';
import styles from './TurfList.module.css';

const TurfList = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [turfs, setTurfs] = useState<Turf[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cities = [
    'Ahmedabad',
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Chennai',
    'Hyderabad',
    'Kolkata',
    'Pune',
  ];

  const sports = [
    'Pickleball',
    'Tennis',
    'Table Tennis',
    'Basketball',
    'Volleyball',
    'Badminton',
  ];

  useEffect(() => {
    const fetchTurfs = async () => {
      if (!selectedCity || !selectedSport || !selectedDate) return;

      try {
        setLoading(true);
        setError(null);
        const searchParams: SearchParams = {
          city: selectedCity,
          sport: selectedSport,
          date: selectedDate.format('YYYY-MM-DD'),
          time: selectedDate.format('HH:mm'), // Using current time as default
        };
        const data = await turfApi.searchTurfs(searchParams);
        setTurfs(data);
      } catch (err) {
        setError('Failed to fetch turfs. Please try again.');
        console.error('Error fetching turfs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTurfs();
  }, [selectedCity, selectedSport, selectedDate]);

  return (
    <Container maxWidth="lg" className={styles.container}>
      {/* Filter Bar */}
      <Box className={styles.filterBar}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
          <Box>
            <FormControl fullWidth>
              <InputLabel>City</InputLabel>
              <Select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                label="City"
              >
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControl fullWidth>
              <InputLabel>Sport</InputLabel>
              <Select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                label="Sport"
              >
                {sports.map((sport) => (
                  <MenuItem key={sport} value={sport}>
                    {sport}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                sx={{ width: '100%' }}
              />
            </LocalizationProvider>
          </Box>
        </Box>
      </Box>

      {/* Loading State */}
      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}

      {/* No Results State */}
      {!loading && !error && turfs.length === 0 && selectedCity && selectedSport && selectedDate && (
        <Alert severity="info" sx={{ my: 2 }}>
          No turfs found matching your criteria.
        </Alert>
      )}

      {/* Turf Cards */}
      <Box className={styles.turfCards}>
        {turfs.map((turf) => (
          <Card key={turf.id} className={styles.turfCard}>
            <CardMedia
              component="img"
              height="200"
              image={turf.images[0]}
              alt={turf.name}
              className={styles.cardImage}
            />
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                {turf.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {turf.city}
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                ₹{turf.price}/hour
              </Typography>
              <Box className={styles.facilities}>
                {turf.facilities.map((facility) => (
                  <span key={facility} className={styles.facilityChip}>
                    {facility}
                  </span>
                ))}
              </Box>
              <Button
                variant="contained"
                fullWidth
                component={Link}
                to={`/turf/${turf.id}`}
                className={styles.viewDetailsButton}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default TurfList; 