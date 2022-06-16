import { Box, Card, Center, Container, Grid, Stack, Text } from '@mantine/core';
import Image from 'next/image';

export interface DeviceCardProps {
  deviceId: string;
}

export const DeviceCard = (props: DeviceCardProps) => {
  return (
    <Card shadow="lg" radius="md" withBorder>
      <Grid align="center">
        <Grid.Col xs={4} sm={12} md={4} lg={4} xl={4}>
          <Box
            sx={{
                // width: '50%'
            }}
          >
            <Image
              src="/assets/smartwatch-image.png"
              width="100%"
              height="100%"
              layout="responsive"
              alt="smartwatch-image"
            />
          </Box>
        </Grid.Col>
        <Grid.Col xs={8} sm={12} md={8} lg={8} xl={8}>
          <Text align="center" size="md">
            Device{' '}
            <strong
              style={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {props.deviceId}
            </strong>
          </Text>
        </Grid.Col>
      </Grid>
    </Card>
  );
};
