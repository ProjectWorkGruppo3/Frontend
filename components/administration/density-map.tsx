import { CircleMarker, TileLayer, MapContainer, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Text, Title } from '@mantine/core';

export interface DensityMapData {
  city: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  totalDevices: number;
}

export interface DensityMapProps {
  title: string;
  data: DensityMapData[];
}

const DensityMap = (props: DensityMapProps) => {
  const totalDevices = props.data.reduce(
    (prev, curr) => prev + curr.totalDevices,
    0
  );

  console.log(totalDevices);

  return (
    <>
      <Text align="right" mb="xs" color="gray" size="xs">
        {props.title}
      </Text>
      <MapContainer
        style={{ width: '100%', minHeight: '500px' }}
        zoom={1}
        center={[-0.09, 51.505]}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {props.data.map((city, index) => {
          return (
            <CircleMarker
              key={index}
              center={[city.coordinates.longitude, city.coordinates.latitude]}
              radius={20 * Math.log(city.totalDevices / (totalDevices / 20))}
              fillOpacity={0.5}
              stroke={false}
            >
              <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                <Text>{`${city.city}: ${city.totalDevices} Devices connected`}</Text>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </>
  );
};

export default DensityMap;
