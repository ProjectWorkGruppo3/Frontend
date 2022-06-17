import { Box, Divider, Grid, Loader, Title } from '@mantine/core';
import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../context/auth-context';
import {
  DeviceCard,
  DeviceCardProps,
  NewDeviceCard,
} from '../components/home/index';

const Home: NextPage = () => {
  const auth = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (auth && auth.isAuthenticated()) {
      router.push('/');

      setLoading(false);
    } else {
      router.push('/login');
    }
  }, [auth, router]);

  if (loading) {
    return <Loader />;
  }

  const testDevice: DeviceCardProps[] = [
    {
      device: {
        name: 'Device 1',
        deviceId: '3f7f795e-773e-44a4-a52e-9bdac7b0540f',
      },
    },
    {
      device: {
        name: 'Device 2',
        deviceId: 'd3d47010-a79c-45db-a1d1-43aba3e60188',
      },
    },
    {
      device: {
        name: 'Device 3',
        deviceId: 'f0adbd7e-d2aa-4f66-a1e5-3f6c7489329b',
      },
    },
  ];

  return (
    <Box p="xl">
      <Title>Welcome User, Select the device:</Title>
      <Divider mb="md" />
      <Grid>
        {testDevice.map((el, index) => (
          <Grid.Col xs={12} sm={6} md={4} lg={2} xl={2} key={index}>
            <DeviceCard {...el} />
          </Grid.Col>
        ))}
        <Grid.Col xs={12} sm={6} md={4} lg={2} xl={2}>
          <NewDeviceCard />
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default Home;
