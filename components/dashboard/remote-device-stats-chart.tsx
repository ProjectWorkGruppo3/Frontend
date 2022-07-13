import { CircularLoading } from '@components/common';
import { Alert, Card, Center, Title } from '@mantine/core';
import { TickLabelProps } from '@visx/axis';
import {
  AnimatedGrid,
  AnimatedLineSeries,
  Axis,
  Tooltip,
  XYChart,
} from '@visx/xychart';
import { useCallback, useEffect, useState } from 'react';
import deviceService from 'services/device-service';
import { ChartData } from 'types/services/stats-service';
export interface RemoteDeviceStatsChartProps {
  title: string;
  dataKey: string;
  deviceId: string;
  token: string;
}

const tickLabelProps: TickLabelProps<any> = (tickValue, tickIndex) =>
  ({
    fill: 'black',
    fontSize: 12,
    fontFamily: 'sans-serif',
    textAnchor: 'start',
    angle: 45,
    dy: tickIndex % 2 === 0 ? '-0.5em' : '0.5em',
  } as const);

export const RemoteDeviceStatsChart = (props: RemoteDeviceStatsChartProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [chartData, setChartData] = useState<ChartData[]>();
  const [fetchError, setFetchError] = useState<string>();

  const fetchNew = useCallback(async () => {
    const { data, error } = await deviceService.getDeviceStatisticChartData({
      token: props.token,
      statisticName: props.dataKey,
      deviceId: props.deviceId,
    });

    if (data) {
      setChartData(data!);
    }
  }, [props.dataKey, props.token, props.deviceId]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { data, error } = await deviceService.getDeviceStatisticChartData({
        token: props.token,
        statisticName: props.dataKey,
        deviceId: props.deviceId,
      });

      if (error) {
        setFetchError(error['message'] ?? 'Failed to fetch chart data');
      } else {
        setChartData(data!);
      }

      setLoading(false);
    };

    fetchData();

    const intervalFetch = setInterval(() => {
      fetchNew();
    }, 5000);

    return () => {
      clearInterval(intervalFetch);
    };
  }, [props.dataKey, fetchNew, props.deviceId, props.token]);

  const accessors = {
    xAccessor: (d: any) => d.x,
    yAccessor: (d: any) => d.y,
  };

  return (
    <Card
      shadow={'xl'}
      radius="md"
      p="sm"
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      {loading && (
        <Center>
          <CircularLoading />
        </Center>
      )}

      {fetchError && <Alert color="red">{fetchError}</Alert>}

      {!loading && chartData && (
        <>
          <Title order={3} align="center">
            {props.dataKey}
          </Title>
          <XYChart
            height={420}
            xScale={{ type: 'band' }}
            yScale={{ type: 'linear' }}
          >
            <Axis orientation="left" />
            <Axis
              orientation="bottom"
              hideAxisLine
              tickLabelProps={tickLabelProps}
            />
            <AnimatedGrid columns={false} numTicks={4} />
            <AnimatedLineSeries
              dataKey={props.dataKey}
              data={chartData.map((el) => ({
                x: el.date,
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
        </>
      )}
    </Card>
  );
};
