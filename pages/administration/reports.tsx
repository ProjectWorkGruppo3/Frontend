import { ReportCard } from '@components/administration';
import { CircularLoading, Header } from '@components/common';
import { Box, Center, Grid, MediaQuery, Title } from '@mantine/core';
import { useAuth } from 'context/auth-context';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  CardFadeIn,
  EaseInOutDiv,
  FadeInDiv,
  Floating,
  StaggerDiv,
} from '../../animations';
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

  const downloadReport = async (filename: string) => {
    const { data: _, error } = await reportsService.downloadReport({
      token: auth!.authState!.token,
      filename: filename,
    });

    if (error) {
      notifyError(
        'Sorry but something went wrong when try to download the file'
      );
    }
  };

  return (
    <StaggerDiv>
      <Box sx={{ width: '100%', height: '100vh' }} p={0}>
        <Head>
          <title>Administration Seren Up</title>
          <meta name="description" content="Seren Up Web App" />
          <link rel="icon" href="/assets/logo.png" />
        </Head>

        <Grid sx={{ width: '100%', height: '100%' }} m={0}>
          <Grid.Col p="md" xs={12} sm={12} md={12} lg={6} xl={6}>
            <FadeInDiv>
              <Header
                title={`Reports`}
                profile={false}
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
                    <Grid.Col xs={12} sm={6} md={4} lg={4} xl={4} key={index}>
                      <CardFadeIn>
                        <ReportCard report={el} />
                      </CardFadeIn>
                    </Grid.Col>
                  ))}
                </Grid>
              </FadeInDiv>
            )}
          </Grid.Col>
          <Grid.Col xs={0} sm={0} md={0} lg={6} xl={6} p={0}>
            <MediaQuery query="(max-width: 1200px)" styles={{ width: 0 }}>
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
                    Seren-Up Reports
                  </Title>
                  <Center>
                    <Floating>
                      <Box py="xl">
                        <img src="/assets/report.png" />
                      </Box>
                    </Floating>
                  </Center>
                </EaseInOutDiv>
              </Box>
            </MediaQuery>
          </Grid.Col>
        </Grid>
      </Box>
    </StaggerDiv>
  );
};

export default ReportsPage;
