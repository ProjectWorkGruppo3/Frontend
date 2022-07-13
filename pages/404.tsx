import { Title, Center, Box, Group, Text } from '@mantine/core';
import { EaseInOutDiv, Floating } from 'animations';
import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <Link href={'/'}>
      <Group
        direction="column"
        position="center"
        align="center"
        sx={{
          backgroundColor: 'var(--fi-color)',
          minHeight: '100vh',
          height: '100%',
        }}
        p="lg"
        mb="xl"
      >
        <EaseInOutDiv>
          <Center>
            <Floating>
              <Box py="xl">
                <img src="/assets/facepalm-guy.png" alt="illustration-image" />
              </Box>
            </Floating>
          </Center>
        </EaseInOutDiv>
        <Title order={1}>Ops! Looks like you&apos;re lost</Title>
        <Text>Press me to go to the home page</Text>
      </Group>
    </Link>
  );
}
