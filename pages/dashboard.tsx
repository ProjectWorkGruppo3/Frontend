import Card from '@components/Card';
import User from '@components/User';
import Welcome from '@components/Welcome';
import { AppShell, Box, Grid, Group, Navbar } from '@mantine/core';
import {
  CategoryScale,
  Chart,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
} from 'chart.js';
import { getRandomInt } from 'lib/utils/getRandomInt';
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Logout as LogoutIcon } from 'tabler-icons-react';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);

export default function Dashboard() {
  const [steps, setSteps] = useState(0);
  const [heartPulse, setHeartPulse] = useState(0);
  const [dummy, setDummy] = useState(0);

  const [chartData, setChartData] = useState<Number[]>([]);

  const data = {
    labels: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    datasets: [
      {
        data: chartData,
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSteps(getRandomInt(10000));
      setHeartPulse(getRandomInt(100));
      setDummy(getRandomInt(10000));
      setChartData(Array.from({ length: 7 }, () => getRandomInt(10000)));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Head>
        <title>📊 Dashboard | Seren-Up</title>
      </Head>
      <AppShell
        navbar={
          <Navbar
            width={{ base: '8%' }}
            style={{
              border: 'none',
              backgroundColor: 'lightcoral',
            }}
          >
            <Group
              direction="column"
              position="center"
              style={{ color: 'white', height: '100%' }}
            >
              <Image
                src="/assets/logo.png"
                width={200}
                height="50%"
                alt="Seren-up logo"
              />
              <p>Secondo</p>
              <LogoutIcon />
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
              imageSrc="/assets/heart-pulse.svg"
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={6} lg={4} xl={4}>
            <Card title="Dummy" value={dummy} imageSrc="/assets/steps.svg" />
          </Grid.Col>
        </Grid>
        <Group position="center" mt={100} style={{ width: '70%' }}>
          <Line data={data} />
        </Group>
      </AppShell>
    </Box>
  );
}
