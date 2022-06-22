import Card from '@components/Card';
import User from '@components/User';
import UserInfo from '@components/UserInfo';
import WeeklyGoals from '@components/WeeklyGoals';
import Welcome from '@components/Welcome';
import {
  AppShell,
  Box,
  Grid,
  Group,
  Navbar,
  Text,
  Title as MantineTitle,
} from '@mantine/core';
import {
  CategoryScale,
  Chart,
  ChartOptions,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
} from 'chart.js';
import { getRandomInt } from 'lib/utils/getRandomInt';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Logout as LogoutIcon,
  Settings as SettingsIcon,
} from 'tabler-icons-react';

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

  const options: ChartOptions = {
    plugins: {
      tooltip: {
        enabled: true,
        mode: 'index',
        position: 'nearest',
      },
    },
  };

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
            width={{ base: '4%' }}
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
              <SettingsIcon
                style={{ marginTop: '20px', marginBottom: '20px' }}
              />
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
            <MantineTitle order={2}>Surname name</MantineTitle>
            <Text>Job</Text>
            <UserInfo />
            <WeeklyGoals />
          </User>
        }
        style={{ width: '100vw', minHeight: '100vh', margin: '0' }}
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
        <Group
          mt={60}
          style={{ width: '100%' }}
          direction="column"
          position="center"
        >
          <MantineTitle order={3}>Your previous location</MantineTitle>
          {/* <MantineTitle order={3}>Your weekly recap</MantineTitle>
          <Grid style={{ width: '100%' }}>
            <Grid.Col xs={12} sm={6} md={6} lg={4} xl={4}>
              <Line data={data} />
            </Grid.Col>
            <Grid.Col xs={12} sm={6} md={6} lg={4} xl={4}>
              <Line data={data} options={options} />
            </Grid.Col>
            <Grid.Col xs={12} sm={6} md={6} lg={4} xl={4}>
              <Line data={data} />
            </Grid.Col>
          </Grid> */}
        </Group>
      </AppShell>
    </Box>
  );
}
