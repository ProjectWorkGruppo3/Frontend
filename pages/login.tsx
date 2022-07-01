import {
  Box,
  Button,
  Card,
  Center,
  Container,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import type { NextPage } from 'next';
import { MdOutlineAlternateEmail, MdPassword } from 'react-icons/md';

import { useForm } from '@mantine/form';
import { validateEmail } from '../utils/validations';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { FadeInDiv, StaggerDiv } from '../animations';
import { NotificationToast } from '../components/common';
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
    <>
      <Head>
        <title>SerenUp</title>
        <meta name="description" content="Seren Up Web App" />
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <StaggerDiv>
        <Container my="xl">
          <FadeInDiv>
            <Card radius="md">
              <Container mt="md">
                <Title align="center">Sign In</Title>
              </Container>

              <Center>
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
              <form onSubmit={formHandler.onSubmit(onSubmit)}>
                <TextInput
                  id="email-input"
                  label="E-mail"
                  description="E-mail you have used to register"
                  placeholder="your@email.com"
                  mb="md"
                  icon={<MdOutlineAlternateEmail size={16} />}
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
                  description="Password you have used to register"
                  placeholder="yoursecretpassword"
                  mb="sm"
                  icon={<MdPassword size={16} />}
                  {...formHandler.getInputProps('password')}
                  sx={{
                    'div:focus-within': {
                      borderColor: 'orange',
                    },
                  }}
                />
                <Stack align="center" spacing="xs">
                  <Button type="submit" color="orange" loading={loading}>
                    Sign In
                  </Button>

                  <Link href="/forgot-password">
                    <Text
                      variant="link"
                      component="a"
                      sx={{
                        color: '#d3d3d3',
                        ':hover': {
                          color: 'orange',
                          transition: '0.6s',
                          cursor: 'pointer',
                        },
                      }}
                    >
                      Forgot the password?
                    </Text>
                  </Link>
                  <Link href="/signup">
                    <Text
                      variant="link"
                      component="a"
                      sx={{
                        color: '#d3d3d3',
                        ':hover': {
                          color: 'orange',
                          transition: '0.6s',
                          cursor: 'pointer',
                        },
                      }}
                    >
                      Do not have an account? Click here to Sign Up
                    </Text>
                  </Link>
                </Stack>
              </form>
            </Card>
          </FadeInDiv>
          <NotificationToast />
        </Container>
      </StaggerDiv>
    </>
  );
};

export default Login;
