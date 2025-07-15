import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Tabs,
  Tab,
  Chip,
  Stack
} from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`sports-tabpanel-${index}`}
      aria-labelledby={`sports-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const sportsCategories = [
  {
    name: 'Football',
    news: [
      {
        title: 'Champions League Final',
        description: 'Exciting match between top European clubs',
        image: 'https://source.unsplash.com/random/800x600/?football'
      },
      {
        title: 'World Cup Qualifiers',
        description: 'National teams battle for qualification',
        image: 'https://source.unsplash.com/random/800x600/?soccer'
      }
    ]
  },
  {
    name: 'Basketball',
    news: [
      {
        title: 'NBA Playoffs',
        description: 'Intense playoff action continues',
        image: 'https://source.unsplash.com/random/800x600/?basketball'
      },
      {
        title: 'FIBA World Cup',
        description: 'International basketball competition',
        image: 'https://source.unsplash.com/random/800x600/?basketball-court'
      }
    ]
  },
  {
    name: 'Tennis',
    news: [
      {
        title: 'Grand Slam Tournament',
        description: 'Top players compete for major titles',
        image: 'https://source.unsplash.com/random/800x600/?tennis'
      },
      {
        title: 'Davis Cup',
        description: 'International team competition',
        image: 'https://source.unsplash.com/random/800x600/?tennis-court'
      }
    ]
  }
];

const Sports = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (_: any, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Sports News
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          {sportsCategories.map((category, index) => (
            <Tab key={index} label={category.name} />
          ))}
        </Tabs>
      </Box>

      {sportsCategories.map((category, index) => (
        <TabPanel key={index} value={selectedTab} index={index}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            {category.news.map((item, newsIndex) => (
              <Card key={newsIndex}>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.title}
                />
                <CardContent>
                  <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    <Chip label={category.name} color="primary" />
                    <Chip label="Latest" color="secondary" />
                  </Stack>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </TabPanel>
      ))}
    </Box>
  );
};

export default Sports; 