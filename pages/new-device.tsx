import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { TiSortAlphabetically } from 'react-icons/ti';
import { BsSmartwatch } from 'react-icons/bs';
import { useState } from 'react';

interface FormProps {
  name: string;
  id: string;
}

const NewDevicePage: NextPage = () => {

  const [ loading, setLoading ] = useState<boolean>(false);

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


  const onSubmit = (values: FormProps) => {
    console.log(values);
  }

  return (
    <>
      <Head>
        <title>SerenUp</title>
      </Head>
      <Container my="xl">
        <Card radius="md">
          <Grid>
            <Grid.Col 
              xs={0}
              sm={3}
              md={3}
              lg={3}
              xl={3}
            >
              <Image
                src="/assets/device.png"
                width="100%"
                height="100%"
                layout="responsive"
                alt="device-image"
              />
            </Grid.Col>
            <Grid.Col 
              xs={12}
              sm={9}
              md={9}
              lg={9}
              xl={9}
            >
              <Title order={2}>New Device</Title>
              <Divider />
              <form
                onSubmit={formHandler.onSubmit(onSubmit)}
              >
                <TextInput
                  id="device-name-input"
                  label="Name"
                  description="Name for the device"
                  placeholder="device 1"
                  mb="md"
                  icon={<TiSortAlphabetically size={16} />}
                  {...formHandler.getInputProps('name')}
                />

                <TextInput
                  id="device-id-input"
                  label="Device ID"
                  description="ID of the device"
                  placeholder="123-456-sad-dasd"
                  mb="md"
                  icon={<BsSmartwatch size={16} />}
                  {...formHandler.getInputProps('id')}
                />

              <Button type="submit" loading={loading}>
                Add Device
              </Button>
              </form>
            </Grid.Col>
          </Grid>
        </Card>
      </Container>
    </>
  );
};

export default NewDevicePage;
