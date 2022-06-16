import { Card, Grid, Title, Text } from '@mantine/core';
import Link from 'next/link';

export interface StatCardProps {
  logo: JSX.Element;
  statName: string;
  value: number | string;
  link?: string;
}

export const StatCard = (props: StatCardProps) => {

  return (
    <Link href={props.link ?? '#'}>
      <Card
        shadow="xl"
        withBorder
        radius="md"
        sx={{
          ':hover': {
            cursor: props.link ? 'pointer' : 'default',
          },
        }}
      >
        <Grid>
          <Grid.Col span={2}>{props.logo}</Grid.Col>
          <Grid.Col span={9} offset={1}>
            <Text size="md">{props.statName}</Text>
            <Text size="xl" weight="bold">
              {props.value}
            </Text>
          </Grid.Col>
        </Grid>
      </Card>
    </Link>
  );
};
