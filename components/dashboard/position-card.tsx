import { Card, Center, Divider, Title } from '@mantine/core';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export interface PositionCardProps {
  latitude: number;
  longitude: number;
}

const PositionCard = (props: PositionCardProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const onMouseOver = () => setIsHover(true);
  const onMouseOut = () => setIsHover(false);

  const position = [props.latitude, props.longitude];

  return (
    <Card
      shadow={isHover ? 'xl' : 'sm'}
      radius="md"
      p="sm"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      sx={{
        transition: '0.2s',
        width: '100%',
        height: '70%',
      }}
    >
      <Title order={3} align="center" mb="xs">
        Last Position
      </Title>
      <Center mb="xs">
        <Divider sx={{ width: '40%' }} />
      </Center>
      <MapContainer
        style={{ width: '100%', height: '100%', minHeight: '150px' }}
        /* @ts-ignore */
        zoom={10}
        center={position}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>Device last position.</Popup>
        </Marker>
      </MapContainer>
    </Card>
  );
};

export default PositionCard;
