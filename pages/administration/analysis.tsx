import { Header, NotificationToast } from '@components/common';
import { Box, Loader } from '@mantine/core';
import { FadeInDiv, StaggerDiv } from 'animations';
import { useAuth } from 'context/auth-context';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const AnalysisPage: NextPage = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (auth && auth.isAuthenticated()) {
      setLoading(false);
    } else {
      router.push('/login').then((_) => setLoading(false));
    }
  }, [auth, router]);

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
            title={`Analysis`}
            onBack={() => router.push('/administration/')}
            onLogout={() => {
              setLoading(true);
              auth!.setAuthState(null);
            }}
          />
        </FadeInDiv>
        {loading ? (
          <FadeInDiv>
            <Loader />
          </FadeInDiv>
        ) : (
          <FadeInDiv>
            <p>WIP</p>
          </FadeInDiv>
        )}
      </StaggerDiv>
      <NotificationToast />
    </Box>
  );
};

export default AnalysisPage;
