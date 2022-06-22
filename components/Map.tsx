import { Box, Text } from '@mantine/core';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import React from 'react';

export default function Map() {
  console.log('API KEY: ', process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });
  return (
    <Box style={{ width: '500px', height: '20vh' }}>
      {isLoaded ? (
        <GoogleMap zoom={10} center={{ lat: 44, lng: -80 }} />
      ) : (
        <Text>Not loaded!</Text>
      )}
    </Box>
  );
}
