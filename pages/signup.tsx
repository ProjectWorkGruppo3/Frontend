import {
  Box,
  Button,
  Center,
  Divider,
  Grid,
  MediaQuery,
  NumberInput,
  PasswordInput,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import type { NextPage } from 'next';

import { FormList, formList, useForm } from '@mantine/form';
import { validateEmail, validatePassword } from '../utils/validations';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/auth-context';

import { EmergencyContactInput } from '@components/common';
import { FadeInDiv, StaggerDiv } from 'animations';
import Link from 'next/link';
import AuthService from 'services/auth-service';
import { NotificationToast } from '../components/common';

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
  contacts: FormList<{
    email: string;
  }>;
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
      contacts: formList<{ email: string }>([]),
    },
    validate: {
      name: (value) => (value.length !== 0 ? null : 'Please, type the name'),
      surname: (value) =>
        value.length !== 0 ? null : 'Please, type the surname',
      email: (value) => validateEmail(value),
      password: (value) => validatePassword(value),
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
      contacts: {
        email: (value) => validateEmail(value) ? null : 'Please, type a valid email'
      },
    },
  });

  const fields = formHandler.values.contacts.map((item, index) => (
    <EmergencyContactInput
      key={item.email}
      index={index}
      inputProps={formHandler.getListInputProps('contacts', index, 'email')}
      onRemoveItem={() => formHandler.removeListItem('contacts', index)}
    />
  ));

  const onSubmit = async (props: FormProps) => {
    const contacts = props.contacts.map(el => el.email);
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
      contacts: contacts
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
    <StaggerDiv>
      <Box sx={{ width: '100%', height: '100vh' }} p={0}>
        <Head>
          <title>SerenUp</title>
          <meta name="description" content="Seren Up Web App" />
          <link rel="icon" href="/assets/logo.png" />
        </Head>

        <Grid sx={{ width: '100%', height: '100%' }} m={0}>
          <Grid.Col p="md" xs={12} sm={12} md={12} lg={6} xl={6}>
            <Box mb="xl">
              <Title order={3}>Seren-Up</Title>
            </Box>
            <FadeInDiv>
              <Box px="xl">
                <Box mb="1%">
                  <Title order={2} align="left">
                    Sign Up
                  </Title>
                </Box>
                <Box mb="xs">
                  <Text color="var(--p-color)">
                    Welcome! Please enter your details to sign up
                  </Text>
                </Box>
                <form onSubmit={formHandler.onSubmit(onSubmit)}>
                  <Grid gutter="sm" mb="sm">
                    <Grid.Col span={12}>
                      <TextInput
                        id="email-input"
                        label="E-mail"
                        placeholder="your@email.com"
                        {...formHandler.getInputProps('email')}
                        sx={{
                          'input:focus': {
                            borderColor: 'var(--p-color)',
                          },
                        }}
                      />
                    </Grid.Col>

                    <Grid.Col xs={12} sm={12} md={12} lg={6} xl={6}>
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
                      />
                    </Grid.Col>
                    <Grid.Col xs={12} sm={12} md={12} lg={6} xl={6}>
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
                      />
                    </Grid.Col>

                    <Grid.Col xs={12} sm={12} md={12} lg={6} xl={6}>
                      <TextInput
                        id="name-input"
                        label="Name"
                        placeholder="John"
                        {...formHandler.getInputProps('name')}
                        sx={{
                          'input:focus': {
                            borderColor: 'var(--p-color)',
                          },
                        }}
                      />
                    </Grid.Col>
                    <Grid.Col xs={12} sm={12} md={12} lg={6} xl={6}>
                      <TextInput
                        id="surname-input"
                        label="Surname"
                        placeholder="Doe"
                        {...formHandler.getInputProps('surname')}
                        sx={{
                          'input:focus': {
                            borderColor: 'var(--p-color)',
                          },
                        }}
                      />
                    </Grid.Col>

                    <Grid.Col xs={12} sm={12} md={12} lg={6} xl={6}>
                      <TextInput
                        id="job-input"
                        label="Job"
                        placeholder="Software Developer"
                        {...formHandler.getInputProps('job')}
                        sx={{
                          'input:focus': {
                            borderColor: 'var(--p-color)',
                          },
                        }}
                      />
                    </Grid.Col>
                    <Grid.Col xs={12} sm={12} md={12} lg={6} xl={6}>
                      <DatePicker
                        id="birthday-input"
                        label="Date of birth"
                        placeholder={`${new Date().toLocaleDateString('en-US', {
                          weekday: 'long',
                        })} ${new Date().getDate()}, ${new Date().getFullYear()}`}
                        maxDate={new Date()}
                        {...formHandler.getInputProps('birthday')}
                        sx={{
                          'input:focus': {
                            borderColor: 'var(--p-color)',
                          },
                        }}
                      />
                    </Grid.Col>

                    <Grid.Col xs={12} sm={12} md={12} lg={6} xl={6}>
                      <NumberInput
                        id="weight-input"
                        label="Weight (kg)"
                        placeholder="70"
                        {...formHandler.getInputProps('weight')}
                        hideControls
                        sx={{
                          'input:focus': {
                            borderColor: 'var(--p-color)',
                          },
                        }}
                      />
                    </Grid.Col>
                    <Grid.Col xs={12} sm={12} md={12} lg={6} xl={6}>
                      <NumberInput
                        id="height-input"
                        label="Height (cm)"
                        placeholder="170"
                        {...formHandler.getInputProps('height')}
                        hideControls
                        sx={{
                          'input:focus': {
                            borderColor: 'var(--p-color)',
                          },
                        }}
                      />
                    </Grid.Col>
                    <Grid.Col>
                      <Title order={5}>Emergency Contacts</Title>
                      <Divider mb="xs" />
                      <Text color="var(--p-color)" size='sm' mb="xs">
                        Emergency contacts receive alarm notification, it&apos;s recommended to put almost one but you can add one after
                      </Text>
                      <Grid>
                        {fields.map((el, index) => (
                          <Grid.Col key={index}>{el}</Grid.Col>
                        ))}

                        <Grid.Col>
                          <Center>
                            <Button
                              radius="sm"
                              sx={{
                                backgroundColor: 'var(--p-color)',
                                ':hover': {
                                  backgroundColor: 'var(--p-color)',
                                  filter: 'brightness(85%)',
                                },
                              }}
                              onClick={() =>
                                formHandler.addListItem('contacts', {
                                  email: '',
                                })
                              }
                            >
                              <Text color="var(--q-color)">Add Emergency Contact</Text>
                            </Button>
                          </Center>
                        </Grid.Col>
                      </Grid>
                    </Grid.Col>
                  </Grid>

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
                      <Text color="var(--q-color)">Sign Up</Text>
                    </Button>
                  </Box>

                  <Center>
                    <Text mr="1%" color="#525252">
                      You already have an account?
                    </Text>
                    <Link href="/login">
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
                        Click here to Sign In
                      </Text>
                    </Link>
                  </Center>
                </form>
              </Box>
            </FadeInDiv>
          </Grid.Col>
          <Grid.Col
            xs={0}
            sm={0}
            md={0}
            lg={6}
            xl={6}
            p={0}
          >
            <MediaQuery query="(max-width: 1200px)" styles={{ width: 0 }}>
              <Box
                sx={{
                  backgroundColor: 'var(--fi-color)',
                  height: '100%',
                }}
              >
                <Center>
                  <Box
                    sx={{
                      width: '60%',
                    }}
                    mt="35%"
                  >
                    <Image
                      src="/assets/logo.png"
                      width="100%"
                      height="25%"
                      layout="responsive"
                      alt="logo"
                    />
                    <Text 
                      align="center" 
                      mt='sm'
                      weight='500'
                      size='xl'
                      sx={{
                        letterSpacing: '1px'
                      }}
                    >
                      Seren Up, We Trust 
                    </Text>
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

export default SignUp;
function notifyError(arg0: any) {
  throw new Error('Function not implemented.');
}

function notifySuccess(arg0: string) {
  throw new Error('Function not implemented.');
}

