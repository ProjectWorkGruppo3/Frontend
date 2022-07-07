import { Card, Center, Divider, Text, Title } from '@mantine/core';
import { useState } from 'react';
import { FaQuestion, FaRunning, FaWalking } from 'react-icons/fa';
import { IoMdBed } from 'react-icons/io';
import { RiWheelchairFill } from 'react-icons/ri';
import UserDeviceState from 'types/user-device-state';

export interface StateCardProps {
  state: UserDeviceState;
  // onClick:  () => void
}

export const StateCard = (props: StateCardProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const onMouseOver = () => setIsHover(true);
  const onMouseOut = () => setIsHover(false);

  const icon = (() => {
    switch (props.state) {
      case 'Running':
        return <FaRunning size={80} />;
      case 'Walking':
        return <FaWalking size={80} />;
      case 'Sleeping':
        return <IoMdBed size={80} />;
      case 'Sitting':
        return <RiWheelchairFill size={80} />;
      default:
        return <FaQuestion size={80} />;
    }
  })();

  return (
    <Card
      shadow={isHover ? 'xl' : 'sm'}
      radius="md"
      p="sm"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      sx={{
        transition: '0.2s',
        width: '100%',
        height: '100%',
      }}
    >
      <Title order={3} align="center" mb="xs">
        State
      </Title>
      <Center mb="xs">
        <Divider sx={{ width: '40%' }} />
      </Center>
      <Center mb="xs">{icon}</Center>
      <Text align="center" mb="xs" color="#92999b" size="xl">
        {props.state}
      </Text>
    </Card>
  );
};
