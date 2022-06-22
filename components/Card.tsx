import React from 'react';
import { Card as MantineCard, Group, Title } from '@mantine/core';
import Image from 'next/image';
interface CardProps {
  title: string;
  value: number;
  imageSrc: string;
}

export default function Card({ title, value, imageSrc }: CardProps) {
  return (
    <MantineCard
      shadow="lg"
      p={40}
      style={{
        height: '200px',
        backgroundColor: 'lightcoral',
        borderRadius: '24px',
        color: 'white',
        transition: '0.5s all',
      }}
      className="mantine-card"
      sx={{
        ':hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <Group>
        <Title order={2} style={{ flexGrow: 1, fontSize: '4xl' }}>
          {value}
        </Title>
        <Group
          position="center"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '12px',
            backgroundColor: 'black',
          }}
        >
          <Image
            src={imageSrc}
            width={36}
            height={36}
            alt="steps"
            color="white"
            style={{ zIndex: 1 }}
          />
        </Group>
      </Group>
      <Title order={3}>{title}</Title>
    </MantineCard>
  );
}