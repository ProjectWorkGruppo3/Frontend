import { Box, Center, Grid, Loader, Title } from '@mantine/core';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  CardFadeIn,
  EaseInOutDiv,
  FadeInDiv,
  RootAnimationDiv
} from '../../animations';
import {
  NewAdminUserModal,
  UserDetail,
  UserSidebar
} from '../../components/administration';
import { Header, NotificationToast } from '../../components/common';
import { AdminUser } from '../../models/admin-user';
import adminService from '../../services/admin-service';
import { fakeAdminUsers } from '../../utils/fake-data';
import { notifyError, notifySuccess } from '../../utils/notify-toast';

const AdminUsersPage: NextPage = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<AdminUser>();
  const [loading, setLoading] = useState<boolean>(true);
  const [newUserModalOpened, setNewUserModalOpened] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setUsers(fakeAdminUsers); // FIXME

      setLoading(false);
    };

    fetch();
  }, []);

  const onSaveUser = async (user: AdminUser) => {
    const { data: updated, error } = await adminService.updateAdminUser({
      user: user,
      token: '', // FIXME
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
      token: '',
    });

    if (error) {
      notifyError(
        'Sorry, but something went wrong when try to delete the user'
      );
    } else {
      notifySuccess('User deleted successfully');
    }
  };

  return (
    <RootAnimationDiv>
      <Head>
        <title>Administration Seren Up</title>
      </Head>
      <Box pt="xl" px="2%">
        <FadeInDiv>
          <Header
            onBack={() => router.push('/administration/')}
            title="Admins"
            onLogout={() => {
              // FIXME
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
              onSubmit={async (values) => console.log(values)}
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
    </RootAnimationDiv>
  );
};

export default AdminUsersPage;
