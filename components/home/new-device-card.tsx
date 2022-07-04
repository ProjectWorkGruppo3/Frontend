import { Card, Group } from '@mantine/core';
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

export interface NewDeviceCardProps {
  onClick: () => void;
}

export const NewDeviceCard = (props: NewDeviceCardProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const onMouseOver = () => setIsHover(true);
  const onMouseOut = () => setIsHover(false);

  return (
    <Card
      shadow={isHover ? 'xl' : 'sm'}
      radius="md"
      withBorder
      onClick={props.onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      sx={{
        ':hover': {
          color: isHover ? 'white' : 'dark',
          backgroundColor: isHover ? 'var(--p-color)' : 'white',
          borderColor: isHover ? 'var(--p-color)' : 'white',
          cursor: 'pointer',
          transition: '0.4s',
        },
      }}
    >
      <Group position="center" grow>
        <AiOutlinePlus color={isHover ? 'white' : 'black'} />
      </Group>
    </Card>
  );
};
