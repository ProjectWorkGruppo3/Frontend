import { Box } from '@mantine/core';
import React from 'react';

interface WelcomeProps {
  username: string;
}

export default function Welcome({ username }: WelcomeProps) {
  return (
    <Box m={0} p={20}>
      <h1>Welcome back {username}!</h1>
    </Box>
  );
}
