import { Grid, Title, Group, ActionIcon, Divider } from '@mantine/core';
import { MdExitToApp } from 'react-icons/md';
import { IoIosArrowBack } from 'react-icons/io';

export interface HeaderProps {
  title: string;
  onBack?: () => void;
  onLogout: () => void;
}

export const Header = (props: HeaderProps) => {
  return (
    <>
      <Grid>
        <Grid.Col span={10}>
          <Group spacing="xs">
            {props.onBack && (
              <ActionIcon onClick={() => props.onBack!()}>
                <IoIosArrowBack />
              </ActionIcon>
            )}
            <Title order={2}>{props.title}</Title>
          </Group>
        </Grid.Col>
        <Grid.Col span={2}>
          <Group position="right">
            <ActionIcon color="dark" onClick={props.onLogout}>
              <MdExitToApp size={24} />
            </ActionIcon>
          </Group>
        </Grid.Col>
      </Grid>

      <Divider mb="md" />
    </>
  );
};
