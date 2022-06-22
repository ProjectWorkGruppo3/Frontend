import { Group } from '@mantine/core';
import React, { PropsWithChildren } from 'react';

export default function Container({ children }: PropsWithChildren) {
  return (
    <Group
      dir="row"
      align={'flex-start'}
      style={{ width: '100vw', height: '100vh', margin: '0' }}
    >
      {children}
    </Group>
  );
}
