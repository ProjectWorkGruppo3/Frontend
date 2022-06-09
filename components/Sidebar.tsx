import { Group } from '@mantine/core';
import React from 'react';

export default function Sidebar() {
  return (
    <Group
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        width: '8%',
        height: '100%',
        padding: '20px',
        backgroundColor: 'lightcoral',
        margin: 0,
      }}
      direction={'column'}
    >
      <p>Primo</p>
      <p>Secondo</p>
    </Group>
  );
}
