import { Box, Center, Grid, Loader, Title } from '@mantine/core';
import { useAuth } from 'context/auth-context';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AdminUserCreated } from 'types/services/admin-service';
import { CardFadeIn, EaseInOutDiv, FadeInDiv } from '../../animations';
import {
  NewAdminUserModal,
  UserDetail,
  UserSidebar
} from '../../components/administration';
import { Header, NotificationToast } from '../../components/common';
import { AdminUser } from '../../models/admin-user';
import adminService from '../../services/admin-service';
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

        const {data: admins, error} = await adminService.getAdminUsers({
          token: auth.authState.token
        })

        if(error) {
          notifyError('Failed to load admin users')
        } else {
          setUsers(admins);
        }
        

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
      setUsers(prevState => [...prevState.filter(el => el.id !== user.id), user])
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
      setSelectedUser(undefined);
      setUsers(prevState => [...prevState.filter(el => el.id !== user.id)]);
    }
  };

  const onAddUser = async (user: AdminUserCreated) => {

    const { data: userCreated, error } = await adminService.addAdminUser({
      user: user,
      token: auth!.authState!.token,
    });

    if (error) {
      notifyError('Sorry, but something went wrong when try to add the user');
    } else {
      notifySuccess('User added successfully');
      setUsers(prevState => [...prevState, userCreated!])
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
            <Loader />
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
