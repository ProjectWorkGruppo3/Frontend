import { Box, Group } from '@mantine/core';
import React, { useState } from 'react';
import { DatePicker } from '@mantine/dates';
import { Calendar, Bell, BellRinging } from 'tabler-icons-react';
interface WelcomeProps {
  username: string;
}

export default function Welcome({ username }: WelcomeProps) {
  const [value, setValue] = useState(null);

  const handleChange = (e: any) => {
    setValue(e);
  };

  return (
    <Group mb={40}>
      <h1 style={{ flexGrow: 1 }}>Welcome back {username}!</h1>
      <DatePicker
        placeholder="Pick date"
        required
        value={value}
        onChange={(e) => handleChange(e)}
        icon={<Calendar />}
      />
      <Group
        position="center"
        style={{
          backgroundColor: '#eee',
          width: 50,
          height: 50,
          borderRadius: '10px',
        }}
      >
        {value != null ? (
          <BellRinging style={{ zIndex: 1 }} color="red" />
        ) : (
          <Bell style={{ zIndex: 1 }} color="red" />
        )}
      </Group>
    </Group>
  );
}
