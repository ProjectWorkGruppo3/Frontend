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
  Grid,
  NumberInput,
  ActionIcon,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { MdOutlineAlternateEmail, MdPassword } from 'react-icons/md';
import { BsSmartwatch, BsCalendarDate } from 'react-icons/bs';
import { FaWeight } from 'react-icons/fa';
import { GiBodyHeight } from 'react-icons/gi';
import { AiOutlineQrcode } from 'react-icons/ai';

import { useForm } from '@mantine/form';
import { validateEmail } from '../utils/validations';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import ApiService from '../services/api-service';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../context/auth-context';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormProps {
  email: string;
  password: string;
  confirmPassword: string;
  weight: string;
  height: string;
  birthday: string;
}

const SignUp: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const authContext = useAuth();

  useEffect(() => {
    if (authContext && authContext.isAuthenticated()) {
      router.push('/');
    }

    setLoading(false);
  }, [authContext, router]);

  const notify = (message: string, options: ToastOptions) =>
    toast(message, options);

  const formHandler = useForm<FormProps>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      birthday: '',
      height: '',
      weight: '66',
    },
    validate: {
      email: (value) =>
        validateEmail(value) ? null : 'Please, type a valid email',
      password: (value) =>
        value.length !== 0 ? null : 'Please, type the password',
      confirmPassword: (value, values) =>
        value === values.password ? null : 'Passwords not coincide',
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
      }
    },
  });

  const onSubmit = async (props: FormProps) => {
    console.log(props);
    setLoading(true);

    try {
      await ApiService.signup({
        email: props.email,
        password: props.password,
        birthday: new Date(props.birthday),
        height: parseInt(props.height),
        weight: parseInt(props.weight),
      });

      return router.replace('/');
    } catch (error: any) {
      console.log(error);
      notify(
        error['message'] ?? 'Sorry, but something wrong happened. Retry later',
        {
          type: 'error',
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>SerenUp - Sign Up</title>
        <meta name="description" content="Sign Up to the Seren Up Web App" />
      </Head>
      <Container my="xl">
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
                <DatePicker
                  id="birthday-input"
                  label="Date of birth"
                  description="Select your birthday"
                  mb="sm"
                  maxDate={new Date()}
                  icon={<BsCalendarDate size={16} />}
                  {...formHandler.getInputProps('birthday')}
                />
              </Grid.Col>
              <Grid.Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <NumberInput
                  id="weight-input"
                  label="Weight (kg)"
                  description="What's your weigth?"
                  mb="sm"
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
                  mb="sm"
                  icon={<GiBodyHeight size={16} />}
                  {...formHandler.getInputProps('height')}
                  hideControls
                />
              </Grid.Col>
            </Grid>

            <Group position="center">
              <Button type="submit" color="orange" loading={loading}>
                Sign Up
              </Button>
            </Group>
          </form>
        </Card>
      </Container>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
    </>
  );
};

export default SignUp;
