import {
  ActionIcon,
  Box,
  Button,
  Card,
  Center,
  Divider,
  Grid,
  Group,
  Image,
  Text,
  TextInput,
  Title,
  Tooltip,
} from '@mantine/core';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { BsSave } from 'react-icons/bs';
import { User } from '../../models/user';
import { AiOutlineClose } from 'react-icons/ai';
import { AdminUser } from '../../models/admin-user';

export interface UserDetailProps {
  user: AdminUser;
  onSave: (user: AdminUser) => void;
  onDelete: (user: AdminUser) => void;
  onClose: () => void;
}

export const UserDetail = (props: UserDetailProps) => {
  return (
    <Card style={{ height: '100%' }}>
      <Box style={{ height: '10%' }} mb='sm'>
        <Group position="right">
          <ActionIcon onClick={() => props.onClose()}>
            <AiOutlineClose />
          </ActionIcon>
        </Group>
        <Title order={4} mb="xs">
          Detail
        </Title>

        <Divider />
      </Box>
      <Box style={{ height: '80%' }} px='sm'>
        <Grid>
          <Grid.Col span={5}>
            <TextInput
              id="name-input"
              label="Name"
              mb="md"
              value={props.user.name}
            />
            <TextInput
              id="name-input"
              label="Surname"
              mb="md"
              value={props.user.surname}
            />
            <TextInput
              id="email-input"
              label="E-mail"
              placeholder="your@email.com"
              mb="md"
              value={props.user.email}
            />
          </Grid.Col>
          <Grid.Col span={4} offset={2}>
            <Center>
            <Box sx={{ width: '100%', height: '100%' }}>
              <Image  
                radius='xl'
                mb='xs'
                src={props.user.profilePic}
                withPlaceholder={!props.user.profilePic}
                placeholder={<Center mt='md'><Text>Test</Text></Center>}
              />
              <Text align='center'>Change photo profile </Text>
            </Box>
            </Center>
          </Grid.Col>
        </Grid>
      </Box>
      <Group position="right" spacing="xs" style={{ height: '10%' }}>
        <Tooltip label="Delete" position="bottom" placement="end">
          <Button color="red" onClick={() => props.onDelete(props.user)}>
            <AiOutlineUserDelete />
          </Button>
        </Tooltip>
        <Tooltip label="Save" position="bottom" placement="end">
          <Button color="green">
            <BsSave />
          </Button>
        </Tooltip>
      </Group>
    </Card>
  );
};
