import { Box, Container, Grid, Loader, Text, Title } from '@mantine/core';
import { NextPage } from 'next';
import {
  StatCard,
  TitleLink,
  AlarmCard,
  AlarmCardProps,
} from '../../components/administration/index';

import { BsSmartwatch } from 'react-icons/bs';
import { IoBody } from 'react-icons/io5';
import { AiOutlinePercentage } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/auth-context';

const AdministrationPage: NextPage = () => {
  const auth = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (auth && auth.isAuthenticated()) {
      setLoading(false);
    } else {
      router.push('/login').then((_) => setLoading(false));
    }
  }, [auth, router]);
  const testData: AlarmCardProps[] = [
    {
      date: new Date(2022),
      sended: false,
      type: 'fall',
    },
    {
      date: new Date(2022),
      sended: true,
      type: 'heartbeat',
    },
    {
      date: new Date(2022),
      sended: false,
      type: 'low-battery',
    },
    {
      date: new Date(2022),
      sended: false,
      type: 'other',
    },
    {
      date: new Date(2022),
      sended: false,
      type: 'low-battery',
    },
    {
      date: new Date(2022),
      sended: false,
      type: 'fall',
    },
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <Box p="xl">
      <Grid gutter="sm" mb="md">
        <Grid.Col span={9}>
          <Box mb="md">
            <TitleLink
              title="Last alarms saved"
              link="/administration/alarms"
            />
          </Box>
          <Grid align="center">
            {testData.map((el, index) => (
              <Grid.Col span={4} key={index}>
                <AlarmCard sended={el.sended} date={el.date} type={el.type} />
              </Grid.Col>
            ))}
          </Grid>
        </Grid.Col>
        <Grid.Col span={3}>
          <Box px="xl" mx="md" mb="sm">
            <StatCard
              logo={<IoBody size={64} color="green" />}
              statName="Admin Users"
              value={10}
              link="/administration/admins"
            />
          </Box>
          <Box px="xl" mx="md">
            <StatCard
              logo={<BsSmartwatch size={64} color="grey" />}
              statName="Bracelet"
              value={10}
              link="/administration/bracelets"
            />
          </Box>
        </Grid.Col>
      </Grid>
      {/* <Box mb="md">
        <Box>
          <TitleLink link="/administration/reports" title="Report" />
        </Box>
        <Text>Chart</Text>
      </Box>
      <Box mb="md">
        <Grid>
          <Grid.Col span={9}>
            <Box mb="md">
              <TitleLink title="Analysis" link="/administration/analysis" />
            </Box>
            <Text>Chart</Text>
          </Grid.Col>
          <Grid.Col span={3}>
            <Box px="xl" mx="md" mb="sm">
              <StatCard
                logo={<IoBody size={64} color="green" />}
                statName="Avg ..."
                value='10n'
              />
            </Box>
            <Box px="xl" mx="md">
              <StatCard
                logo={<AiOutlinePercentage size={64} color="grey" />}
                statName="%"
                value='70%'
              />
            </Box>
          </Grid.Col>
        </Grid>
      </Box> */}
    </Box>
  );
};

export default AdministrationPage;
