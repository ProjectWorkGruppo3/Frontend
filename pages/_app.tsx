import '../styles/font.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from '../context/auth-context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      theme={{
        fontFamily: 'Open Sans, sans serif',
        spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
      }}
    >
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </MantineProvider>
  );
}

export default MyApp;
