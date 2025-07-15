import { useEffect, useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Rating,
  Box,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { turfApi, type Turf } from '../services/api';

const SearchResults = () => {
  const [results, setResults] = useState<Turf[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const searchParams = JSON.parse(localStorage.getItem('searchParams') || '{}');
        const data = await turfApi.searchTurfs(searchParams);
        setResults(data);
      } catch (err) {
        setError('Failed to fetch search results. Please try again.');
        console.error('Search results error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (results.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="info">No turfs found matching your search criteria.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Search Results
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
        {results.map((turf) => (
          <Card key={turf.id}>
            <CardMedia
              component="img"
              height="200"
              image={turf.images[0]}
              alt={turf.name}
            />
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                {turf.name}
              </Typography>
              <Box display="flex" alignItems="center" mb={1}>
                <Rating value={turf.rating} precision={0.5} readOnly />
                <Typography variant="body2" color="text.secondary" ml={1}>
                  ({turf.rating})
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {turf.city}
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                ₹{turf.price}/hour
              </Typography>
              <Box mb={2}>
                {turf.facilities.map((facility) => (
                  <Chip
                    key={facility}
                    label={facility}
                    size="small"
                    sx={{ mr: 0.5, mb: 0.5 }}
                  />
                ))}
              </Box>
              <Button
                variant="contained"
                fullWidth
                onClick={() => window.location.href = `/turf/${turf.id}`}
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

export default SearchResults; 