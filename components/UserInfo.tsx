import { Card, Grid, Group, Title, Text, Box } from '@mantine/core';
import { useAuth } from 'context/auth-context';
import React from 'react';

export default function UserInfo() {
  const authContext = useAuth();
  return (
    <Grid style={{ width: '100%' }}>
      <PersonalData
        title="Height"
        value={authContext?.authState?.user.height.toString() || 'N/D'}
        unitOfMeasurement="cm"
      />
      <PersonalData
        title="Weight"
        value={authContext?.authState?.user.weight.toString() || 'N/D'}
        unitOfMeasurement="kg"
      />
      <PersonalData title="Age" value={'10'} />
    </Grid>
  );
}

interface PersonalDataProps {
  title: string;
  value: string;
  unitOfMeasurement?: string;
}

const PersonalData = ({
  title,
  value,
  unitOfMeasurement,
}: PersonalDataProps) => {
  return (
    <Grid.Col xs={12} sm={6} md={6} lg={4} xl={4}>
      <Group direction="column" position="center">
        <Title order={4}>{title}</Title>
        <Group
          position="center"
          style={{
            backgroundColor: 'lightcoral',
            borderRadius: '16px',
            width: '100%',
            textAlign: 'center',
          }}
          px={25}
          py={15}
        >
          <Text size="xl" weight={'bold'} color={'white'} m="0">
            {value}
            {unitOfMeasurement}
          </Text>
        </Group>
      </Group>
    </Grid.Col>
  );
};
