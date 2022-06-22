import { ActionIcon, Divider, Group, Title } from '@mantine/core';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';

export interface TitleLinkProps {
  title: string;
  link: string;
}

export const TitleLink = (props: TitleLinkProps) => {
  const { title, link } = props;

  return (
    <>
      <Group spacing="xs">
        <Title order={3}>{title}</Title>
        <Link href={link}>
          <ActionIcon>
            <FiExternalLink size={20} />
          </ActionIcon>
        </Link>
      </Group>
      <Divider />
    </>
  );
};
