import { Box, Center, Grid, Title } from '@mantine/core';
import { useAuth } from 'context/auth-context';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CardFadeIn, FadeInDiv, StaggerDiv } from '../../animations';
import { ReportCard } from '../../components/administration';
import { CircularLoading, Header, NotificationToast } from '../../components/common';
import { Report } from '../../models/report';
import reportsService from '../../services/reports-service';
import { notifyError } from '../../utils/notify-toast';

const ReportsPage: NextPage = () => {
  const auth = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (auth && auth.isAuthenticated()) {
      setLoading(false);
    } else {
      router.push('/login').then((_) => setLoading(false));
    }
  }, [auth, router]);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      if (auth && auth.authState) {
        const { data: reports, error } = await reportsService.getReports({
          token: auth.authState.token,
        });

        if (error) {
          notifyError(
            'Sorry but something went wrong when try to load th reports'
          );
        } else {
          setReports(reports);
        }
      }

      setLoading(false);
    };

    fetch();
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
            title={`Reports`}
            onBack={() => router.push('/administration/')}
            onLogout={() => {
              setLoading(true);
              auth!.setAuthState(null);
            }}
          />
        </FadeInDiv>
        {loading ? (
          <FadeInDiv>
            <Center my="xl">
              <CircularLoading />
            </Center>
          </FadeInDiv>
        ) : (
          <FadeInDiv>
            <Grid align="center">
              {reports.length === 0 && (
                <Grid.Col>
                  <Center>
                    <Title order={4}>No Reports</Title>
                  </Center>
                </Grid.Col>
              )}
              {reports.map((el, index) => (
                <Grid.Col xs={12} sm={6} md={4} lg={2} xl={2} key={index}>
                  <CardFadeIn>
                    <ReportCard report={el} />
                  </CardFadeIn>
                </Grid.Col>
              ))}
            </Grid>
          </FadeInDiv>
        )}
      </StaggerDiv>
      <NotificationToast />
    </Box>
  );
};

export default ReportsPage;
