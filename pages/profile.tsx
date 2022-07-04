import { CircularLoading } from '@components/common';
import User from '@components/User';
import UserInfo from '@components/UserInfo';
import WeeklyGoals from '@components/WeeklyGoals';
import {
  AppShell,
  Button,
  Group, Navbar,
  NumberInput,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuth } from 'context/auth-context';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Logout as LogoutIcon,
  Settings as SettingsIcon
} from 'tabler-icons-react';

export default function Profile() {
  const authContext = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  // TODO: Add backend

  const form = useForm({
    initialValues: {
      name: '',
      surname: '',
      job: '',
      height: 0,
      weight: 0,
      age: 0,
    },

    validate: {
      name: (value) => (value != '' ? null : 'Invalid name'),
      surname: (value) => (value != '' ? null : 'Surname is required'),
      job: (value) => (value != '' ? null : 'Job is required'),
      height: (value) => value == 0 ?? 'Height is required',
      weight: (value) => value == 0 ?? 'Height is required',
      age: (value) => value == 0 ?? 'Age is required',
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
      form.setValues({
        name: authContext.authState.user.name,
        surname: authContext.authState.user.surname,
        weight: authContext.authState.user.weight,
        height: authContext.authState.user.height,
        job: authContext.authState.user.job,
        age: moment
          .duration(moment().diff(moment(authContext.authState.user.birthday)))
          .asYears(),
      });
    }
  }, [authContext, loading]);

  // TODO: Add authentication

  const handleSubmit = () => {
    if (authContext /*&& authContext.isAuthenticated()*/) {
      authContext.setAuthState({
        ...authContext.authState!,
        user: {
          id: '1',
          name: form.values.name,
          surname: form.values.surname,
          height: form.values.height,
          weight: form.values.weight,
          birthday: new Date(),
          job: form.values.job,
          email: 'giacomobaggio13@gmail.com', // To remove
        },
      });
    }
  };

  // TODO: Find an awesome library that offers some cute alert / dialogs

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to discard your changes?')) {
      form.reset();
    }
  };

  if (loading) {
    return <CircularLoading />;
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
            {form.values.surname} {form.values.name}
          </Title>
          <Text>{form.values.job}</Text>
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
            onSubmit={form.onSubmit((values) => console.log(values))}
            style={{ width: '100%', height: '100%' }}
          >
            <Title order={3}>Personal info</Title>
            <TextInput
              placeholder={form.values.name}
              label="Name"
              m={10}
              ml={20}
              style={{ width: '50%' }}
              {...form.getInputProps('name')}
            />

            <TextInput
              placeholder={form.values.surname}
              label="Surname"
              m={10}
              ml={20}
              style={{ width: '50%' }}
              {...form.getInputProps('surname')}
            />

            <TextInput
              placeholder={form.values.job}
              required
              label="Job"
              m={10}
              ml={20}
              style={{ width: '50%' }}
              {...form.getInputProps('job')}
            />

            <NumberInput
              placeholder={form.values.height.toString()}
              required
              label="Height"
              m={10}
              ml={20}
              style={{ width: '50%' }}
              {...form.getInputProps('height')}
            />

            <NumberInput
              placeholder={form.values.weight.toString()}
              required
              label="Weight"
              m={10}
              ml={20}
              style={{ width: '50%' }}
              {...form.getInputProps('weight')}
            />

            <NumberInput
              placeholder={form.values.age.toString()}
              required
              label="Age"
              m={10}
              ml={20}
              style={{ width: '50%' }}
              {...form.getInputProps('age')}
            />

            <Group mt={'200px'} style={{ justifyContent: 'flex-end' }}>
              <Button type="submit" onClick={handleSubmit}>
                Save changes
              </Button>
              <Button
                variant="subtle"
                color="red"
                type="reset"
                onClick={() => handleReset()}
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
    </AppShell>
  );
}
