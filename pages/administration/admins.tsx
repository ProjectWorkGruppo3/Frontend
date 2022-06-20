import { Box, Grid, Title, Center } from '@mantine/core';
import { NextPage } from 'next';
import {
  CardFadeIn,
  EaseInOutDiv,
  FadeInDiv,
  RootAnimationDiv,
} from '../../animations';
import { Header } from '../../components/common';
import { UserDetail, UserSidebar } from '../../components/administration';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { AdminUser } from '../../models/admin-user';

const AdminUsersPage: NextPage = () => {
  const [selectedUser, setSelectedUser] = useState<AdminUser>();
  const router = useRouter();

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
        <CardFadeIn>
          <Grid style={{ height: '90vh' }}>
            <Grid.Col span={3} style={{ height: '100%' }}>
              <UserSidebar
                users={Array.from({ length: 5 }, (v, k) => ({
                  id: `${k}`,
                  email: `email ${k}`,
                  birthday: new Date(Date.now()),
                  name: `name ${k}`,
                  surname: `surname ${k}`,
                  height: k + 100,
                  weight: k + 50,
                  profilePic: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
                }))}
                onClick={(user) => setSelectedUser(user)}
                onSearch={(value) => console.log(value)}
              />
            </Grid.Col>
            <Grid.Col span={9} style={{ height: '100%' }}>
              {selectedUser ? (
                <EaseInOutDiv style={{ height: '100%' }}>
                  <UserDetail
                    user={selectedUser}
                    onClose={() => setSelectedUser(undefined)}
                    onSave={() => console.log('save')}
                    onDelete={() => console.log('delete')}
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
      </Box>
    </RootAnimationDiv>
  );
};

export default AdminUsersPage;
