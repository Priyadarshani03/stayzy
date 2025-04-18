import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import ListingCard from './ListingCard';
import CitySearchResults from './CitySearchResults';
import axios from 'axios';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cities, setCities] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchLocation = searchParams.get('location');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch city data with hotel images
        const citiesResponse = await axios.get('/api/listings/search/cities-with-hotels');
        setCities(citiesResponse.data);

        // Fetch listings based on search parameters
        const response = await axios.get(`/api/listings/search/all${location.search}`);
        setListings(response.data);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {!searchLocation && <CitySearchResults cities={cities} />}
      
      {searchLocation && (
        <Typography variant="h5" gutterBottom>
          Hotels in {searchLocation}
        </Typography>
      )}

      {listings.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 4, textAlign: 'center' }}>
          No listings found in {searchLocation || 'this location'}. Try adjusting your search criteria.
        </Typography>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3, mt: 4 }}>
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Listings;
