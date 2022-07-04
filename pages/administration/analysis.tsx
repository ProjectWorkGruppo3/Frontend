import { AnalysisStatCard, LineChartCard } from '@components/administration';
import { CircularLoading, Header, NotificationToast } from '@components/common';
import { Box, Center, Grid } from '@mantine/core';
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

interface Chart {
  title: string;
  chartTitle: string;
  data: {
    x: string;
    y: number;
  }[];
}

const AnalysisPage: NextPage = () => {
  const auth = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [chart, setChart] = useState<Chart>();

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
            <CircularLoading />
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
            <Grid justify="center">
              <Grid.Col span={2}>
                <Box mb="xs">
                  <AnalysisStatCard
                    title="Data Ingested "
                    value={100}
                    trending="down"
                    onClick={() => {
                      setChart({
                        data: [],
                        title: 'Data Ingested',
                        chartTitle: 'Data',
                      });
                    }}
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
                  <AnalysisStatCard title="Falls" value="10" trending="down" />
                </Box>
              </Grid.Col>
            </Grid>
            {chart && (
              <FadeInDiv>
                <Grid>
                  <Grid.Col>
                    <Center>
                      <LineChartCard
                        title={chart.title}
                        onClose={() => setChart(undefined)}
                        dataKey={chart.chartTitle}
                        data={chart.data}
                      />
                    </Center>
                  </Grid.Col>
                </Grid>
              </FadeInDiv>
            )}
          </FadeInDiv>
        )}
      </StaggerDiv>
      <NotificationToast />
    </Box>
  );
};

export default AnalysisPage;
