import { AnalysisStatCard, ChartCardRemote } from '@components/administration';
import { CircularLoading, Header, NotificationToast } from '@components/common';
import { Alert, Box, Center, Grid } from '@mantine/core';
import { EaseInOutDiv, FadeInDiv, StaggerDiv } from 'animations';
import { useAuth } from 'context/auth-context';
import { DailyStatistics } from 'models/daily-statistics';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import statisticService from 'services/stats-service';
import { normalFullTime } from 'utils/date-format';
import { notifyError } from 'utils/notify-toast';

const DensityMap = dynamic(
  () => import('../../components/administration/density-map'),
  { ssr: false }
);

const AnalysisPage: NextPage = () => {
  const auth = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [dailyStatistics, setDailyStatistics] = useState<DailyStatistics>();

  const [chart, setChart] = useState<string>();

  useEffect(() => {
    if (!auth || !auth.isAuthenticated()) {
      router.push('/login');
    }
  }, [auth, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (auth && auth.authState) {
        const { data, error } = await statisticService.getDailyStatistics({
          token: auth.authState.token,
        });

        if (error) {
          notifyError('Failed to load analytics');
        } else {
          setDailyStatistics(data!);
        }

        setLoading(false);
      }
    };

    fetchData();
  }, [auth]);

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
            profile={false}
            title={`Analysis Overview`}
            onBack={() => router.push('/administration/')}
            onLogout={() => {
              setLoading(true);
              auth!.setAuthState(null);
            }}
          />
        </FadeInDiv>

        {loading && (
          <FadeInDiv>
            <Center my="xl">
              <CircularLoading />
            </Center>
          </FadeInDiv>
        )}

        {!loading && !dailyStatistics && (
          <Alert color="red">Failed to retrieve data</Alert>
        )}

        {!loading && dailyStatistics && (
          <FadeInDiv>
            <Box style={{ height: '300px' }}>
              <EaseInOutDiv>
                <DensityMap
                  title={`Last time updpated: ${normalFullTime(
                    dailyStatistics.date
                  )}`}
                  data={dailyStatistics.geolocalizationData}
                />
              </EaseInOutDiv>
            </Box>
            <Grid justify="center">
              {dailyStatistics.analysis.map((el, index) => (
                <Grid.Col span={2} key={index}>
                  <Box mb="xs">
                    <AnalysisStatCard
                      title={el.name}
                      value={el.value}
                      trending={el.trend}
                      onClick={() => setChart(el.name)}
                    />
                  </Box>
                </Grid.Col>
              ))}
            </Grid>
            {chart && (
              <FadeInDiv>
                <Grid>
                  <Grid.Col>
                    <Center>
                      <ChartCardRemote
                        title={chart}
                        onClose={() => setChart(undefined)}
                        dataKey={chart}
                        token={auth!.authState!.token}
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
