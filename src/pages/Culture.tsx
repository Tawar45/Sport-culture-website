import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Stack,
  Divider
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const culturalEvents = [
  {
    title: 'International Film Festival',
    description: 'A celebration of cinema from around the world',
    date: 'June 15-20, 2024',
    location: 'City Center',
    image: 'https://source.unsplash.com/random/800x600/?film-festival',
    category: 'Film'
  },
  {
    title: 'Music Festival',
    description: 'Three days of live music and performances',
    date: 'July 5-7, 2024',
    location: 'Central Park',
    image: 'https://source.unsplash.com/random/800x600/?music-festival',
    category: 'Music'
  },
  {
    title: 'Art Exhibition',
    description: 'Contemporary art showcase featuring local artists',
    date: 'August 1-30, 2024',
    location: 'Modern Art Museum',
    image: 'https://source.unsplash.com/random/800x600/?art-exhibition',
    category: 'Art'
  },
  {
    title: 'Theater Festival',
    description: 'Classic and modern plays from renowned theaters',
    date: 'September 10-25, 2024',
    location: 'City Theater',
    image: 'https://source.unsplash.com/random/800x600/?theater',
    category: 'Theater'
  }
];

const Culture = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Cultural Events
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        {culturalEvents.map((event, index) => (
          <Card key={index}>
            <CardMedia
              component="img"
              height="240"
              image={event.image}
              alt={event.title}
            />
            <CardContent>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Chip label={event.category} color="primary" />
                <Chip label="Upcoming" color="secondary" />
              </Stack>
              
              <Typography gutterBottom variant="h5" component="h2">
                {event.title}
              </Typography>
              
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {event.description}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarTodayIcon color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {event.date}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnIcon color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {event.location}
                  </Typography>
                </Box>
              </Stack>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Get Tickets
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Culture; 