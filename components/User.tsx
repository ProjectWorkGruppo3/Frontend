import { Group } from '@mantine/core';
import React, { Children, PropsWithChildren } from 'react';

export default function User({ children }: PropsWithChildren) {
  return (
    <Group
      dir="column"
      style={{ width: '15%', backgroundColor: 'lightgreen', margin: 0 }}
    >
      {children}
    </Group>
  );
}
