import {
  ActionIcon,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  ScrollArea,
  Text,
  TextInput,
} from '@mantine/core';
import { BiSearchAlt } from 'react-icons/bi';
import { IoMdPersonAdd } from 'react-icons/io';
import { RiBookOpenLine } from 'react-icons/ri';
import { AdminUser } from '../../models/admin-user';

export interface UserSidebarProps {
  users: AdminUser[];
  onSearch: (value: string) => void;
  onClick: (user: AdminUser) => void;
  onAdd: () => void;
}

export const UserSidebar = (props: UserSidebarProps) => {
  return (
    <Card
      px="xs"
      style={{ height: '100%', backgroundColor: 'var(--fi-color)' }}
    >
      <Group position="right">
        <Button color="green" onClick={props.onAdd}>
          <IoMdPersonAdd size={16} />
        </Button>
      </Group>
      <TextInput
        placeholder="Search"
        label="Search"
        mb="xs"
        rightSection={<BiSearchAlt />}
        onChange={(event) => props.onSearch(event.currentTarget.value)}
      />
      <Divider mb="xs" />
      <ScrollArea style={{ height: '100%' }}>
        {props.users.map((user, index) => (
          <Card
            mb="xs"
            shadow="md"
            px="1%"
            py="xs"
            sx={{ backgroundColor: '#F2F3F4' }}
            key={index}
          >
            <Grid align="center" px="sm">
              <Grid.Col span={1}>
                <Text weight="bolder">#{index + 1}</Text>
              </Grid.Col>
              <Grid.Col span={8} offset={1}>
                <Text size="sm">
                  {user.name} {user.surname}
                </Text>
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
