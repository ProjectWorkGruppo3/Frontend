import {
    ActionIcon,
  Box,
  Card,
  Center,
  Divider,
  Grid,
  Group,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { NextPage } from 'next';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineUserDelete } from 'react-icons/ai';


const AdminUsersPage: NextPage = () => {
  return (
    <Box py="xl" px='2%'>
      <Grid>
        <Grid.Col span={9}>
          <Stack>
            <Box>
              <Title>Admins</Title>
              <Divider />
            </Box>
            <Box>
              {Array.from({ length: 20 }, (v, k) => (
                <Card mb="sm" shadow="md" radius="lg">
                  <Grid>
                    <Grid.Col span={1}>
                      <Text align="left">#1</Text>
                    </Grid.Col>
                    <Grid.Col span={5}>
                      <Text align="left">User</Text>
                    </Grid.Col>
                    <Grid.Col span={5}>
                      <Text align="left">user@user.user</Text>
                    </Grid.Col>
                    <Grid.Col span={1}>
                      <Group>
                        <ActionIcon color='green'>
                            <FiEdit size={24} />
                        </ActionIcon>
                        <ActionIcon color='red'>
                            <AiOutlineUserDelete size={24} />
                        </ActionIcon>
                      </Group>
                    </Grid.Col>
                  </Grid>
                </Card>
              ))}
            </Box>
          </Stack>
        </Grid.Col>
        <Grid.Col span={1}>
            <Divider orientation='vertical' />
        </Grid.Col>
        <Grid.Col span={2}>
            Cards
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default AdminUsersPage;
