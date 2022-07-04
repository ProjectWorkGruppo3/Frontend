import {
  Box,
  Button,
  Center,
  Grid,
  Group,
  MediaQuery,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import type { NextPage } from 'next';

import { useForm } from '@mantine/form';
import { validateEmail } from '../utils/validations';

import { NotificationToast } from '@components/common';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/auth-context';
import AuthService from '../services/auth-service';
import { notifyError } from '../utils/notify-toast';

interface FormProps {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const authContext = useAuth();

  useEffect(() => {
    if (authContext && authContext.isAuthenticated()) {
      router
        .push(
          authContext.authState!.user.roles.includes('Admin')
            ? '/administration'
            : '/'
        )
        .then((_) => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [authContext, router]);

  const formHandler = useForm<FormProps>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) =>
        validateEmail(value) ? null : 'Please, type a valid email',
      password: (value) =>
        value.length !== 0 ? null : 'Please, type the password',
    },
  });

  const onSubmit = async (props: FormProps) => {
    setLoading(true);
    const { data: logged, error } = await AuthService.login({ ...props });

    if (error) {
      return notifyError(
        error['message'] ?? 'Sorry, but something wrong happened. Retry later'
      );
    }

    if (logged && authContext) {
      authContext.setAuthState({
        user: logged.user,
        expiration: logged.expiration,
        token: logged.token,
      });

      console.log('Includes', logged.user.roles.includes('Admin'));

      return router.replace(
        logged.user.roles.includes('Admin') ? '/administration' : '/'
      );
    }

    setLoading(false);
  };

  return (
    <Box sx={{ width: '100%', height: '100vh' }} p={0}>
      <Head>
        <title>SerenUp</title>
        <meta name="description" content="Seren Up Web App" />
        <link rel="icon" href="/assets/logo.png" />
      </Head>

      <Grid sx={{ width: '100%', height: '100%' }} m={0}>
        <Grid.Col p="md" xs={12} sm={12} md={12} lg={6} xl={6}>
          <Box sx={{ height: '10%' }} mb="10%">
            <Title order={3}>Seren-Up</Title>
          </Box>
          <Box sx={{ height: '80%' }}>
            <Box px="xl">
              <Box mb="1%">
                <Title order={2} align="left">
                  Welcome
                </Title>
              </Box>
              <Box mb="xs">
                <Text color="var(--p-color)">
                  Welcome! Please enter your details
                </Text>
              </Box>
              <form onSubmit={formHandler.onSubmit(onSubmit)}>
                <TextInput
                  id="email-input"
                  label="E-mail"
                  placeholder="Enter your email"
                  mb="md"
                  {...formHandler.getInputProps('email')}
                  sx={{
                    'input:focus': {
                      borderColor: 'orange',
                    },
                  }}
                />

                <PasswordInput
                  id="pwd-input"
                  label="Password"
                  placeholder="Enter your password"
                  mb="sm"
                  {...formHandler.getInputProps('password')}
                  sx={{
                    'div:focus-within': {
                      borderColor: 'orange',
                    },
                  }}
                />
                <Group position="right" mb="xs">
                  <Link href="/forgot-password">
                    <Text
                      size="sm"
                      variant="link"
                      component="a"
                      sx={{
                        color: 'var(--p-color)',
                        ':hover': {
                          transition: '0.6s',
                          cursor: 'pointer',
                        },
                      }}
                    >
                      Forgot the password
                    </Text>
                  </Link>
                </Group>
                <Box mb="lg">
                  <Button
                    radius="sm"
                    type="submit"
                    sx={{
                      backgroundColor: 'var(--p-color)',
                      width: '100%',
                      ':hover': {
                        backgroundColor: 'var(--p-color)',
                        filter: 'brightness(85%)',
                      },
                    }}
                    loading={loading}
                  >
                    <Text color="var(--q-color)">Sign In</Text>
                  </Button>
                </Box>
                <Center>
                  <Text mr="1%" color="#525252">
                    Do not have an account?
                  </Text>
                  <Link href="/signup">
                    <Text
                      component="a"
                      variant="link"
                      sx={{
                        color: 'var(--p-color)',
                        ':hover': {
                          transition: '0.6s',
                          cursor: 'pointer',
                        },
                      }}
                    >
                      Click here to Sign Up
                    </Text>
                  </Link>
                </Center>
              </form>
            </Box>
          </Box>
        </Grid.Col>
        <Grid.Col xs={0} sm={0} md={0} lg={6} xl={6} p={0}>
          <MediaQuery query="(max-width: 1200px)" styles={{ width: 0 }}>
            <Box
              sx={{
                backgroundColor: 'var(--fi-color)',
                height: '100%',
              }}
            >
              <Center sx={{ height: '90%' }}>
                <Box
                  sx={{
                    width: '60%',
                  }}
                  my="md"
                >
                  <Image
                    src="/assets/logo.png"
                    width="100%"
                    height="25%"
                    layout="responsive"
                    alt="logo"
                  />
                </Box>
              </Center>
            </Box>
          </MediaQuery>
        </Grid.Col>
      </Grid>
      <NotificationToast />
    </Box>
  );
};

export default Login;
