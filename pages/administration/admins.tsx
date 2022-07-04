import { Box, Center, Grid, Title } from '@mantine/core';
import { useAuth } from 'context/auth-context';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CardFadeIn, EaseInOutDiv, FadeInDiv } from '../../animations';
import {
  NewAdminUserModal,
  UserDetail,
  UserSidebar
} from '../../components/administration';
import { CircularLoading, Header, NotificationToast } from '../../components/common';
import { AdminUser } from '../../models/admin-user';
import adminService from '../../services/admin-service';
import { fakeAdminUsers } from '../../utils/fake-data';
import { notifyError, notifySuccess } from '../../utils/notify-toast';

const AdminUsersPage: NextPage = () => {
  const auth = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<AdminUser>();
  const [loading, setLoading] = useState<boolean>(true);
  const [newUserModalOpened, setNewUserModalOpened] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (auth && auth.isAuthenticated()) {
      setLoading(false);
    } else {
      router.push('/login').then((_) => setLoading(false));
    }
  }, [auth, router]);

  useEffect(() => {
    const fetch = async () => {
      if (auth && auth.authState) {
        setLoading(true);
        setUsers(fakeAdminUsers); // FIXME

        setLoading(false);
      }
    };

    fetch();
  }, [auth]);

  const onSaveUser = async (user: AdminUser) => {
    const { data: updated, error } = await adminService.updateAdminUser({
      user: user,
      token: auth!.authState!.token,
    });

    if (error) {
      notifyError(
        'Sorry, but something went wrong when try to update the user'
      );
    } else {
      notifySuccess('User updated successfully');
    }
  };

  const onDeleteUser = async (user: AdminUser) => {
    const { data: deleted, error } = await adminService.deleteAdminUser({
      userId: user.id,
      token: auth!.authState!.token,
    });

    if (error) {
      notifyError(
        'Sorry, but something went wrong when try to delete the user'
      );
    } else {
      notifySuccess('User deleted successfully');
    }
  };

  const onAddUser = async (email: string, name: string, surname: string) => {
    console.log(email, name, surname);

    const { data: added, error } = await adminService.addAdminUser({
      user: {
        id: '-1',
        name: name,
        surname: surname,
        email: email,
      },
      token: auth!.authState!.token,
    });

    if (error) {
      notifyError('Sorry, but something went wrong when try to add the user');
    } else {
      notifySuccess('User added successfully');
    }

    setNewUserModalOpened(false);
  };

  return (
    <>
      <Head>
        <title>Administration Seren Up</title>
        <meta name="description" content="Seren Up Web App" />
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <Box pt="xl" px="2%">
        <FadeInDiv>
          <Header
            onBack={() => router.push('/administration/')}
            title="Admins"
            onLogout={() => {
              setLoading(true);
              auth!.setAuthState(null);
            }}
          />
        </FadeInDiv>

        {loading ? (
          <FadeInDiv>
            <CircularLoading />
          </FadeInDiv>
        ) : (
          <>
            <NewAdminUserModal
              opened={newUserModalOpened}
              onClose={() => setNewUserModalOpened(false)}
              onSubmit={onAddUser}
            />
            <CardFadeIn>
              <Grid style={{ height: '90vh' }}>
                <Grid.Col span={3} style={{ height: '100%' }}>
                  <UserSidebar
                    users={users}
                    onAdd={() => setNewUserModalOpened(true)}
                    onClick={(user) => setSelectedUser(user)}
                    onSearch={(value) => console.log(value)} // FIXME
                  />
                </Grid.Col>
                <Grid.Col span={9} style={{ height: '100%' }}>
                  {selectedUser ? (
                    <EaseInOutDiv style={{ height: '100%' }}>
                      <UserDetail
                        user={selectedUser}
                        onClose={() => setSelectedUser(undefined)}
                        onSave={onSaveUser}
                        onDelete={onDeleteUser}
                      />
                    </EaseInOutDiv>
                  ) : (
                    <Center>
                      <Title order={5}>Select an user</Title>
                    </Center>
                  )}
                </Grid.Col>
              </Grid>
            </CardFadeIn>
          </>
        )}
      </Box>

      <NotificationToast />
    </>
  );
};

export default AdminUsersPage;
