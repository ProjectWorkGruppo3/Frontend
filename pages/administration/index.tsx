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
import {
  StatCard,
  TitleLink,
  AlarmCard,
  AlarmCardProps,
} from '../../components/administration/index';

import { BsSmartwatch } from 'react-icons/bs';
import { IoIosArrowForward } from 'react-icons/io';
import { AiOutlinePercentage } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/auth-context';
import Head from 'next/head';
import { CardFadeIn, FadeInDiv, RootAnimationDiv } from '../../animations';
import { Header } from '../../components/common';
import { fullDatetimeWithoutYear, normalDate } from '../../utils/date-format';

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
      <Box pt="xl" px="2%">
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
            <Grid justify="center" align="center">
              <Grid.Col span={2}>
                <CardFadeIn>
                  <StatCard
                    name="Admins"
                    value={20}
                    onClick={() => router.push('/administration/admins')}
                  />
                </CardFadeIn>
              </Grid.Col>
              <Grid.Col span={2}>
                <CardFadeIn>
                  <StatCard
                    name="Bracelets"
                    value={200}
                  />
                </CardFadeIn>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={10}>
                <FadeInDiv>
                  <Box mb="xs">
                    <TitleLink
                      link="/administration/analysis"
                      title="Analysis"
                    />
                  </Box>
                  <Card shadow="xl" radius="md">
                    Charts
                  </Card>
                </FadeInDiv>
              </Grid.Col>
              <Grid.Col span={2}>
                <Box mb="xs">
                  <TitleLink
                    link="/administration/reports"
                    title="Last Reports"
                  />
                </Box>
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
