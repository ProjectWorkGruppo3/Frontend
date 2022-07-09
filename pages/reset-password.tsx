import { NotificationToast } from '@components/common';
import {
  Box,
  Button,
  Center,
  Grid,
  Group,
  MediaQuery,
  PasswordInput,
  Text,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { EaseInOutDiv, FadeInDiv, Floating, StaggerDiv } from 'animations';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import authService from 'services/auth-service';
import { notifyError } from 'utils/notify-toast';
import { validatePassword } from 'utils/validations';

interface FormProps {
  password: string;
  confirmPassword: string;
}

const RecoverPassword: NextPage<{ recoverToken: string }> = ({
  recoverToken,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const formHandler = useForm<FormProps>({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: {
      password: (value) => validatePassword(value),
      confirmPassword: (value, values) =>
        value.length === 0
          ? 'Please, type the password'
          : value === values.password
          ? null
          : 'Passwords not coincide',
    },
  });

  const onSubmit = async (values: FormProps) => {
    setLoading(true);

    const { error } = await authService.resetPassword({
      recoverToken: recoverToken,
      password: values.password,
    });

    if (error) {
      notifyError(error['message'] ?? 'Something went wrong');
      setLoading(false);
    } else {
      router.push('/login').then((_) => setLoading(false));
    }
  };

  return (
    <StaggerDiv>
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
            <FadeInDiv>
              <Box sx={{ height: '80%' }}>
                <Box px="xl">
                  <Box mb="1%">
                    <Group spacing="xs">
                      <Title order={2} align="left">
                        Reset Password
                      </Title>
                    </Group>
                  </Box>
                  <Box mb="xs">
                    <Text color="var(--p-color)">
                      Please type the new password
                    </Text>
                  </Box>
                  <form onSubmit={formHandler.onSubmit(onSubmit)}>
                    <PasswordInput
                      id="pwd-input"
                      label="Password"
                      placeholder="Enter the password"
                      {...formHandler.getInputProps('password')}
                      sx={{
                        'div:focus-within': {
                          borderColor: 'var(--p-color)',
                        },
                      }}
                      mb="sm"
                    />

                    <PasswordInput
                      id="confirm-pwd-input"
                      label="Confirm Password"
                      placeholder="Enter the password"
                      {...formHandler.getInputProps('confirmPassword')}
                      sx={{
                        'div:focus-within': {
                          borderColor: 'var(--p-color)',
                        },
                      }}
                      mb="sm"
                    />

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
                        <Text color="var(--q-color)">Recover Password</Text>
                      </Button>
                    </Box>
                  </form>
                </Box>
              </Box>
            </FadeInDiv>
          </Grid.Col>
          <Grid.Col xs={0} sm={0} md={0} lg={6} xl={6} p={0}>
            <MediaQuery query="(max-width: 1200px)" styles={{ width: 0 }}>
              <Box
                sx={{
                  backgroundColor: 'var(--fi-color)',
                  height: '100%',
                }}
                p="lg"
                mb="xl"
              >
                <EaseInOutDiv>
                  <Title order={3}>Seren-Up</Title>
                  <Center>
                    <Floating>
                      <Box py="xl">
                        <img
                          src="/assets/recover-password.png"
                          alt="illustration-image"
                        />
                      </Box>
                    </Floating>
                  </Center>
                </EaseInOutDiv>
              </Box>
            </MediaQuery>
          </Grid.Col>
        </Grid>
        <NotificationToast />
      </Box>
    </StaggerDiv>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { recoverToken } = query;

  if (!recoverToken) {
    return {
      props: {},
      redirect: {
        destination: '/',
      },
    };
  }

  return {
    props: {
      data: {
        recoverToken: recoverToken,
      },
    },
  };
};

export default RecoverPassword;
