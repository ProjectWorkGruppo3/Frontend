import {
  ActionIcon,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Title,
  Tooltip,
} from '@mantine/core';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { BsSave } from 'react-icons/bs';
import { User } from '../../models/user';
import { AiOutlineClose } from 'react-icons/ai';

export interface UserDetailProps {
  user: User;
  onSave: (user: User) => void;
  onDelete: (user: User) => void;
  onClose: () => void;
}

export const UserDetail = (props: UserDetailProps) => {
  return (
    <Card style={{ height: '100%' }}>
      <Box style={{ height: '10%' }}>
        <Group position="right">
          <ActionIcon onClick={() => props.onClose()}>
            <AiOutlineClose />
          </ActionIcon>
        </Group>
        <Title order={4} mb="xs">
          {`${props.user.name} ${props.user.surname}`}
        </Title>

        <Divider />
      </Box>
      <Box style={{ height: '80%' }}>Content</Box>
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
