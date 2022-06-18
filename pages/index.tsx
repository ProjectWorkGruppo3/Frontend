import {
  ActionIcon,
  Box,
  Center,
  Divider,
  Grid,
  Group,
  Loader,
  Title,
} from '@mantine/core';
import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../context/auth-context';
import {
  DeviceCard,
  NewDeviceCard,
  NewDeviceModal,
} from '../components/home/index';

import { Device } from '../models';
import apiService from '../services/api-service';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdExitToApp } from 'react-icons/md';

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

  const notify = (message: string, options: ToastOptions) =>
    toast(message, options);

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
          notify(
            error['message'] ??
              'Sorry, but something wrong happened. Retry later',
            {
              type: 'error',
            }
          );
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDevices();
  }, [auth]);

  const onNewDeviceSubmit = async (name: string, id: string) => {
    console.log(name, id);

    try {
      await apiService.addNewDevice({
        name: name,
        id: id,
        token: auth!.authState!.token,
      });

      notify(`Successfully added device (${name}) `, {
        type: 'success',
      });
    } catch (error: any) {
      notify(
        error['message'] ?? 'Sorry, but something wrong happened. Retry later',
        {
          type: 'error',
        }
      );
    } finally {
      setNewDeviceModalOpened(false);
    }
  };

  if (loading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  return (
    <>
      <Box p="xl" mb="md">
        <NewDeviceModal
          opened={newDeviceModalOpened}
          onSubmit={onNewDeviceSubmit}
          onClose={() => setNewDeviceModalOpened(false)}
        />
        <Grid>
          <Grid.Col span={10}>
            <Title order={2}>
              Welcome {auth!.authState!.user.email}, select the device:
            </Title>
          </Grid.Col>
          <Grid.Col span={2}>
            <Group position="right">
              <ActionIcon
                color="dark"
                onClick={() => {
                  setLoading(true);
                  auth!.setAuthState(null);
                }}
              >
                <MdExitToApp size={24} />
              </ActionIcon>
            </Group>
          </Grid.Col>
        </Grid>
        <Divider mb="md" />
        <Grid align='center'>
          {devices.map((el, index) => (
            <Grid.Col xs={12} sm={6} md={4} lg={2} xl={2} key={index}>
              <DeviceCard device={el} />
            </Grid.Col>
          ))}
          <Grid.Col xs={12} sm={1} md={1} lg={1} xl={1}>
            <NewDeviceCard onClick={() => setNewDeviceModalOpened(true)} />
          </Grid.Col>
        </Grid>
      </Box>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Home;
