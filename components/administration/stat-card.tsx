import { ActionIcon, Card, Grid, Text } from '@mantine/core';
import { IoIosArrowForward } from 'react-icons/io';

export interface StatCardProps {
  name: string;
  value: number | string;
  onClick?: () => void;
}

export const StatCard = (props: StatCardProps) => {
  return (
    <Card shadow="xl" radius="md">
      <Grid justify="flex-start" align="center">
        <Grid.Col span={10}>
          <Text>{props.name}</Text>
          <Text 
            style={{ fontSize: '2rem' }} 
            weight="bold"
            sx={{
              textOverflow:'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap'
            }}
          >
            {props.value}
          </Text>
        </Grid.Col>
        {props.onClick && (
          <Grid.Col span={2}>
            <ActionIcon onClick={() => props.onClick!()}>
              <IoIosArrowForward />
            </ActionIcon>
          </Grid.Col>
        )}
      </Grid>
    </Card>
  );
};
