import {
  ActionIcon,
  Avatar,
  Divider,
  Grid,
  Group,
  Title,
  Tooltip,
} from '@mantine/core';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';
import { MdExitToApp } from 'react-icons/md';

export interface HeaderProps {
  title: string;
  profile: boolean;
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
            {props.profile && (
              <Link href="/profile">
                <Tooltip
                  position="bottom"
                  placement="center"
                  gutter={5}
                  label="Profile"
                >
                  <Avatar
                    radius="xl"
                    size="sm"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                    sx={{
                      ':hover': {
                        cursor: 'pointer',
                      },
                    }}
                  />
                </Tooltip>
              </Link>
            )}
          </Group>
        </Grid.Col>
      </Grid>

      <Divider mb="md" />
    </>
  );
};
