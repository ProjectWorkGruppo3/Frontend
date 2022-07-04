import { Box, Center, Grid, Title } from '@mantine/core';
import { EaseInOutDiv, FadeInDiv, Floating } from 'animations';
import { NextPage } from 'next';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CircularLoading, Header } from '../../components/common';
import { useAuth } from '../../context/auth-context';

const AdministrationPage: NextPage = () => {
  const auth = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (auth && auth.isAuthenticated()) {
      setLoading(false);
    } else {
      router.push('/login').then((_) => setLoading(false));
    }
  }, [auth, router]);

  if (loading) {
    return <CircularLoading />;
  }

  return (
    <Box sx={{ width: '100%', height: '100vh' }} p={0}>
      <Head>
        <title>Administration Seren Up</title>
        <meta name="description" content="Seren Up Web App" />
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <Grid sx={{ width: '100%', height: '100%' }} m={0}>
        <Grid.Col span={6} p='xl'>
          <FadeInDiv>
            <Header
              title="Admministration Panel"
              onLogout={() => {
                setLoading(true);
                auth!.setAuthState(null);
              }}
            />
          </FadeInDiv>
          {/* {loading ? (
            <Center>
              <FadeInDiv>
                <CircularLoading />
              </FadeInDiv>
            </Center>
          ) : (
            <>
              <Grid justify="flex-start" align="center" mb="sm">
                <Grid.Col xs={12} sm={12} md={12} lg={2} xl={2}>
                  <CardFadeIn>
                    <StatCard
                      name="Admins"
                      value={20}
                      onClick={() => router.push('/administration/admins')}
                    />
                  </CardFadeIn>
                </Grid.Col>
                <Grid.Col xs={12} sm={12} md={12} lg={2} xl={2}>
                  <CardFadeIn>
                    <StatCard name="Bracelets" value={200} />
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
                  {Array.from({ length: 4 }, (v, k) => (
                    <Grid.Col span={2}>
                      <CardFadeIn>
                        <StatCard
                          name={normalDate(new Date())}
                          value={`Report #${k}`}
                        />
                      </CardFadeIn>
                    </Grid.Col>
                  ))}
                </Grid>
              </Box>
            </>
          )} */}
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
                    <img src="/assets/admin.png" />
                  </Box>
                </Floating>
              </Center>
            </EaseInOutDiv>
          </Box>
        </Grid.Col>
      </Grid>
      {/* <Box py="xl" px="1%">
        <FadeInDiv>
          <Header
            title="Admministration Panel"
            onLogout={() => {
              setLoading(true);
              auth!.setAuthState(null);
            }}
          />
        </FadeInDiv>
        {loading ? (
          <Center>
            <FadeInDiv>
              <CircularLoading />
            </FadeInDiv>
          </Center>
        ) : (
          <>
            <Grid justify="flex-start" align="center" mb="sm">
              <Grid.Col xs={12} sm={12} md={12} lg={2} xl={2}>
                <CardFadeIn>
                  <StatCard
                    name="Admins"
                    value={20}
                    onClick={() => router.push('/administration/admins')}
                  />
                </CardFadeIn>
              </Grid.Col>
              <Grid.Col xs={12} sm={12} md={12} lg={2} xl={2}>
                <CardFadeIn>
                  <StatCard name="Bracelets" value={200} />
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
                {Array.from({ length: 4 }, (v, k) => (
                  <Grid.Col span={2}>
                    <CardFadeIn>
                      <StatCard
                        name={normalDate(new Date())}
                        value={`Report #${k}`}
                      />
                    </CardFadeIn>
                  </Grid.Col>
                ))}
              </Grid>
            </Box>
          </>
        )}
      </Box> */}
    </Box>
  );
};

export default AdministrationPage;
