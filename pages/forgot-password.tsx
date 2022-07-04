import { NotificationToast } from '@components/common';
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Grid,
  Group,
  MediaQuery,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FadeInDiv, StaggerDiv } from 'animations';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import authService from 'services/auth-service';
import { notifyError, notifySuccess } from 'utils/notify-toast';
import { validateEmail } from 'utils/validations';

interface FormProps {
  email: string;
}

const ForgotPassword: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const formHandler = useForm<FormProps>({
    initialValues: {
      email: '',
    },
    validate: {
      email: (value) =>
        validateEmail(value) ? null : 'Please, type a valid email',
    },
  });

  const onSubmit = async (values: FormProps) => {
    setLoading(true);

    const { data: sended, error } = await authService.forgotPassword({
      email: values.email,
    });

    if (error) {
      notifyError('Something went wrong');
    } else {
      notifySuccess('Reset e-mail sended. Check your mail');
    }

    setTimeout(() => router.push('/login'), 2000);

    setLoading(false);
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
                  <ActionIcon onClick={() => router.push('/login')}>
                    <IoIosArrowBack />
                  </ActionIcon>
                  <Title order={2} align="left">
                    Recover Password
                  </Title>
                </Group>
              </Box>
              <Box mb="xs">
                <Text color="var(--p-color)">Please enter your e-mail</Text>
              </Box>
              <form onSubmit={formHandler.onSubmit(onSubmit)}>
                <TextInput
                  id="email-input"
                  label="E-mail"
                  placeholder="Enter your e-mail"
                  mb="md"
                  {...formHandler.getInputProps('email')}
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
                    <Text color="var(--q-color)">Send Reset Mail</Text>
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
    </StaggerDiv>
  );
};

export default ForgotPassword;
