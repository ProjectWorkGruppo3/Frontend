import { AnalysisStatCard } from '@components/administration';
import { Header, NotificationToast } from '@components/common';
import { Box, Divider, Grid, Loader, Title } from '@mantine/core';
import { EaseInOutDiv, FadeInDiv, StaggerDiv } from 'animations';
import { useAuth } from 'context/auth-context';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { normalFullTime } from 'utils/date-format';
import { fakeDensityMapData } from 'utils/fake-data';

const DensityMap = dynamic(
  () => import('../../components/administration/density-map'),
  { ssr: false }
);

const AnalysisPage: NextPage = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (auth && auth.isAuthenticated()) {
      setLoading(false);
    } else {
      router.push('/login').then((_) => setLoading(false));
    }
  }, [auth, router]);

  return (
    <Box pt="xl" px="2%">
      <Head>
        <title>Administration Seren Up</title>
        <meta name="description" content="Seren Up Web App" />
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <StaggerDiv>
        <FadeInDiv>
          <Header
            title={`Analysis Overview`}
            onBack={() => router.push('/administration/')}
            onLogout={() => {
              setLoading(true);
              auth!.setAuthState(null);
            }}
          />
        </FadeInDiv>
        {loading ? (
          <FadeInDiv>
            <Loader />
          </FadeInDiv>
        ) : (
          <FadeInDiv>
            <Box style={{ height: '300px' }}>
              <EaseInOutDiv>
                <DensityMap
                  title={`Last time updpated: ${normalFullTime(new Date())}`}
                  data={fakeDensityMapData}
                />
              </EaseInOutDiv>
            </Box>
            <Box mb="xs">
              <Title order={5} align="right">
                Analysis - {normalFullTime(new Date())}
              </Title>
              <Divider />
            </Box>
            <Grid justify="center">
              <Grid.Col span={2}>
                <Box mb="xs">
                  <AnalysisStatCard
                    title="Data Ingested "
                    value={100}
                    trending="down"
                    onClick={() => console.log("chart")}
                  />
                </Box>
              </Grid.Col>
              <Grid.Col span={2}>
                <Box mb="xs">
                  <AnalysisStatCard
                    title="Serendipity"
                    value="78%"
                    trending="up"
                  />
                </Box>
              </Grid.Col>
              <Grid.Col span={2}>
                <Box mb="xs">
                  <AnalysisStatCard title="Data" value="dsad" />
                </Box>
              </Grid.Col>
            </Grid>
          </FadeInDiv>
        )}
      </StaggerDiv>
      <NotificationToast />
    </Box>
  );
};

export default AnalysisPage;
