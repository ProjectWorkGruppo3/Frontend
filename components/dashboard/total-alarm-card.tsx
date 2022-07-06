import { Card, Center, Divider, Text, Title } from '@mantine/core';
import { useState } from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

export interface TotalAlarmCardProps {
  total: number;
  onClick: () => void;
}

export const TotalAlarmCard = (props: TotalAlarmCardProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const onMouseOver = () => setIsHover(true);
  const onMouseOut = () => setIsHover(false);

  return (
    <Card
      shadow={isHover ? 'xl' : 'sm'}
      radius="md"
      p="sm"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      sx={{
        ':hover': {
          cursor: isHover ? 'pointer' : 'default',
          backgroundColor: isHover ? '#dfdfdf' : 'white',
        },
        transition: '0.2s',
        width: '100%',
        height: '100%',
      }}
      onClick={props.onClick}
    >
      <Center mb="xs">
        <RiAlarmWarningFill size={80} />
      </Center>
      <Center mb="xs">
        <Divider sx={{ width: '40%' }} />
      </Center>
      <Title order={3} align="center" mb="xs">
        {props.total}
      </Title>
      <Text align="center" mb="xs" color="#92999b" size="xl">
        Total Alarms
      </Text>
    </Card>
  );
};
