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
import { useEffect, useState } from 'react';

const PositionComponent = dynamic(
  () => import('components/dashboard/position-card'),
  { ssr: false }
);

const Dashboard: NextPage = () => {
  const auth = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!auth || !auth.isAuthenticated()) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [auth, router]);

  return (
    <StaggerDiv>
      <Box sx={{ width: '100%', height: '100vh' }} p={0}>
        <Head>
          <title>SerenUp</title>
          <meta name="description" content="Seren Up Web App" />
          <link rel="icon" href="/assets/logo.png" />
        </Head>
        {loading ? (
          <Center>
            <CircularLoading />
          </Center>
        ) : (
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
                <Grid>
                  <Grid.Col span={3}>
                    <Box mb="sm">
                      <AnalysisStatCard
                        title={'Serendipity'}
                        value={80}
                        trending="Up"
                      />
                    </Box>
                    <Box mb="sm">
                      <AnalysisStatCard
                        title={'Serendipity'}
                        value={80}
                        trending="Up"
                      />
                    </Box>
                    <Box mb="sm">
                      <AnalysisStatCard
                        title={'Serendipity'}
                        value={80}
                        trending="Up"
                      />
                    </Box>
                    <Box mb="sm">
                      <AnalysisStatCard
                        title={'Serendipity'}
                        value={80}
                        trending="Up"
                      />
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={9} p="lg">
                    <RemoteDeviceStatsChart
                      token=""
                      title="Chart"
                      deviceId="dsad"
                      dataKey="Data"
                    />
                  </Grid.Col>
                </Grid>
              </Box>

              <Box mb="md">
                <Center>
                  <Divider sx={{ width: '80%' }} />
                </Center>
              </Box>

              <Grid>
                <Grid.Col span={4}>
                  <StateCard state="Sleeping" />
                </Grid.Col>
                <Grid.Col span={4}>
                  <Box
                    sx={{
                      height: '300px',
                    }}
                  >
                    <PositionComponent
                      latitude={45.49509}
                      longitude={9.107739}
                    />
                  </Box>
                </Grid.Col>
                <Grid.Col span={4}>
                  <TotalAlarmCard
                    total={50}
                    onClick={() => console.log('Go to alarms')}
                  />
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
        )}
      </Box>
    </StaggerDiv>
  );
};

export default Dashboard;
