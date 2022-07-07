import { CircularLoading } from '@components/common';
import { ActionIcon, Alert, Card, Center, Group, Title } from '@mantine/core';
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
} from '@visx/xychart';
import { FadeInDiv } from 'animations';
import { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import statisticService from 'services/stats-service';
import { ChartData } from 'types/services/stats-service';
import { normalFullTime } from 'utils/date-format';

export interface ChartCardRemoteProps {
  title: string;
  dataKey: string;
  token: string;
  onClose: () => void;
}

export const ChartCardRemote = (props: ChartCardRemoteProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [chartData, setChartData] = useState<ChartData[]>();
  const [fetchError, setFetchError] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await statisticService.getChartData({
        token: props.token,
        datakey: props.dataKey,
      });

      if (error) {
        setFetchError(error['message'] ?? 'Failed to fetch chart data');
      } else {
        setChartData(data!);
      }

      setLoading(false);
    };

    fetchData();
  }, [props.dataKey]);

  const accessors = {
    xAccessor: (d: any) => d.x,
    yAccessor: (d: any) => d.y,
  };

  return (
    <Card
      sx={{
        width: '95%',
        backgroundColor: 'var(--fi-color)',
      }}
    >
      <Group position="right">
        <ActionIcon onClick={props.onClose}>
          <GrClose />
        </ActionIcon>
      </Group>
      <Title align="center" order={5}>
        {props.title}
      </Title>
      {loading && (
        <Center>
          <FadeInDiv>
            <CircularLoading />
          </FadeInDiv>
        </Center>
      )}

      {fetchError && <Alert color="red">{fetchError}</Alert>}

      {chartData && (
        <XYChart
          height={300}
          xScale={{ type: 'band' }}
          yScale={{ type: 'linear' }}
        >
          <AnimatedAxis orientation="bottom" />
          <AnimatedGrid columns={false} numTicks={4} />
          <AnimatedLineSeries
            dataKey={props.dataKey}
            data={chartData.map((el) => ({
              x: normalFullTime(el.date),
              y: el.value,
            }))}
            {...accessors}
          />
          <Tooltip
            snapTooltipToDatumX
            snapTooltipToDatumY
            showVerticalCrosshair
            showSeriesGlyphs
            renderTooltip={({ tooltipData, colorScale }) => (
              <div>
                <div style={{ color: 'cadetblue' }}>
                  {tooltipData?.nearestDatum?.key ?? 'Key'}
                </div>
                {accessors.xAccessor(tooltipData?.nearestDatum?.datum)}
                {', '}
                {accessors.yAccessor(tooltipData?.nearestDatum?.datum)}
              </div>
            )}
          />
        </XYChart>
      )}
    </Card>
  );
};
