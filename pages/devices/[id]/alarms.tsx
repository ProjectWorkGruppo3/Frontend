import { CircularLoading, Header } from '@components/common';
import { AlarmCard } from '@components/dashboard';
import { Box, Center, Grid, Title } from '@mantine/core';
import {
  CardFadeIn,
  EaseInOutDiv,
  FadeInDiv,
  Floating,
  StaggerDiv
} from 'animations';
import { useAuth } from 'context/auth-context';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import alarmService from 'services/alarm-service';
import { PaginateAlarmData } from 'types/services/alarm-service';
import { notifyError } from 'utils/notify-toast';

const BraceletAlarmsPage: NextPage = () => {
  const auth = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [alarms, setAlarms] = useState<PaginateAlarmData>();

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

        const { id } = router.query;

        const { data: alarms, error } = await alarmService.getDeviceAlarms({
          token: auth.authState.token,
          deviceId: id as string,
        });

        console.log(error);

        if (error) {
          notifyError(
            error['message'] ??
              'Sorry, but something wrong happened. Retry later'
          );
        } else {
          setAlarms(alarms!);
        }

        setLoading(false);
      }
    };

    fetchDevices();
  }, [loading, auth, router]);

  const fetchMore = async () => {
    const { id } = router.query;

    const { data, error } = await alarmService.getDeviceAlarms({
      token: auth!.authState!.token,
      deviceId: id as string,
      start: alarms!.data.length,
      limit: 50,
    });

    if (data) {
      setAlarms(data);
    }
  };

  return (
    <StaggerDiv>
      <Box sx={{ width: '100%', height: '100vh' }} p={0}>
        <Head>
          <title>SerenUp</title>
          <meta name="description" content="Seren Up Web App" />
          <link rel="icon" href="/assets/logo.png" />
        </Head>
        <Grid sx={{ width: '100%', height: '100%' }} m={0}>
          <Grid.Col p="md" xs={12} sm={12} md={12} lg={6} xl={6}>
            {loading ? (
              <Center>
                <CircularLoading />
              </Center>
            ) : (
              <Box p="lg">
                <FadeInDiv>
                  <Header
                    title={`Device Alarms`}
                    profile={true}
                    onBack={() => router.push(`/devices/${router.query.id}`)}
                    onLogout={() => {
                      setLoading(true);
                      auth!.setAuthState(null);
                    }}
                  />
                </FadeInDiv>
                {alarms && (
                  <>
                    {/*  FIXME infinte scroll */}
                    {/* <InfiniteScroll
                      dataLength={alarms.data.length}
                      next={fetchMore}
                      hasMore={alarms.data.length<alarms.total}
                      loader={
                        <Center>
                          <CircularLoading />
                        </Center>
                      }
                    >
                      <Grid align="center">
                        {alarms.data.length === 0 && (
                          <Grid.Col>
                            <Center>
                              <Title order={4}>No Alarms</Title>
                            </Center>
                          </Grid.Col>
                        )}
                        {alarms.data.map((el, index) => (
                          <Grid.Col
                            xs={12}
                            sm={6}
                            md={3}
                            lg={3}
                            xl={3}
                            key={index}
                          >
                            <CardFadeIn>
                              <AlarmCard alarm={el} />
                            </CardFadeIn>
                          </Grid.Col>
                        ))}
                      </Grid>
                    </InfiniteScroll> */}

                    <Grid align="center">
                      {alarms.data.length === 0 && (
                        <Grid.Col>
                          <Center>
                            <Title order={4}>No Alarms</Title>
                          </Center>
                        </Grid.Col>
                      )}
                      {alarms.data.map((el, index) => (
                        <Grid.Col
                          xs={12}
                          sm={6}
                          md={3}
                          lg={3}
                          xl={3}
                          key={index}
                        >
                          <CardFadeIn>
                            <AlarmCard alarm={el} />
                          </CardFadeIn>
                        </Grid.Col>
                      ))}
                    </Grid>
                  </>
                )}

                {/* <Title order={3} align='center'>Load other alarms</Title> */}
              </Box>
            )}
          </Grid.Col>
          <Grid.Col
            xs={0}
            sm={0}
            md={0}
            lg={6}
            xl={6}
            p={0}
            sx={{ height: '100%' }}
          >
            <Box
              sx={{
                backgroundColor: 'var(--fi-color)',
                height: '100%',
              }}
              p="lg"
              mb="xl"
            >
              <EaseInOutDiv>
                <Title align="right" order={3}>
                  Seren-Up
                </Title>
                <Center>
                  <Floating>
                    <Box py="xl">
                      <img src="/assets/alarms.png" alt="illustration-image" />
                    </Box>
                  </Floating>
                </Center>
              </EaseInOutDiv>
            </Box>
          </Grid.Col>
        </Grid>
      </Box>
    </StaggerDiv>
  );
};

export default BraceletAlarmsPage;
