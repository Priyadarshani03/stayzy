import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Autocomplete, Box, Typography, Grid, Paper } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import axios from 'axios';

const LocationSearch = () => {
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCities = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/properties/search/cities?query=${encodeURIComponent(query)}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event, value) => {
    if (value) {
      setLocation(value.city);
      navigate(`/search/all?location=${encodeURIComponent(value.city)}`);
    }
  };

  const handleInputChange = (event, value) => {
    setLocation(value || '');
    fetchCities(value || '');
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', my: 2 }}>
      <Autocomplete
        freeSolo
        options={suggestions}
        value={location}
        onChange={handleSearch}
        onInputChange={handleInputChange}
        loading={loading}
        getOptionLabel={(option) => typeof option === 'string' ? option : option.city}
        renderOption={(props, option) => (
          <li {...props}>
            <Paper elevation={0} sx={{ width: '100%', p: 2 }}>
              <Typography variant="h6" gutterBottom>
                {option.city} ({option.count} hotels)
              </Typography>
              <Grid container spacing={2}>
                {option.hotels.map((hotel) => (
                  <Grid item xs={4} key={hotel.id}>
                    <Box
                      sx={{
                        position: 'relative',
                        height: 100,
                        borderRadius: 1,
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={hotel.image}
                        alt={hotel.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
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
                          p: 1,
                        }}
                      >
                        <Typography variant="caption" noWrap>
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
            </Paper>
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search hotels by city"
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
            }}
          />
        )}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '50px',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        }}
      />
    </Box>
  );
};

export default LocationSearch; 