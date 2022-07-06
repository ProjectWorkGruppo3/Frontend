import { Card } from '@mantine/core';
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
} from '@visx/xychart';
import { normalFullTime } from 'utils/date-format';

export interface RemoteDeviceStatsChartProps {
  title: string;
  dataKey: string;
  deviceId: string;
  token: string;
}

export const RemoteDeviceStatsChart = (props: RemoteDeviceStatsChartProps) => {
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
      <XYChart
        height={350}
        xScale={{ type: 'band' }}
        yScale={{ type: 'linear' }}
      >
        <AnimatedAxis orientation="bottom" />
        <AnimatedGrid columns={false} numTicks={4} />
        <AnimatedLineSeries
          dataKey={props.dataKey}
          data={[{ date: new Date(), value: 5 }].map((el) => ({
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
    </Card>
  );
};
