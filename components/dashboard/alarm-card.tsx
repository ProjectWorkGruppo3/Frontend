import { Box, Card, Center, Divider, Title, Tooltip } from '@mantine/core';
import { Alarm } from 'models/alarm';
import { GiFalling } from 'react-icons/gi';
import { MdBattery20 } from 'react-icons/md';
import { RiAlarmWarningLine } from 'react-icons/ri';
import { TbHeartbeat } from 'react-icons/tb';
import { normalFullTime } from 'utils/date-format';

export interface AlarmCardProps {
  alarm: Alarm;
}

export const AlarmCard = (props: AlarmCardProps) => {
  const icon = (() => {
    switch (props.alarm.type) {
      case 'FALL':
        return <GiFalling size={80} />;
      case 'HEARTBEAT':
        return <TbHeartbeat size={80} color="red" />;
      case 'LOW_BATTERY':
        return <MdBattery20 size={80} color="indigo" />;
      default:
        return <RiAlarmWarningLine size={80} />;
    }
  })();

  return (
    <Card shadow="xl" radius="lg">
      <Box mb="xs">
        <Title order={5} align="center">
          {normalFullTime(props.alarm.date)}
        </Title>
      </Box>

      <Center mb="xs">
        <Divider sx={{ width: '40%' }} />
      </Center>

      <Center>
        <Tooltip
          position="bottom"
          placement="center"
          gutter={5}
          label={props.alarm.type}
        >
          {icon}
        </Tooltip>
      </Center>
    </Card>
  );
};
