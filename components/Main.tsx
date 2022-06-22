import { Group } from '@mantine/core';
import React, { PropsWithChildren } from 'react';

export default function Main({ children }: PropsWithChildren) {
  return (
    <Group
      dir="column"
      style={{
        width: '100%',
        margin: 0,
        padding: 0,
      }}
    >
      {children}
    </Group>
  );
}
