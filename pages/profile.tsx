import { CircularLoading } from '@components/common';
import { NotificationToast } from '@components/common';
import User from '@components/User';
import UserInfo from '@components/UserInfo';
import WeeklyGoals from '@components/WeeklyGoals';
import {
  AppShell,
  Button,
  Center,
  Group,
  Navbar,
  NumberInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuth } from 'context/auth-context';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import userService from 'services/user-service';
import {
  Logout as LogoutIcon,
  Settings as SettingsIcon,
} from 'tabler-icons-react';
import { notifyError, notifySuccess } from 'utils/notify-toast';

interface FormProps {
  name: string;
  surname: string;
  job: string;
  height: number;
  weight: number;
  age: number;
}

export default function Profile() {
  const authContext = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  // TODO: Add backend

  const formHandler = useForm<FormProps>({
    initialValues: {
      name: '',
      surname: '',
      job: '',
      height: 0,
      weight: 0,
      age: 0,
    },

    validate: {
      name: (value) => (value.length !== 0 ? null : 'Invalid name'),
      surname: (value) => (value.length !== 0 ? null : 'Surname is required'),
      job: (value) => (value.length !== 0 ? null : 'Job is required'),
      height: (value) => (value !== 0 ? null : 'Height is required'),
      weight: (value) => (value !== 0 ? null : 'Height is required'),
      age: (value) => (value !== 0 ? null : 'Age is required'),
    },
  });

  useEffect(() => {
    if (authContext && authContext.isAuthenticated()) {
      setLoading(false);
    } else {
      router.push('/login');
    }
  }, [authContext, router]);

  useEffect(() => {
    if (authContext && authContext.authState) {
      formHandler.setValues({
        name: authContext.authState.user.name,
        surname: authContext.authState.user.surname,
        weight: authContext.authState.user.weight,
        height: authContext.authState.user.height,
        job: authContext.authState.user.job ?? '',
        age: moment
          .duration(moment().diff(moment(authContext.authState.user.birthday)))
          .asYears(),
      });
    }
  }, [authContext, loading, formHandler.setValues]);

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
          },
        });

        notifySuccess('User updated');
      } else {
        notifyError('Something went wrong when try to update the user');
      }
      setSaving(false);
    }
  };

  // TODO: Find an awesome library that offers some cute alert / dialogs

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to discard your changes?')) {
      formHandler.reset();
    }
  };

  if (loading) {
    return (
      <Center my="xl">
        <CircularLoading />
      </Center>
    );
  }

  return (
    <AppShell
      navbar={
        <Navbar
          width={{ base: '6%' }}
          style={{
            border: 'none',
            backgroundColor: 'lightcoral',
            minHeight: '100vh',
            height: 'inherit',
          }}
        >
          <Group
            direction="column"
            position="center"
            style={{ color: 'white', height: '100%' }}
          >
            <Text align="center" py={30}>
              Dummy logo
            </Text>
            <Link href="/profile">
              <SettingsIcon
                style={{ marginTop: '20px', marginBottom: '20px' }}
              />
            </Link>
          </Group>
          <Group
            direction="column"
            position="center"
            style={{ color: 'white' }}
          >
            <LogoutIcon
              style={{
                marginBottom: '20px',
                justifySelf: 'flex-end',
              }}
            />
          </Group>
        </Navbar>
      }
      aside={
        <User>
          <Title order={2}>
            {formHandler.values.surname} {formHandler.values.name}
          </Title>
          <Text>{formHandler.values.job}</Text>
          <UserInfo />
          <WeeklyGoals />
        </User>
      }
      style={{ width: '100vw', minHeight: '100vh', margin: '0' }}
    >
      <Group direction="column">
        <Title order={1}>
          Hi {authContext?.authState?.user?.name || 'there'}, welcome to your
          personal area!
        </Title>
        <Group
          direction="column"
          style={{
            width: '70%',
            margin: 'auto',
            height: '80vh',
            marginTop: '10px',
          }}
        >
          <form
            onSubmit={formHandler.onSubmit(handleSubmit)}
            style={{ width: '100%', height: '100%' }}
          >
            <Title order={3}>Personal info</Title>
            <TextInput
              label="Name"
              m={10}
              ml={20}
              style={{ width: '50%' }}
              {...formHandler.getInputProps('name')}
            />

            <TextInput
              label="Surname"
              m={10}
              ml={20}
              style={{ width: '50%' }}
              {...formHandler.getInputProps('surname')}
            />

            <TextInput
              label="Job"
              m={10}
              ml={20}
              style={{ width: '50%' }}
              {...formHandler.getInputProps('job')}
            />

            <NumberInput
              label="Height"
              m={10}
              ml={20}
              style={{ width: '50%' }}
              {...formHandler.getInputProps('height')}
            />

            <NumberInput
              label="Weight"
              m={10}
              ml={20}
              style={{ width: '50%' }}
              {...formHandler.getInputProps('weight')}
            />

            <NumberInput
              label="Age"
              m={10}
              ml={20}
              style={{ width: '50%' }}
              {...formHandler.getInputProps('age')}
            />

            <Group mt={'200px'} position="right">
              <Button type="submit" loading={saving}>
                Save changes
              </Button>
              <Button
                variant="subtle"
                color="red"
                type="reset"
                onClick={() => handleReset()}
                loading={saving}
              >
                Discard changes
              </Button>
            </Group>
          </form>
        </Group>
        <Group
          mt={40}
          style={{ float: 'right', width: '80%', justifyContent: 'flex-end' }}
        ></Group>
      </Group>
      <NotificationToast />
    </AppShell>
  );
}
