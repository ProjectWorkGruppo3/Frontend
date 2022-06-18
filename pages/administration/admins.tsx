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
import { User } from '../../models/user';
import { useRouter } from 'next/router';

const AdminUsersPage: NextPage = () => {
  const [selectedUser, setSelectedUser] = useState<User>();
  const router = useRouter();

  return (
    <RootAnimationDiv>
      <Head>
        <title>Administration Seren Up</title>
      </Head>
      <Box pt="xl" px="2%">
        <FadeInDiv>
          <Header
            onBack={() => router.back()}
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
