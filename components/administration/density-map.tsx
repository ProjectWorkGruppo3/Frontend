import { Text } from '@mantine/core';
import 'leaflet/dist/leaflet.css';
import { GeolocalizationValue } from 'models/daily-statistics';
import { CircleMarker, MapContainer, TileLayer, Tooltip } from 'react-leaflet';

export interface DensityMapProps {
  title: string;
  data: GeolocalizationValue[];
}

const DensityMap = (props: DensityMapProps) => {
  const totalDevices = props.data.reduce((prev, curr) => prev + curr.total, 0);

  const safeData = props.data.map((el): GeolocalizationValue => {
    return {
      total: el.total,
      longitude: parseFloat(el.longitude.toFixed(4)),
      latitude: parseFloat(el.latitude.toFixed(4)),
    };
  });

  const getRadius = (n: number): number => {
    if (n === 0) return 0;

    return 20 * Math.log(n / (totalDevices / 20));
  };

  return (
    <>
      <Text align="right" mb="xs" color="gray" size="xs">
        {props.title}
      </Text>
      <MapContainer
        style={{ width: '100%', minHeight: '200px' }}
        /* @ts-ignore */
        zoom={1}
        center={[-0.09, 51.505]}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {safeData.map((city, index) => {
          return (
            <CircleMarker
              key={index}
              center={[city.latitude, city.longitude]}
              /* @ts-ignore */
              radius={getRadius(city.total)}
              fillOpacity={0.5}
              stroke={false}
            >
              {/* @ts-ignore */}
              <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                <Text>{`${city.total} Devices connected`}</Text>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </>
  );
};

export default DensityMap;
