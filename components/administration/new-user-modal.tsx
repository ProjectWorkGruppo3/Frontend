import {
  Button,
  Card,
  Divider,
  Grid,
  Modal,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { MdOutlineAlternateEmail, MdPassword } from 'react-icons/md';
import { TiSortAlphabetically } from 'react-icons/ti';
import { AdminUserCreated } from 'types/services/admin-service';
import { validateEmail, validatePassword } from 'utils/validations';

interface FormProps {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface NewAdminUserModalProps {
  opened: boolean;
  onSubmit: (user: AdminUserCreated) => Promise<void>;
  onClose: () => void;
}

export const NewAdminUserModal = (props: NewAdminUserModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const formHandler = useForm<FormProps>({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      name: (value) => (value.length !== 0 ? null : 'Please type the name'),
      surname: (value) =>
        value.length !== 0 ? null : 'Please type the surname',
      email: (value) =>
        validateEmail(value) ? null : 'Please, type a valid email',
      password: (value) => validatePassword(value),
      confirmPassword: (value, values) =>
        value === values.password ? null : 'Passwords not coincide',
    },
  });

  const onSubmit = async (values: FormProps) => {
    setLoading(true);

    await props.onSubmit({
      id: '',
      name: values.name,
      surname: values.surname,
      email: values.email,
      password: values.password,
    });

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
                {...formHandler.getInputProps('surname')}
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

              <PasswordInput
                id="pwd-input"
                label="Password"
                description="Password for the user"
                placeholder="yooursecretpassword"
                mb="md"
                icon={<MdPassword size={16} />}
                {...formHandler.getInputProps('password')}
              />

              <PasswordInput
                id="confirm-pwd-input"
                label="Confirm Password"
                description="Type another time the passowrd"
                placeholder="yooursecretpassword"
                mb="md"
                icon={<MdPassword size={16} />}
                {...formHandler.getInputProps('confirmPassword')}
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
