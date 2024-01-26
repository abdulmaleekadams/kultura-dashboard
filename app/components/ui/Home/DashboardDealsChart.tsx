'use client';
import { Card, Col } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import { Text } from '../../Text';
import { Area, AreaConfig } from '@ant-design/plots';
import { DealAggregate, mapDealsData } from '@/utils/helpers';
import { useMemo } from 'react';

const dealStages: DealAggregate[] = [
  {
    closeDateMonth: 1,
    closeDateYear: 2024,
    sum: { value: 50000 },
    state: 'Won',
  },
  {
    closeDateMonth: 2,
    closeDateYear: 2024,
    sum: { value: 30000 },
    state: 'Won',
  },
  {
    closeDateMonth: 2,
    closeDateYear: 2024,
    sum: { value: 15000 },
    state: 'Lost',
  },
  {
    closeDateMonth: 3,
    closeDateYear: 2024,
    sum: { value: 20000 },
    state: 'Won',
  },
  {
    closeDateMonth: 3,
    closeDateYear: 2024,
    sum: { value: 25000 },
    state: 'Lost',
  },
  {
    closeDateMonth: 4,
    closeDateYear: 2024,
    sum: { value: 18000 },
    state: 'Won',
  },
  {
    closeDateMonth: 4,
    closeDateYear: 2024,
    sum: { value: 12000 },
    state: 'Lost',
  },
  {
    closeDateMonth: 5,
    closeDateYear: 2024,
    sum: { value: 22000 },
    state: 'Won',
  },
  {
    closeDateMonth: 5,
    closeDateYear: 2024,
    sum: { value: 10000 },
    state: 'Lost',
  },
  {
    closeDateMonth: 6,
    closeDateYear: 2024,
    sum: { value: 30000 },
    state: 'Won',
  },
  {
    closeDateMonth: 6,
    closeDateYear: 2024,
    sum: { value: 15000 },
    state: 'Lost',
  },
  {
    closeDateMonth: 7,
    closeDateYear: 2024,
    sum: { value: 25000 },
    state: 'Won',
  },
  {
    closeDateMonth: 7,
    closeDateYear: 2024,
    sum: { value: 18000 },
    state: 'Lost',
  },
  {
    closeDateMonth: 8,
    closeDateYear: 2024,
    sum: { value: 20000 },
    state: 'Won',
  },
  {
    closeDateMonth: 8,
    closeDateYear: 2024,
    sum: { value: 12000 },
    state: 'Lost',
  },
  {
    closeDateMonth: 9,
    closeDateYear: 2024,
    sum: { value: 28000 },
    state: 'Won',
  },
  {
    closeDateMonth: 9,
    closeDateYear: 2024,
    sum: { value: 14000 },
    state: 'Lost',
  },
  {
    closeDateMonth: 10,
    closeDateYear: 2024,
    sum: { value: 32000 },
    state: 'Won',
  },
  {
    closeDateMonth: 10,
    closeDateYear: 2024,
    sum: { value: 20000 },
    state: 'Lost',
  },
  {
    closeDateMonth: 11,
    closeDateYear: 2024,
    sum: { value: 35000 },
    state: 'Won',
  },
  {
    closeDateMonth: 11,
    closeDateYear: 2024,
    sum: { value: 18000 },
    state: 'Lost',
  },
];

const DashboardDealsChart = () => {
  const dealData = useMemo(() => {
    return mapDealsData(dealStages, ['Won', 'Lost']);
  }, []);

  const config: AreaConfig = {
    data: dealData,
    xField: 'timeText',
    yField: 'value',
    isStack: false,
    seriesField: 'state',
    startOnZero: false,
    smooth: true,
    legend: {
      offsetY: -6,
    },
    yAxis: {
      tickCount: 4,
      label: {
        formatter: (v: string) => {
          return `$${Number(v) / 1000}k`;
        },
      },
    },
    tooltip: {
      formatter: (data) => {
        return {
          name: data.state,
          value: `$${Number(data.value) / 1000}k`,
        };
      },
    },
  };

  return (
    <Col xs={24} sm={24} xl={16} style={{ height: '460px' }}>
      <Card
        headStyle={{ padding: '8px 16px' }}
        bodyStyle={{ padding: '24px 24px 0 24px' }}
        style={{ height: '100%' }}
        title={
          <div className='flex items-center gap-2'>
            <DollarOutlined />
            <Text size='sm' style={{ marginLeft: '0.5rem' }}>
              Deals
            </Text>
          </div>
        }
      >
        <Area {...config} height={350} />
      </Card>
    </Col>
  );
};

export default DashboardDealsChart;
