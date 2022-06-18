import { ActionIcon, Card, Grid, Text } from '@mantine/core';
import { AiOutlinePlus } from 'react-icons/ai';

export interface NewDeviceCardProps {
  onClick: () => void
}

export const NewDeviceCard = (props: NewDeviceCardProps) => {
  return (
    <Card shadow="lg" radius="md" withBorder>
      <Grid align="center">
        <Grid.Col px="0" xs={4} sm={12} md={4} lg={4} xl={3}>
          <Text></Text>
        </Grid.Col>
        <Grid.Col px="0" xs={7} sm={11} md={6} lg={7} xl={8}>
          <Text align="left" size="md" weight="bold">
            New Device
          </Text>
        </Grid.Col>
        <Grid.Col px="0" xs={1} sm={1} md={1} lg={1} xl={1}>
            <ActionIcon onClick={props.onClick}>
              <AiOutlinePlus size={24} />
            </ActionIcon>
        </Grid.Col>
      </Grid>
    </Card>
  );
};
