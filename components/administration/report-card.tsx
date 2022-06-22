import { ActionIcon, Card, Grid, Group, Text } from '@mantine/core';
import { BsDownload } from 'react-icons/bs';
import { Report } from '../../models/report';
import { normalDate } from '../../utils/date-format';

export interface ReportCardProps {
  report: Report;
}

export const ReportCard = (props: ReportCardProps) => {
  return (
    <Card shadow="xl" radius="md" withBorder py="sm">
      <Grid justify="flex-start" align="center">
        <Grid.Col span={10}>
          <Text>{normalDate(props.report.date)}</Text>
          <Text style={{ fontSize: '2rem' }} weight="bold">
            {`Report #${props.report.id}`}
          </Text>
        </Grid.Col>
      </Grid>
      <Group position="right">
        <ActionIcon onClick={() => console.log('download pdf')}>
          <BsDownload />
        </ActionIcon>
      </Group>
    </Card>
  );
};
