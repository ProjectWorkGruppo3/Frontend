import { Alert, Box, Center, Grid, Title } from '@mantine/core';
import { CardFadeIn, EaseInOutDiv, FadeInDiv, Floating } from 'animations';
import { NextPage } from 'next';
import {
  AnalysisStatCard,
  StatCard,
  TitleLink
} from '../../components/administration/index';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GeneralStatistics } from 'types/services/stats-service';
import { normalDate } from 'utils/date-format';
import { notifyError } from 'utils/notify-toast';
import { CircularLoading, Header, NotificationToast } from '../../components/common';
import { useAuth } from '../../context/auth-context';
import statisticService from '../../services/stats-service';

const AdministrationPage: NextPage = () => {
  const auth = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [generalStatistics, setGeneralStatistics] =
    useState<GeneralStatistics>();

  useEffect(() => {
    if (auth && auth.isAuthenticated()) {
      setLoading(false);
    } else {
      router.push('/login').then((_) => setLoading(false));
    }
  }, [auth, router]);

  useEffect(() => {
    const fetch = async () => {
      if (auth && auth.authState) {
        setLoading(true);
        const { data: stats, error } =
          await statisticService.getGeneralStatistics({
            token: auth.authState.token,
          });
          console.log(error)
        if (error) {
          notifyError('Failed to load statistics');
        } else {
          console.log(stats);

          setGeneralStatistics(stats!);
        }

        setLoading(false);
      }
    };

    fetch();
  }, [auth]);

  if (loading) {
    return (
      <Center>
        <CircularLoading />
      </Center>
    );
  }

  return (
    <Box sx={{ width: '100%', height: '100vh' }} p={0}>
      <Head>
        <title>Administration Seren Up</title>
        <meta name="description" content="Seren Up Web App" />
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <Grid sx={{ width: '100%', height: '100%' }} m={0}>
        <Grid.Col span={6} p="xl">
          <FadeInDiv>
            <Header
              title="Admministration Panel"
              profile={false}
              onLogout={() => {
                setLoading(true);
                auth!.setAuthState(null);
              }}
            />
          </FadeInDiv>
          {loading && (
            <Center>
              <CircularLoading />
            </Center>
          )}
          {!loading && !generalStatistics && (
            <Alert color="red">Failed to retrieve data</Alert>
          )}
          {!loading && generalStatistics && (
            <>
              <Grid justify="flex-start" align="center" mb="sm">
                <Grid.Col xs={12} sm={12} md={12} lg={3} xl={3}>
                  <CardFadeIn>
                    <StatCard
                      name="Admins"
                      value={generalStatistics.adminsCount}
                      onClick={() => router.push('/administration/admins')}
                    />
                  </CardFadeIn>
                </Grid.Col>
                <Grid.Col xs={12} sm={12} md={12} lg={3} xl={3}>
                  <CardFadeIn>
                    <StatCard
                      name="Bracelets"
                      value={generalStatistics.devicesCount}
                    />
                  </CardFadeIn>
                </Grid.Col>
              </Grid>

              <Box mb="lg">
                <FadeInDiv>
                  <Box mb="sm">
                    <TitleLink
                      link="/administration/analysis"
                      title="Analysis"
                    />
                  </Box>

                  <Grid>
                    {
                      generalStatistics.lastAnalysis.map((el, index) => (
                        <Grid.Col span={3} key={index}>
                          <AnalysisStatCard title={el.name} value={el.value} trending={el.trend} />
                        </Grid.Col>    
                      ))
                    }
                  </Grid>
                </FadeInDiv>
              </Box>

              <Box mb="lg">
                <FadeInDiv>
                  <Box mb="xs">
                    <TitleLink
                      link="/administration/reports"
                      title="Last Reports"
                    />
                  </Box>
                </FadeInDiv>
                <Grid>
                  {generalStatistics.latestReports.map((el, index) => (
                    <Grid.Col span={3} key={index}>
                      <CardFadeIn>
                        <StatCard
                          name={normalDate(el.generatedAt)}
                          value={el.name}
                        />
                      </CardFadeIn>
                    </Grid.Col>
                  ))}
                </Grid>
              </Box>
            </>
          )}
        </Grid.Col>
        <Grid.Col span={6} p={0}>
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
                Seren-Up Administration
              </Title>
              <Center>
                <Floating>
                  <Box py="xl">
                    <img src="/assets/admin.png" alt="illustration-image" />
                  </Box>
                </Floating>
              </Center>
            </EaseInOutDiv>
          </Box>
        </Grid.Col>
      </Grid>
      <NotificationToast />
    </Box>
  );
};

export default AdministrationPage;
