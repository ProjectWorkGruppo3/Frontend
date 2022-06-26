import { NotificationToast } from '@components/common';
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Center,
  Container,
  Group,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FadeInDiv, RootAnimationDiv, StaggerDiv } from 'animations';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import authService from 'services/auth-service';
import { notifyError, notifySuccess } from 'utils/notify-toast';
import { validateEmail } from 'utils/validations';

interface FormProps {
  email: string;
}

const ForgotPassword: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const formHandler = useForm<FormProps>({
    initialValues: {
      email: '',
    },
    validate: {
      email: (value) =>
        validateEmail(value) ? null : 'Please, type a valid email',
    },
  });

  const onSubmit = async (values: FormProps) => {
    setLoading(true);

    const { data: sended, error } = await authService.forgotPassword({
      email: values.email,
    });

    if (error) {
      notifyError('Something went wrong');
    } else {
      notifySuccess('Reset e-mail sended. Check your mail');
    }

    setTimeout(() => router.push('/login'), 2000);

    setLoading(false);
  };

  return (
    <RootAnimationDiv>
      <Head>
        <title>SerenUp</title>
        <meta name="description" content="Sign In to the Seren Up Web App" />
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <StaggerDiv>
        <Container my="xl">
          <FadeInDiv>
            <Card radius="md">
              <ActionIcon onClick={() => router.push('/login')} mb="xs">
                <IoIosArrowBack />
              </ActionIcon>
              <Container>
                <Title align="center">Reset Password</Title>
              </Container>

              <Center>
                <Box
                  sx={{
                    width: '60%',
                  }}
                  my="md"
                >
                  <Image
                    src="/assets/logo.png"
                    width="100%"
                    height="25%"
                    layout="responsive"
                    alt="logo"
                  />
                </Box>
              </Center>
              <form onSubmit={formHandler.onSubmit(onSubmit)}>
                <TextInput
                  id="email-input"
                  label="E-mail"
                  description="E-mail you have used to register"
                  placeholder="your@email.com"
                  mb="md"
                  icon={<MdOutlineAlternateEmail size={16} />}
                  {...formHandler.getInputProps('email')}
                  sx={{
                    'input:focus': {
                      borderColor: 'orange',
                    },
                  }}
                />
                <Group position="center">
                  <Button type="submit" color="orange" loading={loading}>
                    Send Reset Mail
                  </Button>
                </Group>
              </form>
            </Card>
          </FadeInDiv>
          <NotificationToast />
        </Container>
      </StaggerDiv>
    </RootAnimationDiv>
  );
};

export default ForgotPassword;
