import {
  Button,
  Card,
  Grid,
  Group,
  Modal,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Image from 'next/image';
import { useState } from 'react';
import { BsSmartwatch } from 'react-icons/bs';
import { TiSortAlphabetically } from 'react-icons/ti';

interface FormProps {
  name: string;
  id: string;
}

interface NewDeviceModalProps {
  opened: boolean;
  onSubmit: (name: string, id: string) => Promise<void>;
  onClose: () => void;
}

export const NewDeviceModal = (props: NewDeviceModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const formHandler = useForm<FormProps>({
    initialValues: {
      id: '',
      name: '',
    },
    validate: {
      id: (value) => (value.length !== 0 ? null : 'Please type the device ID'),
      name: (value) =>
        value.length !== 0 ? null : 'Please type the device name',
    },
  });

  const onSubmit = async (values: FormProps) => {
    setLoading(true);

    await props.onSubmit(values.name, values.id);

    formHandler.reset();

    setLoading(false);
  };

  return (
    <Modal
      opened={props.opened}
      onClose={() => props.onClose()}
      size="xl"
      title={<Title order={3}>New Device</Title>}
    >
      <Card radius="md" p="sm">
        <Grid>
          <Grid.Col xs={0} sm={4} md={4} lg={4} xl={4}>
            <Image
              src="/assets/new-device-image.png"
              width="100%"
              height="100%"
              layout="responsive"
              alt="device-image"
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={8} md={8} lg={8} xl={8}>
            <form onSubmit={formHandler.onSubmit(onSubmit)}>
              <TextInput
                id="device-name-input"
                label="Name"
                placeholder="Enter device name"
                mb="md"
                icon={<TiSortAlphabetically size={16} />}
                {...formHandler.getInputProps('name')}
              />

              <TextInput
                id="device-id-input"
                label="Device ID"
                placeholder="Enter Device ID"
                mb="md"
                icon={<BsSmartwatch size={16} />}
                {...formHandler.getInputProps('id')}
              />

              <Group position="right">
                <Button
                  type="submit"
                  loading={loading}
                  sx={{
                    backgroundColor: 'var(--p-color)',
                    ':hover': {
                      backgroundColor: 'var(--p-color)',
                      filter: 'brightness(85%)',
                    },
                  }}
                >
                  <Text color="var(--q-color)">Add Device</Text>
                </Button>
              </Group>
            </form>
          </Grid.Col>
        </Grid>
      </Card>
    </Modal>
  );
};
