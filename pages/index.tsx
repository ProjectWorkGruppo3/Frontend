import { Group } from '@mantine/core';
import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <Group position={'center'} align={'center'} style={{ height: '100vh' }}>
      <Link href="/dashboard">User dashboard</Link>
    </Group>
  );
};

export default Home;
