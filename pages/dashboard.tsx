import { AppShell, Grid, Group, Navbar } from '@mantine/core';
import React from 'react';
import Main from '@components/Main';
import Sidebar from '@components/Sidebar';
import Welcome from '@components/Welcome';
import User from '@components/User';
import CardsContainer from '@components/CardsContainer';
import { getRandomInt } from 'lib/utils/getRandomInt';
import { useState } from 'react';
import { useEffect } from 'react';
import Head from 'next/head';
import Card from '@components/Card';

export default function Dashboard() {
  const [steps, setSteps] = useState(0);
  const [heartPulse, setHeartPulse] = useState(0);
  const [dummy, setDummy] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSteps(getRandomInt(10000));
      setHeartPulse(getRandomInt(100));
      setDummy(getRandomInt(10000));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>📊 Dashboard | Seren-Up</title>
      </Head>
      <AppShell
        navbar={
          <Navbar
            height={'100vh'}
            width={{ base: '8%' }}
            style={{
              border: 'none',
              backgroundColor: 'lightcoral',
            }}
            p={20}
          >
            <Group
              direction="column"
              position="center"
              style={{ color: 'white', height: '100%' }}
            >
              <p>Primo</p>
              <p style={{ flexGrow: 1 }}>Secondo</p>
              <p>Logout</p>
            </Group>
          </Navbar>
        }
        aside={<User>User data</User>}
        style={{ width: '100vw', height: '100vh', margin: '0' }}
      >
        <Welcome username="Giacomo" />
        <Grid>
          <Grid.Col xs={12} sm={6} md={6} lg={4} xl={4}>
            <Card title="Steps" value={steps} imageSrc="/assets/steps.svg" />
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={6} lg={4} xl={4}>
            <Card
              title="Heart pulse"
              value={heartPulse}
              imageSrc="/assets/steps.svg"
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={6} lg={4} xl={4}>
            <Card title="Dummy" value={dummy} imageSrc="/assets/steps.svg" />
          </Grid.Col>
        </Grid>
      </AppShell>
    </>
  );
}
