import {
  CircularLoading,
  EmergencyContactInput,
  Header,
  NotificationToast,
} from '@components/common';
import {
  Box,
  Button,
  Center,
  Divider,
  Grid,
  Group,
  NumberInput,
  Text,
  TextInput,
  Title,
  Modal,
} from '@mantine/core';
import { formList, FormList, useForm } from '@mantine/form';
import { EaseInOutDiv, FadeInDiv, Floating, StaggerDiv } from 'animations';
import { useAuth } from 'context/auth-context';
import moment from 'moment';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import userService from 'services/user-service';
import { notifyError, notifySuccess } from 'utils/notify-toast';
import { validateEmail } from 'utils/validations';

interface FormProps {
  name: string;
  surname: string;
  job: string;
  height: number;
  weight: number;
  age: number;
  contacts: FormList<{
    email: string;
  }>;
}

export default function Profile() {
  const authContext = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  const formHandler = useForm<FormProps>({
    initialValues: {
      name: '',
      surname: '',
      job: '',
      height: 0,
      weight: 0,
      age: 0,
      contacts: formList<{ email: string }>([]),
    },

    validate: {
      name: (value) => (value.length !== 0 ? null : 'Invalid name'),
      surname: (value) => (value.length !== 0 ? null : 'Surname is required'),
      job: (value) => (value.length !== 0 ? null : 'Job is required'),
      height: (value) => (value !== 0 ? null : 'Height is required'),
      weight: (value) => (value !== 0 ? null : 'Height is required'),
      age: (value) => (value !== 0 ? null : 'Age is required'),
      contacts: {
        email: (value) => validateEmail(value),
      },
    },
  });

  useEffect(() => {
    if (!authContext || !authContext.isAuthenticated()) {
      router.push('/login');
    }
  }, [authContext, router]);

  useEffect(() => {
    const fetch = async () => {
      if (authContext && authContext.authState) {
        if (authContext.authState.user.roles.includes('Admin')) {
          await router.push(authContext.authState.homepage);
          return setLoading(false);
        }
        formHandler.setValues({
          name: authContext.authState.user.name,
          surname: authContext.authState.user.surname,
          weight: authContext.authState.user.weight,
          height: authContext.authState.user.height,
          job: authContext.authState.user.job ?? '',
          age: moment
            .duration(
              moment().diff(moment(authContext.authState.user.birthday))
            )
            .asYears(),
          contacts: formList(
            authContext.authState.user.emergencyContacts.map((el) => ({
              email: el,
            }))
          ),
        });

        setLoading(false);
      }
    };

    fetch();
  }, [authContext, loading, formHandler.setValues, router]);

  const handleSubmit = async (value: FormProps) => {
    if (authContext && authContext.isAuthenticated()) {
      setSaving(true);
      const user = authContext.authState!.user;

      const { data, error } = await userService.updateProfile({
        token: authContext.authState!.token,
        user: {
          id: user.id,
          name: value.name,
          weight: value.weight,
          surname: value.surname,
          roles: user.roles,
          job: value.job,
          height: value.height,
          email: user.email,
          birthday: moment(user.birthday).subtract(value.age, 'years').toDate(),
          emergencyContacts: value.contacts.map((el) => el.email),
        },
      });

      if (!error) {
        authContext.setAuthState({
          ...authContext.authState!,
          user: {
            ...user,
            name: value.name,
            weight: value.weight,
            surname: value.surname,
            job: value.job,
            height: value.height,
            birthday: moment(user.birthday)
              .subtract(value.age, 'years')
              .toDate(),
            emergencyContacts: value.contacts.map((el) => el.email),
          },
        });

        notifySuccess('User updated');
      } else {
        notifyError('Something went wrong when try to update the user');
      }
      setSaving(false);
    }
  };

  const handleReset = async () => {
    setOpened(true);
  };

  const fields = formHandler.values.contacts.map((item, index) => (
    <EmergencyContactInput
      key={index}
      index={index}
      inputProps={formHandler.getListInputProps('contacts', index, 'email')}
      onRemoveItem={() => formHandler.removeListItem('contacts', index)}
    />
  ));

  const [opened, setOpened] = useState(false);

  return (
    <StaggerDiv>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        overlayOpacity={0.55}
        overlayBlur={3}
        title="Are you sure you want to discard changes?"
      >
        <Group position="center">
          <Button
            onClick={() => {
              formHandler.reset();
              setOpened(false);
            }}
            style={{ width: '80px' }}
          >
            Yes
          </Button>
          <Button
            onClick={() => setOpened(false)}
            style={{ width: '80px' }}
            color={'red'}
          >
            No
          </Button>
        </Group>
      </Modal>
      <Box sx={{ width: '100%', height: '100vh' }} p={0}>
        <Head>
          <title>SerenUp</title>
          <meta name="description" content="Seren Up Web App" />
          <link rel="icon" href="/assets/logo.png" />
        </Head>

        <Grid sx={{ width: '100%', height: '100%' }} m={0}>
          <Grid.Col p="md" xs={12} sm={12} md={12} lg={6} xl={6}>
            {loading ? (
              <Center>
                <CircularLoading />
              </Center>
            ) : (
              <Box p="lg">
                <FadeInDiv>
                  <Header
                    title={`${authContext!.authState!.user.name} Profile`}
                    profile={true}
                    onBack={() => router.push('/')}
                    onLogout={() => {
                      setLoading(true);
                      authContext!.setAuthState(null);
                    }}
                  />
                </FadeInDiv>
                <FadeInDiv>
                  <form onSubmit={formHandler.onSubmit(handleSubmit)}>
                    <Grid mb="xl">
                      <Grid.Col span={12}>
                        <TextInput
                          id="name-input"
                          label="Name"
                          sx={{
                            'input:focus': {
                              borderColor: 'var(--p-color)',
                            },
                          }}
                          {...formHandler.getInputProps('name')}
                        />
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <TextInput
                          label="Surname"
                          sx={{
                            'input:focus': {
                              borderColor: 'var(--p-color)',
                            },
                          }}
                          {...formHandler.getInputProps('surname')}
                        />
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <TextInput
                          label="Job"
                          sx={{
                            'input:focus': {
                              borderColor: 'var(--p-color)',
                            },
                          }}
                          {...formHandler.getInputProps('job')}
                        />
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <NumberInput
                          label="Age"
                          sx={{
                            'input:focus': {
                              borderColor: 'var(--p-color)',
                            },
                          }}
                          {...formHandler.getInputProps('age')}
                        />
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <NumberInput
                          label="Weight"
                          sx={{
                            'input:focus': {
                              borderColor: 'var(--p-color)',
                            },
                          }}
                          {...formHandler.getInputProps('weight')}
                        />
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <NumberInput
                          label="Height"
                          sx={{
                            'input:focus': {
                              borderColor: 'var(--p-color)',
                            },
                          }}
                          {...formHandler.getInputProps('height')}
                        />
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <Title order={5}>Emergency Contacts</Title>
                        <Divider mb="xs" />
                        <Text color="var(--p-color)" size="sm" mb="xs">
                          Emergency contacts receive alarm notification,
                          it&apos;s recommended to put almost one
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
                                <Text color="var(--q-color)">
                                  Add Emergency Contact
                                </Text>
                              </Button>
                            </Center>
                          </Grid.Col>
                        </Grid>
                      </Grid.Col>
                    </Grid>

                    <Group position="right">
                      <Button
                        radius="sm"
                        type="reset"
                        color="red"
                        onClick={() => handleReset()}
                        loading={saving}
                      >
                        <Text color="var(--q-color)">Discard changes</Text>
                      </Button>
                      <Button
                        radius="sm"
                        type="submit"
                        sx={{
                          backgroundColor: 'var(--p-color)',
                          ':hover': {
                            backgroundColor: 'var(--p-color)',
                            filter: 'brightness(85%)',
                          },
                        }}
                        loading={saving}
                      >
                        <Text color="var(--q-color)">Save changes</Text>
                      </Button>
                    </Group>
                  </form>
                </FadeInDiv>
              </Box>
            )}
          </Grid.Col>
          <Grid.Col
            xs={0}
            sm={0}
            md={0}
            lg={6}
            xl={6}
            p={0}
            sx={{ height: '100%' }}
          >
            <Box
              sx={{
                backgroundColor: 'var(--fi-color)',
                height: '100%',
              }}
              p="lg"
              mb="xl"
            >
              <EaseInOutDiv>
                <Title align="right" order={3}>
                  Seren-Up
                </Title>
                <Center>
                  <Floating>
                    <Box py="xl">
                      <img src="/assets/profile.png" alt="illustration-image" />
                    </Box>
                  </Floating>
                </Center>
              </EaseInOutDiv>
            </Box>
          </Grid.Col>
        </Grid>
        <NotificationToast />
      </Box>
    </StaggerDiv>
  );
}
