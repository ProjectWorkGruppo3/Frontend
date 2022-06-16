import { Box, Container, Grid, Text, Title } from '@mantine/core';
import { NextPage } from 'next';
import {
  StatCard,
  TitleLink,
  AlarmCard,
} from '../components/administration/index';

import { BsSmartwatch } from 'react-icons/bs';
import { IoBody } from 'react-icons/io5';
import { AiOutlinePercentage } from 'react-icons/ai'

const Administration: NextPage = () => {
  return (
    <Box p="xl">
      <Grid gutter="sm" mb="md">
        <Grid.Col span={9}>
          <Box mb="md">
            <TitleLink title="Last alarms saved" link="#" />
          </Box>
          <Grid align="center">
            <Grid.Col span={4}>
              <AlarmCard sended date={new Date()} type="fall" />
            </Grid.Col>
            <Grid.Col span={4}>
              <AlarmCard sended={false} date={new Date()} type="heartbeat" />
            </Grid.Col>
            <Grid.Col span={4}>
              <AlarmCard sended={false} date={new Date()} type="low-battery" />
            </Grid.Col>
            <Grid.Col span={4}>
              <AlarmCard sended date={new Date()} type="other" />
            </Grid.Col>
            <Grid.Col span={4}>
              <AlarmCard sended={false} date={new Date()} type="heartbeat" />
            </Grid.Col>
            <Grid.Col span={4}>
              <AlarmCard sended={false} date={new Date()} type="low-battery" />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={3}>
          <Box px="xl" mx="md" mb="sm">
            <StatCard
              logo={<IoBody size={64} color="green" />}
              statName="Admin Users"
              value={10}
              link='#'
            />
          </Box>
          <Box px="xl" mx="md">
            <StatCard
              logo={<BsSmartwatch size={64} color="grey" />}
              statName="Bracelet"
              value={10}
            />
          </Box>
        </Grid.Col>
      </Grid>
      <Box mb="md">
        <Box>
          <TitleLink link="#" title="Report" />
        </Box>
        <Text>Chart</Text>
      </Box>
      <Box mb="md">
        <Grid>
          <Grid.Col span={9}>
            <Box mb="md">
              <TitleLink title="Analysis" link="#" />
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
      </Box>
    </Box>
  );
};

export default Administration;
