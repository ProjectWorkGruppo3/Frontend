import { Box, Center, Grid, Title } from '@mantine/core';
import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import {
  DeviceCard,
  NewDeviceCard,
  NewDeviceModal,
} from '../components/home/index';
import { useAuth } from '../context/auth-context';

import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';
import {
  CardFadeIn,
  EaseInOutDiv,
  FadeInDiv,
  Floating,
  StaggerDiv,
} from '../animations';
import {
  CircularLoading,
  Header,
  NotificationToast,
} from '../components/common';
import { Device } from '../models/device';
import DeviceService from '../services/device-service';
import { notifyError, notifySuccess } from '../utils/notify-toast';

const Home: NextPage = () => {
  const auth = useAuth();
  const router = useRouter();

  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [newDeviceModalOpened, setNewDeviceModalOpened] =
    useState<boolean>(false);

  useEffect(() => {
    if (!auth || !auth.isAuthenticated()) {
      router.push('/login');
    }
  }, [auth, router]);

  useEffect(() => {
    const fetchDevices = async () => {
      if (auth && auth.authState) {
        if (auth.authState.user.roles.includes('Admin')) {
          await router.push(auth.authState!.homepage);
          return setLoading(false);
        }
        const { data: devices, error } = await DeviceService.getDevices({
          token: auth.authState.token,
          userId: auth.authState.user.id,
        });

        if (error) {
          notifyError(
            error['message'] ??
              'Sorry, but something wrong happened. Retry later'
          );
        } else {
          setDevices(devices);
        }

        setLoading(false);
      }
    };

    fetchDevices();
  }, [loading, auth]);

  const onNewDeviceSubmit = async (name: string, id: string) => {
    const { data: added, error } = await DeviceService.addNewDevice({
      name: name,
      id: id,
      token: auth!.authState!.token,
    });

    if (error) {
      notifyError(
        error['message'] ?? 'Sorry, but something wrong happened. Retry later'
      );
    } else {
      notifySuccess(`${name} added`);
      setDevices((prev) => [...prev, { name: name, deviceId: id }]);
    }

    setNewDeviceModalOpened(false);
  };

  if (loading) {
    return (
      <Center my="xl">
        <CircularLoading />
      </Center>
    );
  }

  return (
    <StaggerDiv>
      <Box sx={{ width: '100%', height: '100vh' }} p={0}>
        <Head>
          <title>SerenUp</title>
          <meta name="description" content="Seren Up Web App" />
          <link rel="icon" href="/assets/logo.png" />
        </Head>
        <NewDeviceModal
          opened={newDeviceModalOpened}
          onSubmit={onNewDeviceSubmit}
          onClose={() => setNewDeviceModalOpened(false)}
        />
        <Grid sx={{ width: '100%', height: '100%' }} m={0}>
          <Grid.Col span={4} p={0}>
            <Box
              sx={{
                backgroundColor: 'var(--fi-color)',
                height: '100%',
              }}
              p="lg"
              mb="xl"
            >
              <EaseInOutDiv>
                <Title order={3}>Seren-Up</Title>
                <Center>
                  <Floating>
                    <Box py="xl">
                      <img src="/assets/person.png" alt="illustration-image" />
                    </Box>
                  </Floating>
                </Center>
              </EaseInOutDiv>
            </Box>
          </Grid.Col>
          <Grid.Col span={8} p="xl">
            <FadeInDiv>
              <Header
                title={`Welcome back, ${auth!.authState!.user.name}`}
                profile={true}
                onLogout={() => {
                  setLoading(true);
                  auth!.setAuthState(null);
                }}
              />
            </FadeInDiv>
            <FadeInDiv>
              <Grid align="center">
                {devices.map((el, index) => (
                  <Grid.Col xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
                    <CardFadeIn>
                      <DeviceCard device={el} />
                    </CardFadeIn>
                  </Grid.Col>
                ))}
                <Grid.Col xs={12} sm={1} md={1} lg={1} xl={1}>
                  <CardFadeIn>
                    <NewDeviceCard
                      onClick={() => setNewDeviceModalOpened(true)}
                    />
                  </CardFadeIn>
                </Grid.Col>
              </Grid>
            </FadeInDiv>
          </Grid.Col>
        </Grid>
      </Box>

      <NotificationToast />
    </StaggerDiv>
  );
};

export default Home;
