import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CitySearchResults = ({ cities }) => {
  const navigate = useNavigate();

  const handleCityClick = (city) => {
    navigate(`/search/all?location=${encodeURIComponent(city)}`);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Popular Destinations
      </Typography>
      <Grid container spacing={3}>
        {cities.map((cityData) => (
          <Grid item xs={12} sm={6} md={4} key={cityData.city}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                height: '100%',
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s ease-in-out'
                }
              }}
              onClick={() => handleCityClick(cityData.city)}
            >
              <CardMedia
                component="img"
                height="200"
                image={cityData.hotels[0]?.image || '/placeholder.jpg'}
                alt={cityData.city}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {cityData.city}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {cityData.count} hotels available
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={1}>
                    {cityData.hotels.slice(0, 2).map((hotel) => (
                      <Grid item xs={6} key={hotel.id}>
                        <Box sx={{ position: 'relative', height: 80 }}>
                          <img
                            src={hotel.image}
                            alt={hotel.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: '4px'
                            }}
                          />
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              bgcolor: 'rgba(0,0,0,0.5)',
                              color: 'white',
                              p: 0.5,
                              fontSize: '0.75rem'
                            }}
                          >
                            <Typography noWrap variant="caption">
                              {hotel.title}
                            </Typography>
                            <Typography variant="caption" display="block">
                              ₹{hotel.price}/night
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CitySearchResults; 