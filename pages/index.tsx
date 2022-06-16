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
  DeviceCardProps
} from '../components/home/index'

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

  const testDevice : DeviceCardProps[] = [
    { deviceId: '3f7f795e-773e-44a4-a52e-9bdac7b0540f' },
    { deviceId: '343fcdf2-fe6e-4615-9f4b-a69e3b6fee8e' },
    { deviceId: 'd3d47010-a79c-45db-a1d1-43aba3e60188' },
    { deviceId: '75e32fd1-e3f2-421a-a26d-58c3d1a7865f' },
    { deviceId: 'f0adbd7e-d2aa-4f66-a1e5-3f6c7489329b' },
    { deviceId: '5d1c0537-8cf3-4ca2-b33a-63f3fff65d5c' },
  ]



  return (
    <Box
      p='xl'
    >
      <Title>Welcome, Select the device:</Title>
      <Divider mb='md' />
      <Grid>
        {
          testDevice.map((el, index) => (
            <Grid.Col
              xs={12}
              sm={6}
              md={6} 
              lg={3} 
              xl={3}
              key={index}>
              <DeviceCard deviceId={el.deviceId} />
            </Grid.Col>
          ))
        }
      </Grid>
    </Box>
  );
};

export default Home;
