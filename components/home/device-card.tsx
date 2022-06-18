import { ActionIcon, Box, Card, Grid, Text } from '@mantine/core';
import Image from 'next/image';
import { Device } from '../../models';
import { MdArrowForwardIos } from 'react-icons/md';
import { useState } from 'react';
import Link from 'next/link';

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
        shadow="lg"
        radius="md"
        withBorder
        sx={{
          backgroundColor: isHover ? '#d3d3d3' : 'white',
          borderColor: isHover ? '#bebebe' : 'white',
          cursor: isHover ? 'pointer' : 'default',
        }}
        // onMouseOver={onMouseOver} FIXME
        // onMouseOut={onMouseOut}
      >
        <Grid align="center">
          <Grid.Col px="0" xs={4} sm={12} md={4} lg={4} xl={3}>
            <Box
              sx={{
                width: '70%',
              }}
            >
              <Image
                src="/assets/device.png"
                width="100%"
                height="100%"
                layout="responsive"
                alt="device-image"
              />
            </Box>
          </Grid.Col>
          <Grid.Col px="0" xs={7} sm={11} md={6} lg={7} xl={8}>
            <Text align="left" size="md" weight="bold">
              {props.device.name}
            </Text>
          </Grid.Col>
          <Grid.Col px="0" xs={1} sm={1} md={1} lg={1} xl={1}>
            <Text align="left" size="md" weight="bold">
              <MdArrowForwardIos />
            </Text>
          </Grid.Col>
        </Grid>
      </Card>
    </Link>
  );
};
