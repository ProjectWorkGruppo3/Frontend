import {
  ActionIcon,
  Box,
  Card,
  Center,
  Container,
  Divider,
  Grid,
  Loader,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { NextPage } from 'next';
import { StatCard, TitleLink } from '../../components/administration/index';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/auth-context';
import Head from 'next/head';
import {
  CardFadeIn,
  EaseInOutDiv,
  FadeInDiv,
  RootAnimationDiv,
} from '../../animations';
import { Header } from '../../components/common';
import {
  fullDatetimeWithoutYear,
  normalDate,
  normalFullTime,
} from '../../utils/date-format';
import dynamic from 'next/dynamic';
import {
  DensityMapData,
  DensityMapProps,
} from '../../components/administration/density-map';
import { fakeDensityMapData } from '../../utils/fake-data';

const DensityMap = dynamic(
  () => import('../../components/administration/density-map'),
  { ssr: false }
);

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
    return <Loader />;
  }

  return (
    <RootAnimationDiv>
      <Head>
        <title>Administration Seren Up</title>
      </Head>
      <Box py="xl" px="1%">
        <FadeInDiv>
          <Header
            // onBack={() => router.back()}
            title="Admministration Panel"
            onLogout={() => {
              // FIXME
            }}
          />
        </FadeInDiv>
        {loading ? (
          <Center>
            <FadeInDiv>
              <Loader />
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
            <Grid>
              <Grid.Col xs={12} sm={12} md={12} lg={10} xl={10}>
                <FadeInDiv>
                  <Box mb="sm">
                    <TitleLink
                      link="/administration/analysis"
                      title="Analysis"
                    />
                  </Box>
                  <Card shadow="xl" radius="md">
                    <Grid>
                      <Grid.Col xs={12} sm={12} md={6} lg={6} xl={6}>
                        Stats
                      </Grid.Col>
                      <Grid.Col xs={12} sm={12} md={6} lg={6} xl={6}>
                        <EaseInOutDiv>
                          <DensityMap
                            title={`Last time updpated: ${normalFullTime(
                              new Date()
                            )}`}
                            data={fakeDensityMapData}
                          />
                        </EaseInOutDiv>
                      </Grid.Col>
                    </Grid>
                  </Card>
                </FadeInDiv>
              </Grid.Col>
              <Grid.Col xs={12} sm={12} md={12} lg={2} xl={2}>
                <FadeInDiv>
                  <Box mb="xs">
                    <TitleLink
                      link="/administration/reports"
                      title="Last Reports"
                    />
                  </Box>
                </FadeInDiv>
                {Array.from({ length: 4 }, (v, k) => (
                  <Box mb="xs">
                    <CardFadeIn>
                      <StatCard
                        name={normalDate(new Date())}
                        value={`Report #${k}`}
                      />
                    </CardFadeIn>
                  </Box>
                ))}
              </Grid.Col>
            </Grid>
          </>
        )}
      </Box>
    </RootAnimationDiv>
  );
};

export default AdministrationPage;
