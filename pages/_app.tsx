import { MantineProvider } from '@mantine/core';
import { RootAnimationDiv } from 'animations';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/auth-context';
import '../styles/font.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <MantineProvider
      theme={{
        fontFamily: 'Open Sans, sans serif',
        spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
        breakpoints: {
          xs: 500,
          sm: 800,
          md: 1000,
          lg: 1275,
          xl: 1600,
          xxl: 1800,
        },
      }}
    >
      <AuthProvider>
        <AnimatePresence exitBeforeEnter>
          <RootAnimationDiv>
            <Component {...pageProps} key={router.route} />
          </RootAnimationDiv>
        </AnimatePresence>
      </AuthProvider>
    </MantineProvider>
  );
}

export default MyApp;
