import { Grid, Group } from '@mantine/core';
import Image from 'next/image';
import React, { Children, PropsWithChildren } from 'react';

export default function User({ children }: PropsWithChildren) {
  return (
    <Group
      dir="column"
      style={{
        width: '22%',
        backgroundColor: 'white',
        borderRadius: '24px',
        boxShadow: '0px 0px 24px 12px rgba(0, 0, 0, 0.15)',
      }}
      position="center"
      align={'flex-start'}
      m={'auto'}
      mr={16}
      px={16}
      py={48}
    >
      <Group style={{ width: '100%' }} position="center" direction="column">
        <Image
          src="/assets/user.svg"
          width={200}
          height={200}
          alt="User profile photo"
        />
        {children}
      </Group>
    </Group>
  );
}
