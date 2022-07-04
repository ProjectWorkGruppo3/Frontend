import { Box, Card, Grid, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Device } from '../../models';

export interface DeviceCardProps {
  device: Device;
}

export const DeviceCard = (props: DeviceCardProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const onMouseOver = () => setIsHover(true);
  const onMouseOut = () => setIsHover(false);

  return (
    <Link href={`/devices/${props.device.deviceId}`}>
      <Card
        shadow={isHover ? 'xl' : 'sm'}
        radius="md"
        withBorder
        sx={{
          color: isHover ? 'white' : 'dark',
          backgroundColor: isHover ? 'var(--p-color)' : 'white',
          borderColor: isHover ? 'var(--p-color)' : 'white',
          cursor: isHover ? 'pointer' : 'default',
          transition: '0.4s',
        }}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        <Grid align="center">
          <Grid.Col px="0" xs={4} sm={12} md={5} lg={4} xl={3}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Image
                src="/assets/device.png"
                width="100%"
                height="100%"
                alt="device-image"
              />
            </Box>
          </Grid.Col>
          <Grid.Col px="0" xs={8} sm={12} md={7} lg={8} xl={9}>
            <Text align="center" size="md" weight="bold">
              {props.device.name}
            </Text>
          </Grid.Col>
        </Grid>
      </Card>
    </Link>
  );
};
