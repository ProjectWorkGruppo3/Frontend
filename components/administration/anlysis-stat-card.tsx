import { ActionIcon, Card, Group, Stack, Text } from '@mantine/core';
import { EaseInOutDiv } from 'animations';
import { useState } from 'react';
import { BiChevronsDown } from 'react-icons/bi';
import { HiTrendingDown, HiTrendingUp } from 'react-icons/hi';

export interface AnalysisStatCardProps {
  title: string;
  value: string | number;
  trending?: 'up' | 'down';
  onClick?: () => void;
}

export const AnalysisStatCard = (props: AnalysisStatCardProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const onMouseOver = () => setIsHover(true);
  const onMouseOut = () => setIsHover(false);

  const trendingIcon = () => {
    if (!props.trending) {
      return undefined;
    }

    switch (props.trending) {
      case 'up':
        return <HiTrendingUp color="green" />;
      case 'down':
        return <HiTrendingDown color="red" />;
      default:
        return undefined;
    }
  };

  return (
    <Card
      shadow="lg"
      radius="md"
      p="0"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <Group spacing="xs" position="center" align="center">
        <Text
          align="center"
          mt="xs"
          mb="1%"
          weight="bolder"
          size="xl"
          color="#27285C"
        >
          {props.value}
        </Text>
        <Stack justify="flex-end" mt="xs">
          {trendingIcon()}
        </Stack>
      </Group>

      <Text align="center" mb="xs" color="#92999b">
        {props.title}
      </Text>

      {isHover && props.onClick && (
        <Group position="center">
          <EaseInOutDiv>
            <ActionIcon>
              <BiChevronsDown size={24} />
            </ActionIcon>
          </EaseInOutDiv>
        </Group>
      )}
    </Card>
  );
};
