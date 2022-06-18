import { ActionIcon, Card, Divider, Grid, ScrollArea, TextInput, Text } from '@mantine/core';
import { BiSearchAlt } from 'react-icons/bi';
import { RiBookOpenLine } from 'react-icons/ri';
import { User } from '../../models/user';

export interface UserSidebarProps {
  users: User[];
  onSearch: (value: string) => void;
  onClick: (user: User) => void;
}

export const UserSidebar = (props: UserSidebarProps) => {
  return (
    <Card px="xs" style={{ height: '100%' }}>
      <TextInput
        placeholder="Search"
        label="Search"
        mb="xs"
        rightSection={<BiSearchAlt />}
        onChange={(event) => props.onSearch(event.currentTarget.value)}
      />
      <Divider mb="xs" />
      <ScrollArea style={{ height: '100%' }}>
        { props.users.map((user, k) => (
          <Card
            mb="xs"
            shadow="md"
            px="1%"
            py="xs"
            sx={{ backgroundColor: '#F2F3F4' }}
          >
            <Grid align="center" px="sm">
              <Grid.Col span={1}>
                <Text weight="bolder">#{k + 1}</Text>
              </Grid.Col>
              <Grid.Col span={8} offset={1}>
                <Text size="sm">{user.name} {user.surname}</Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <ActionIcon onClick={() => props.onClick(user)}>
                  <RiBookOpenLine />
                </ActionIcon>
              </Grid.Col>
            </Grid>
          </Card>
        ))}
      </ScrollArea>
    </Card>
  );
};
