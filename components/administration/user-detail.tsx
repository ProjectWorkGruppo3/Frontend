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
import { useForm } from '@mantine/form';
import { AiOutlineClose, AiOutlineUserDelete } from 'react-icons/ai';
import { BsSave } from 'react-icons/bs';
import { AdminUser } from '../../models/admin-user';
import { validateEmail } from '../../utils/validations';

export interface UserDetailProps {
  user: AdminUser;
  onSave: (user: AdminUser) => void;
  onDelete: (user: AdminUser) => void;
  onClose: () => void;
}

interface FormProps {
  name: string;
  surname: string;
  email: string;
}

export const UserDetail = (props: UserDetailProps) => {
  const formHandler = useForm<FormProps>({
    initialValues: {
      email: props.user.email,
      name: props.user.name,
      surname: props.user.surname,
    },
    validate: {
      email: (value) =>
        validateEmail(value) ? null : 'Please, type a valid email',
    },
  });

  const onSubmit = async (values: FormProps) => {
    console.log(values);
  };

  return (
    <Card style={{ height: '100%' }}>
      <form
        onSubmit={formHandler.onSubmit(onSubmit)}
        style={{ height: '100%' }}
      >
        <Box style={{ height: '10%' }} mb="sm">
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
        <Box style={{ height: '80%' }} px="sm">
          <Grid>
            <Grid.Col span={5}>
              <TextInput
                id="name-input"
                label="Name"
                mb="md"
                {...formHandler.getInputProps('name')}
              />
              <TextInput
                id="name-input"
                label="Surname"
                mb="md"
                {...formHandler.getInputProps('surname')}
              />
              <TextInput
                id="email-input"
                label="E-mail"
                placeholder="your@email.com"
                mb="md"
                {...formHandler.getInputProps('email')}
              />
            </Grid.Col>
            <Grid.Col span={4} offset={2}>
              <Center>
                <Box sx={{ width: '100%', height: '100%' }}>
                  <Image
                    radius="xl"
                    mb="xs"
                    src={props.user.profilePic}
                    withPlaceholder={!props.user.profilePic}
                    placeholder={
                      <Center mt="md">
                        <Text>Test</Text>
                      </Center>
                    }
                    alt="profile-pic"
                  />
                  <Text align="center">Change photo profile </Text>
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
            <Button color="green" type="submit">
              <BsSave />
            </Button>
          </Tooltip>
        </Group>
      </form>
    </Card>
  );
};
