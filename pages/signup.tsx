import {
  Box,
  Button,
  Card,
  Center,
  Container,
  Grid,
  NumberInput,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import type { NextPage } from 'next';
import { BsCalendarDate } from 'react-icons/bs';
import { FaWeight } from 'react-icons/fa';
import { GiBodyHeight } from 'react-icons/gi';
import { MdOutlineAlternateEmail, MdPassword } from 'react-icons/md';

import { useForm } from '@mantine/form';
import { validateEmail } from '../utils/validations';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/auth-context';
import AuthService from '../services/auth-service';

import Link from 'next/link';
import { FadeInDiv, StaggerDiv } from '../animations';
import { NotificationToast } from '../components/common';
import { notifyError, notifySuccess } from '../utils/notify-toast';

interface FormProps {
  name: string;
  surname: string;
  job?: string;
  email: string;
  password: string;
  confirmPassword: string;
  weight: string;
  height: string;
  birthday: string;
}

const SignUp: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const authContext = useAuth();

  useEffect(() => {
    if (authContext && authContext.isAuthenticated()) {
      router.push('/');
    }

    setLoading(false);
  }, [authContext, router]);

  const formHandler = useForm<FormProps>({
    initialValues: {
      name: '',
      surname: '',
      job: '',
      email: '',
      password: '',
      confirmPassword: '',
      birthday: '',
      height: '',
      weight: '',
    },
    validate: {
      name: (value) => (value.length !== 0 ? null : 'Please, type the name'),
      surname: (value) =>
        value.length !== 0 ? null : 'Please, type the surname',
      email: (value) =>
        validateEmail(value) ? null : 'Please, type a valid email',
      password: (value) =>
        value.length !== 0 ? null : 'Please, type the password',
      confirmPassword: (value, values) =>
        value.length === 0
          ? 'Please, type the password'
          : value === values.password
          ? null
          : 'Passwords not coincide',
      height: (value) => {
        console.log(parseInt(value));
        return !isNaN(parseInt(value)) && parseInt(value) !== 0
          ? null
          : 'Please, insert a valid height';
      },
      weight: (value) => {
        console.log(parseInt(value));
        return !isNaN(parseInt(value)) && parseInt(value) !== 0
          ? null
          : 'Please, insert a valid weight';
      },
      birthday: (value) => {
        return value.length !== 0 ? null : 'Please, insert a valid birthday';
      },
    },
  });

  const onSubmit = async (props: FormProps) => {
    console.log(props);
    setLoading(true);

    const { data: registered, error } = await AuthService.signup({
      name: props.name,
      surname: props.surname,
      email: props.email,
      password: props.password,
      birthday: new Date(props.birthday),
      height: parseInt(props.height),
      weight: parseInt(props.weight),
      job: props.job,
    });

    if (error) {
      notifyError(
        error['message'] ?? 'Sorry, but something wrong happened. Retry later'
      );
    } else {
      notifySuccess('Registration completed Successfully');
      return router.replace('/');
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
                <Title align="center">Sign Up</Title>
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
                <Grid>
                  <Grid.Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <TextInput
                      id="name-input"
                      label="Name"
                      description="Name you have used to register"
                      placeholder="John"
                      mb="md"
                      icon={<MdOutlineAlternateEmail size={16} />}
                      {...formHandler.getInputProps('name')}
                      sx={{
                        'input:focus': {
                          borderColor: 'orange',
                        },
                      }}
                    />
                  </Grid.Col>
                  <Grid.Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <TextInput
                      id="surname-input"
                      label="Surname"
                      description="Surname you have used to register"
                      placeholder="Doe"
                      mb="md"
                      icon={<MdOutlineAlternateEmail size={16} />}
                      {...formHandler.getInputProps('surname')}
                      sx={{
                        'input:focus': {
                          borderColor: 'orange',
                        },
                      }}
                    />
                  </Grid.Col>
                  <Grid.Col xs={12} sm={12} md={6} lg={6} xl={6}>
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
                  </Grid.Col>
                  <Grid.Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <DatePicker
                      id="birthday-input"
                      label="Date of birth"
                      description="Select your birthday"
                      mb="sm"
                      placeholder={`${new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                      })} ${new Date().getDate()}, ${new Date().getFullYear()}`}
                      allowFreeInput
                      maxDate={new Date()}
                      icon={<BsCalendarDate size={16} />}
                      {...formHandler.getInputProps('birthday')}
                    />
                  </Grid.Col>
                  <Grid.Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <PasswordInput
                      id="pwd-input"
                      label="Password"
                      description="Write the password"
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
                  </Grid.Col>

                  <Grid.Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <PasswordInput
                      id="confirm-pwd-input"
                      label="Confirm Password"
                      description="Type again the password"
                      placeholder="yoursecretpassword"
                      mb="sm"
                      icon={<MdPassword size={16} />}
                      {...formHandler.getInputProps('confirmPassword')}
                      sx={{
                        'div:focus-within': {
                          borderColor: 'orange',
                        },
                      }}
                    />
                  </Grid.Col>

                  <Grid.Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <NumberInput
                      id="weight-input"
                      label="Weight (kg)"
                      description="What's your weigth?"
                      mb="sm"
                      placeholder="70"
                      icon={<FaWeight size={16} />}
                      {...formHandler.getInputProps('weight')}
                      hideControls
                    />
                  </Grid.Col>
                  <Grid.Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <NumberInput
                      id="height-input"
                      label="Height (cm)"
                      description="What's your weigth?"
                      placeholder="170"
                      mb="sm"
                      icon={<GiBodyHeight size={16} />}
                      {...formHandler.getInputProps('height')}
                      hideControls
                    />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <TextInput
                      id="job-input"
                      label="Job"
                      description="What's your current job?"
                      mb="sm"
                      placeholder="Software Developer"
                      {...formHandler.getInputProps('job')}
                    />
                  </Grid.Col>
                </Grid>

                <Stack align="center" spacing="xs">
                  <Button type="submit" color="orange" loading={loading}>
                    Sign Up
                  </Button>
                  <Link href="/login">
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
                      You already have an account? Click here to Sign In
                    </Text>
                  </Link>
                </Stack>
              </form>
            </Card>
          </FadeInDiv>
        </Container>
      </StaggerDiv>

      <NotificationToast />
    </>
  );
};

export default SignUp;
