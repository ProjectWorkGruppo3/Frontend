import { Box, Center, Grid, Title } from '@mantine/core';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { CardFadeIn, FadeInDiv, RootAnimationDiv, StaggerDiv } from '../../animations';
import { ReportCard } from '../../components/administration';
import { Header } from '../../components/common';
import { Report } from '../../models/report';



const ReportsPage: NextPage = () => {

  const reports : Report[] = [
    {
      id: '1',
      date: new Date(),
      downloadLink: '#'
    }
  ];
  const router = useRouter();

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
          <FadeInDiv>
            <Grid align="center">
              {
                reports.length === 0 
                &&
                <Grid.Col>
                  <Center>
                    <Title order={4}>No Reports</Title>
                  </Center>
                </Grid.Col>
              }
              {reports.map((el, index) => (
                <Grid.Col xs={12} sm={6} md={4} lg={2} xl={2} key={index}>
                  <CardFadeIn>
                    <ReportCard report={el} />
                  </CardFadeIn>
                </Grid.Col>
              ))}
            </Grid>
          </FadeInDiv>
        </Box>
      </StaggerDiv>
    </RootAnimationDiv>
  );
};

export default ReportsPage;
