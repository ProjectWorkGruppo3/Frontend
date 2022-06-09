import { Group } from '@mantine/core';
import React, { PropsWithChildren } from 'react';

export default function CardsContainer({ children }: PropsWithChildren) {
  return (
    <Group dir="row" position="left" style={{ width: '100%' }}>
      {children}
    </Group>
  );
}
