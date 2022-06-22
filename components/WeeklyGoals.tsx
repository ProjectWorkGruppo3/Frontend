import { Grid, Group, Progress, Text, Title } from '@mantine/core';
import React from 'react';

export default function WeeklyGoals() {
  return (
    <Group style={{ width: '100%' }} direction="column">
      <Title order={3}>Weekly Goals!</Title>
      <GoalProgress title="Steps" goal={70000} progress={3000} />
      <GoalProgress
        title="Gym activity"
        goal={8}
        progress={4}
        unitOfMeasurement="hours"
      />
      <GoalProgress
        title="Sleep"
        goal={56}
        progress={15}
        unitOfMeasurement="hours slept"
      />
    </Group>
  );
}

interface GoalProgressProps {
  title: string;
  goal: number;
  progress: number;
  unitOfMeasurement?: string;
}

const GoalProgress = ({
  title,
  goal,
  progress,
  unitOfMeasurement,
}: GoalProgressProps) => {
  const percentage = Math.round((progress / goal) * 100);
  return (
    <Group
      direction="column"
      style={{ width: '90%' }}
      m={'auto'}
      position="center"
    >
      <Group style={{ width: '100%' }}>
        <Title order={4} style={{ flexGrow: 1 }}>
          {title}
        </Title>
        <Text>
          {progress} <span style={{ fontWeight: 'bold' }}>/</span>
          <span style={{ color: 'red', fontWeight: 'bold' }}>{goal}</span>{' '}
          {unitOfMeasurement}
        </Text>
      </Group>
      <Progress
        value={percentage}
        color="red"
        size={20}
        style={{ width: 'inherit', backgroundColor: 'lightgrey' }}
      />
    </Group>
  );
};
