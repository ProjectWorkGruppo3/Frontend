import {
    Button,
    Card,
    Divider,
    Grid,
    Modal,
    TextInput,
    Title
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { TiSortAlphabetically } from 'react-icons/ti';
import { validateEmail } from 'utils/validations';

interface FormProps {
  name: string;
  surname: string;
  email: string;
}

interface NewAdminUserModalProps {
  opened: boolean;
  onSubmit: (name: string, id: string) => Promise<void>;
  onClose: () => void;
}

export const NewAdminUserModal = (props: NewAdminUserModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const formHandler = useForm<FormProps>({
    initialValues: {
      name: '',
      surname: '',
      email: '',
    },
    validate: {
      name: (value) => (value.length !== 0 ? null : 'Please type the name'),
      surname: (value) => (value.length !== 0 ? null : 'Please type the surname'),
      email: (value) => validateEmail(value) ? null : 'Please, type a valid email',
    },
  });

  const onSubmit = async (values: FormProps) => {
    setLoading(true);

    formHandler.reset();

    setLoading(false);
  };

  return (
    <Modal opened={props.opened} onClose={() => props.onClose()} size="xl">
      <Card radius="md" p="0">
        <Grid>
          <Grid.Col span={3}>ProPic</Grid.Col>
          <Grid.Col span={9}>
            <Title order={2}>New Admin User</Title>
            <Divider />
            <form onSubmit={formHandler.onSubmit(onSubmit)}>
              <TextInput
                id="name-input"
                label="Name"
                description="Name of the admin user"
                placeholder="mario"
                mb="md"
                icon={<TiSortAlphabetically size={16} />}
                {...formHandler.getInputProps('name')}
              />

              <TextInput
                id="surname-input"
                label="Surname"
                description="Surname of the admin user"
                placeholder="red"
                mb="md"
                icon={<TiSortAlphabetically size={16} />}
                {...formHandler.getInputProps('name')}
              />

              <TextInput
                id="email-input"
                label="E-mail"
                description="E-mail you have used to register"
                placeholder="your@email.com"
                mb="md"
                icon={<MdOutlineAlternateEmail size={16} />}
                {...formHandler.getInputProps('email')}
              />

              <Button type="submit" loading={loading}>
                Add User
              </Button>
            </form>
          </Grid.Col>
        </Grid>
      </Card>
    </Modal>
  );
};
