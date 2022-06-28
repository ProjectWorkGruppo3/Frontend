import { ActionIcon, Card, Group, Title } from '@mantine/core';
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries, Tooltip, XYChart
} from '@visx/xychart';
import moment from 'moment';
import { GrClose } from 'react-icons/gr';

export interface LineChartCardProps {
  title: string,
  dataKey: string,
  data: {
    x: string,
    y: number
  }[],
  onClose: () => void
}

export const LineChartCard = (props: LineChartCardProps) => {

  const d = Array.from({ length: 100 }, (v, k) => {
    return {
      x: moment().add(k, 'day').format("YYYY-MM-DD"),
      y: k % 2 === 0 ? k*5 : k
    }
  })

  const data1 = [
    { x: '2020-01-01', y: 50 },
    { x: '2020-01-02', y: 10 },
    { x: '2020-01-03', y: 20 },
  ];

  const data2 = [
    { x: '2020-01-01', y: 30 },
    { x: '2020-01-02', y: 40 },
    { x: '2020-01-03', y: 80 },
  ];

  const accessors = {
    xAccessor: (d: any) => d.x,
    yAccessor: (d: any) => d.y,
  };

  return (
    <Card
      sx={{
        width: '95%'
      }}
    >
      <Group position='right'>
        <ActionIcon onClick={props.onClose}>
          <GrClose />
        </ActionIcon>
      </Group>
      <Title align='center' order={5}>
        {props.title}
      </Title>
      <XYChart
        height={300}
        xScale={{ type: 'band' }}
        yScale={{ type: 'linear' }}
      >
        <AnimatedAxis orientation="bottom" />
        <AnimatedGrid columns={false} numTicks={4} />
        <AnimatedLineSeries dataKey={props.dataKey} data={d} {...accessors} />
        {/* <AnimatedLineSeries dataKey="Line 2" data={data2} {...accessors} /> */}
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
