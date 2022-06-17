import {
  Alert,
  Box,
  Center,
  Container,
  Divider,
  Grid,
  Loader,
  Text,
  Title,
} from '@mantine/core';
import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../context/auth-context';
import { DeviceCard, NewDeviceCard } from '../components/home/index';
import { AiFillAlert } from 'react-icons/ai';

import { Device } from '../models';
import apiService from '../services/api-service';

const Home: NextPage = () => {
  const auth = useAuth();
  const router = useRouter();

  const [devices, setDevices] = useState<Device[]>([]);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (auth && auth.isAuthenticated()) {
      router.push('/');

      setLoading(false);
    } else {
      router.push('/login');
    }
  }, [auth, router]);

  useEffect(() => {
    const fetchDevices = async () => {
      if (auth && auth.authState) {
        try {
          const devices = await apiService.getDevices({
            token: auth.authState.token,
            userId: auth.authState.user.id,
          });

          setDevices(devices);
        } catch (error: any) {
          setError(
            error['message'] ??
              'Sorry, but something wrong happened. Retry later'
          );
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDevices();
  }, [auth]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box p="xl">
      <Title>Welcome {auth!.authState!.user.email}, Select the device:</Title>
      <Divider mb="md" />
      {error && (
        <Center>
          <Container>
            <Alert color="red" icon={<AiFillAlert size={16} />}>
              <Text>{error}</Text>
            </Alert>
          </Container>
        </Center>
      )}
      <Grid>
        {devices.map((el, index) => (
          <Grid.Col xs={12} sm={6} md={4} lg={2} xl={2} key={index}>
            <DeviceCard device={el} />
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
