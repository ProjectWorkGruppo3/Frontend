import { Alert, Box, Center, Grid, Loader } from '@mantine/core';
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
import { notifyError } from 'utils/notify-toast';
import { CardFadeIn, FadeInDiv } from '../../animations';
import { Header } from '../../components/common';
import { useAuth } from '../../context/auth-context';
import statisticService from '../../services/stats-service';
import { normalDate } from '../../utils/date-format';

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
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Administration Seren Up</title>
        <meta name="description" content="Seren Up Web App" />
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <Box py="xl" px="1%">
        <FadeInDiv>
          <Header
            title="Admministration Panel"
            onLogout={() => {
              setLoading(true);
              auth!.setAuthState(null);
            }}
          />
        </FadeInDiv>
        {loading && (
          <Center>
            <FadeInDiv>
              <Loader />
            </FadeInDiv>
          </Center>
        )}

        {!loading && !generalStatistics && (
          <Alert color="red">Failed to retrieve data</Alert>
        )}

        {!loading && generalStatistics && (
          <>
            <Grid justify="flex-start" align="center" mb="sm">
              <Grid.Col xs={12} sm={12} md={12} lg={2} xl={2}>
                <CardFadeIn>
                  <StatCard
                    name="Admins"
                    value={generalStatistics.totalAdmins}
                    onClick={() => router.push('/administration/admins')}
                  />
                </CardFadeIn>
              </Grid.Col>
              <Grid.Col xs={12} sm={12} md={12} lg={2} xl={2}>
                <CardFadeIn>
                  <StatCard 
                    name="Bracelets" 
                    value={generalStatistics.totalBracelets} 
                  />
                </CardFadeIn>
              </Grid.Col>
            </Grid>

            <Box mb="lg">
              <FadeInDiv>
                <Box mb="sm">
                  <TitleLink link="/administration/analysis" title="Analysis" />
                </Box>

                <Grid>
                  <Grid.Col span={2}>
                    <AnalysisStatCard title="Analysis 1" value={80} />
                  </Grid.Col>
                  <Grid.Col span={2}>
                    <AnalysisStatCard title="Analysis 1" value={80} />
                  </Grid.Col>
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
                {
                  generalStatistics.lastReports.map(el => (
                    <Grid.Col span={2}>
                      <CardFadeIn>
                        <StatCard
                          name={normalDate(el.generatedAt)}
                          value={el.name}
                        />
                      </CardFadeIn>
                    </Grid.Col>
                  ))
                }
              </Grid>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default AdministrationPage;
