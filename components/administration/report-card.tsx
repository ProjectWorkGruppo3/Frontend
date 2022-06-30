import { ActionIcon, Card, Grid, Group, Loader, Text } from '@mantine/core';
import { useState } from 'react';
import { BsDownload } from 'react-icons/bs';
import { Report } from '../../models/report';
import { normalDate } from '../../utils/date-format';

export interface ReportCardProps {
  report: Report;
  download: (filename: string) => Promise<void>
}

export const ReportCard = (props: ReportCardProps) => {

  const [downloading, setDownloading] = useState<boolean>(false);

  const onDownload = async () => {

    setDownloading(true)

    await props.download(props.report.name)

    setDownloading(false)
  }

  return (
    <Card shadow="xl" radius="md" withBorder py="sm">
      <Grid justify="flex-start" align="center">
        <Grid.Col span={10}>
          <Text>{normalDate(props.report.generatedAt)}</Text>
          <Text style={{ fontSize: '2rem' }} weight="bold">
            {normalDate(props.report.generatedAt)}
          </Text>
        </Grid.Col>
      </Grid>
      <Group position="right">
        <ActionIcon onClick={onDownload}>
          {
            downloading
            ?
            <Loader />
            :
            <BsDownload />
          }
        </ActionIcon>
      </Group>
    </Card>
  );
};
