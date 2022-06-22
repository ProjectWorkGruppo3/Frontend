import '../styles/font.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from '../context/auth-context';
import { AnimatePresence } from 'framer-motion';

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
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </AuthProvider>
    </MantineProvider>
  );
}

export default MyApp;
