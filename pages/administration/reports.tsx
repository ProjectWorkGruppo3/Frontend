import { Box, Center, Grid, Loader, Title } from '@mantine/core';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  CardFadeIn,
  FadeInDiv,
  RootAnimationDiv,
  StaggerDiv,
} from '../../animations';
import { ReportCard } from '../../components/administration';
import { Header, NotificationToast } from '../../components/common';
import { Report } from '../../models/report';
import reportsService from '../../services/reports-service';
import { notifyError } from '../../utils/notify-toast';

const ReportsPage: NextPage = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      const { data: reports, error } = await reportsService.getReports({
        token: '', // FIXME
      });

      if (error) {
        notifyError(
          'Sorry but something went wrong when try to load th reports'
        );
      } else {
        setReports(reports);
      }

      setLoading(false);
    };

    fetch();
  }, []);

  return (
    <RootAnimationDiv>
      <StaggerDiv>
        <Box pt="xl" px="2%">
          <FadeInDiv>
            <Header
              title={`Reports`}
              onBack={() => router.push('/administration/')}
              onLogout={() => {
                //FIXME
              }}
            />
          </FadeInDiv>
          {loading ? (
            <FadeInDiv>
              <Loader />
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
        </Box>
      </StaggerDiv>
      <NotificationToast />
    </RootAnimationDiv>
  );
};

export default ReportsPage;
