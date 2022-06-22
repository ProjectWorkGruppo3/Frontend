import { Box, Center, Grid, Loader } from '@mantine/core';
import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import {
  DeviceCard,
  NewDeviceCard,
  NewDeviceModal
} from '../components/home/index';
import { useAuth } from '../context/auth-context';

import 'react-toastify/dist/ReactToastify.css';
import {
  CardFadeIn,
  FadeInDiv,
  RootAnimationDiv,
  StaggerDiv
} from '../animations';
import { Header, NotificationToast } from '../components/common';
import { Device } from '../models';
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
    if (auth && auth.isAuthenticated()) {
      setLoading(false);
    } else {
      router.push('/login');
    }
  }, [auth, router]);

  useEffect(() => {
    const fetchDevices = async () => {
      if (auth && auth.authState) {

        console.log("TOKEN", auth.authState.token)
        
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
  }, [auth, devices]);

  const onNewDeviceSubmit = async (name: string, id: string) => {
    console.log(name, id);

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
      notifySuccess(`(${name}) added`);
    }

    setNewDeviceModalOpened(false);
    setDevices([])
  };

  if (loading) {
    return (
      <Center my="xl">
        <Loader />
      </Center>
    );
  }

  return (
    <RootAnimationDiv>
      <StaggerDiv>
        <Box p="xl" mb="md">
          <NewDeviceModal
            opened={newDeviceModalOpened}
            onSubmit={onNewDeviceSubmit}
            onClose={() => setNewDeviceModalOpened(false)}
          />
          <FadeInDiv>
            <Header
              title={`Welcome ${
                auth!.authState!.user.name
              }, select the device:`}
              onLogout={() => {
                setLoading(true);
                auth!.setAuthState(null);
              }}
            />
          </FadeInDiv>
          <FadeInDiv>
            <Grid align="center">
              {devices.map((el, index) => (
                <Grid.Col xs={12} sm={6} md={4} lg={2} xl={2} key={index}>
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
        </Box>

        <NotificationToast />
      </StaggerDiv>
    </RootAnimationDiv>
  );
};

export default Home;
