import { AnalysisStatCard } from '@components/administration';
import { CircularLoading, Header } from '@components/common';
import {
  RemoteDeviceStatsChart,
  StateCard,
  TotalAlarmCard,
} from '@components/dashboard';
import { Box, Center, Divider, Grid, Title } from '@mantine/core';
import { EaseInOutDiv, FadeInDiv, Floating, StaggerDiv } from 'animations';
import { useAuth } from 'context/auth-context';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import DeviceService from 'services/device-service';
import { GeneralDeviceData } from 'types/services/device-service';
import { notifyError } from 'utils/notify-toast';

const PositionComponent = dynamic(
  () => import('components/dashboard/position-card'),
  { ssr: false }
);

const Dashboard: NextPage = () => {
  const auth = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<GeneralDeviceData>();
  const [chart, setChart] = useState<string>();

  useEffect(() => {
    if (!auth || !auth.isAuthenticated()) {
      router.push('/login');
    }
  }, [auth, router]);

  const fetchNew = useCallback(async () => {
    if (auth && auth.authState) {
      const { id } = router.query;

      const { data, error } = await DeviceService.getGeneralDeviceData({
        token: auth.authState.token,
        deviceId: id as string,
      });

      if (data) {
        setData(data);
      }
    }
  }, [auth, router.query]);

  useEffect(() => {
    const fetchDevices = async () => {
      if (auth && auth.authState) {
        if (auth.authState.user.roles.includes('Admin')) {
          await router.push(auth.authState!.homepage);
          return setLoading(false);
        }

        const { id } = router.query;

        const { data: generalData, error } =
          await DeviceService.getGeneralDeviceData({
            token: auth.authState.token,
            deviceId: id as string,
          });

        console.log(error);

        // FIXME
        // if (error?.code === 'ERR_BAD_REQUEST') {
        //   await router.push('/404');
        // }

        if (error) {
          notifyError(
            error['message'] ??
              'Sorry, but something wrong happened. Retry later'
          );
        } else {
          setData(generalData!);
          setChart(generalData!.analysis[0].name);
        }

        setLoading(false);
      }
    };

    fetchDevices();

    const intervalFetch = setInterval(() => {
      fetchNew();
    }, 5000);

    return () => {
      clearInterval(intervalFetch);
    };
  }, [loading, auth, fetchNew, router]);

  return (
    <StaggerDiv>
      <Box sx={{ width: '100%', height: '100vh' }} p={0}>
        <Head>
          <title>SerenUp</title>
          <meta name="description" content="Seren Up Web App" />
          <link rel="icon" href="/assets/logo.png" />
        </Head>

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
                      <img
                        src="/assets/dashboard.png"
                        alt="illustration-image"
                      />
                    </Box>
                  </Floating>
                </Center>
              </EaseInOutDiv>
            </Box>
          </Grid.Col>
          {loading && <CircularLoading />}
          {!loading && data && (
            <Grid.Col span={8} p="xl">
              <FadeInDiv>
                <Header
                  title={`${auth!.authState!.user.name} Health`}
                  profile={true}
                  onLogout={() => {
                    setLoading(true);
                    auth!.setAuthState(null);
                  }}
                  onBack={() => router.push('/')}
                />
              </FadeInDiv>

              <Box mb="sm">
                <EaseInOutDiv>
                  <Grid>
                    <Grid.Col span={3}>
                      {data.analysis.map((el, index) => (
                        <Box mb="sm" key={index}>
                          <AnalysisStatCard
                            title={el.name}
                            value={el.value}
                            trending={el.trend}
                            onClick={() => setChart(el.name)}
                          />
                        </Box>
                      ))}
                    </Grid.Col>
                    <Grid.Col span={9} p="lg">
                      {chart ? (
                        <RemoteDeviceStatsChart
                          token={auth!.authState!.token}
                          title={chart}
                          deviceId={router.query.id as string}
                          dataKey={chart}
                        />
                      ) : (
                        <Title order={3}>Select a card</Title>
                      )}
                    </Grid.Col>
                  </Grid>
                </EaseInOutDiv>
              </Box>

              <FadeInDiv>
                <Box mb="md">
                  <Center>
                    <Divider sx={{ width: '80%' }} />
                  </Center>
                </Box>
              </FadeInDiv>
              <FadeInDiv>
                <Grid>
                  <Grid.Col span={4}>
                    <StateCard state={data.lastState} />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Box
                      sx={{
                        height: '100%',
                      }}
                    >
                      <PositionComponent
                        latitude={data.lastLocation.latitude}
                        longitude={data.lastLocation.longitude}
                      />
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TotalAlarmCard
                      total={data.totalAlarms}
                      onClick={() => {
                        const { id } = router.query;

                        if (id) {
                          router.push(`/devices/${id}/alarms`);
                        }
                      }}
                    />
                  </Grid.Col>
                </Grid>
              </FadeInDiv>
            </Grid.Col>
          )}
        </Grid>
      </Box>
    </StaggerDiv>
  );
};

export default Dashboard;
