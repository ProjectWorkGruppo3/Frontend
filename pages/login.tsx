import type { NextPage } from 'next';
import {
  Card,
  Container,
  Center,
  TextInput,
  PasswordInput,
  Button,
  Group,
  Title,
  Box,
  Alert,
} from '@mantine/core';
import { MdOutlineAlternateEmail, MdPassword } from 'react-icons/md';

import { useForm } from '@mantine/form';
import { validateEmail } from '../utils/validations';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import ApiService from '../services/api-service';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../context/auth-context';

interface FormProps {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const authContext = useAuth();

  useEffect(() => {
    if (authContext && authContext.isAuthenticated()) {
      router.push('/').then(_ => setLoading(false));
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

    try {
      const logged = await ApiService.login({ ...props });

      if (!logged) {
        return setError('Username or/and password are not correct');
      }

      if (authContext) {
        authContext.setAuthState({
          user: logged.user,
          expiration: logged.expiration,
          token: logged.token,
        });

        return router.replace('/');
      }
    } catch (error) {
      console.log(error);
      setError('Sorry, but something wrong happened. Retry later');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>SerenUp - Sign In</title>
        <meta name="description" content="Sign In to the Seren Up Web App" />
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <Container my="xl">
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

            {error && (
              <Alert color="red" mb="sm">
                {error}
              </Alert>
            )}

            <Group position="center">
              <Button type="submit" color="orange" loading={loading}>
                Sign In
              </Button>
            </Group>
          </form>
        </Card>
      </Container>
    </>
  );
};

export default Login;
