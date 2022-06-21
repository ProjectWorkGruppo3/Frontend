import { MantineProvider } from '@mantine/core';
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
