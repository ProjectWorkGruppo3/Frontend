import { Card, Center, Divider, Title } from '@mantine/core';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
});
L.Marker.prototype.options.icon = DefaultIcon;
export interface PositionCardProps {
  latitude: number;
  longitude: number;
}

const PositionCard = (props: PositionCardProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const onMouseOver = () => setIsHover(true);
  const onMouseOut = () => setIsHover(false);

  const position: LatLngExpression = [props.latitude, props.longitude];
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
        height: '100%',
      }}
    >
      <Title order={3} align="center" mb="xs">
        Last Position
      </Title>
      <Center mb="xs">
        <Divider sx={{ width: '40%' }} />
      </Center>
      <MapContainer
        style={{ width: '100%', height: '10%', minHeight: '150px' }}
        zoom={10}
        center={position}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>{`Your position: ${position}`}</Popup>
        </Marker>
      </MapContainer>
    </Card>
  );
};

export default PositionCard;
