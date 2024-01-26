'use client';
import { totalCountVariants } from '@/constants';
import { Card, Skeleton } from 'antd';
import React, { Suspense } from 'react';
import { Text } from '../../Text';
import { Area, AreaConfig } from '@ant-design/plots';

type Props = {
  resource: 'companies' | 'contacts' | 'deals';
  totalCount: number;
};
const TotalCountCard = ({ resource, totalCount }: Props) => {
  const { primaryColor, secondaryColor, icon, title } =
    totalCountVariants[resource];

  const config: AreaConfig = {
    data: totalCountVariants[resource].data,
    xField: 'index',
    yField: 'value',
    appendPadding: [1, 0, 0, 0],
    padding: 0,
    syncViewPadding: true,
    autoFit: true,
    tooltip: false,
    animation: false,
    xAxis: false,
    yAxis: {
      tickCount: 12,
      label: {
        style: {
          stroke: 'transparent',
        },
      },
      grid: {
        line: {
          style: {
            stroke: 'transparent',
          },
        },
      },
    },
    smooth: true,
    line: {
      color: primaryColor,
    },
    areaStyle: () => {
      return {
        fill: `l(270) 0:#fff 0.2${secondaryColor}  1:${primaryColor}`,
      };
    },
  };
  return (
    <Card
      className='h-24'
      bodyStyle={{ padding: '8px 8px 8px 12px' }}
      size='small'
    >
      <div className='flex items-center gap-2 whitespace-nowrap'>
        {icon}
        <Text size='md' className='secondary  ml-2'>
          {title}
        </Text>
      </div>

      <div className='flex justify-between'>
        <Suspense
          fallback={
            <Skeleton.Button style={{ marginTop: '8px', width: '74px' }} />
          }
        >
          <Text
            size='xxl'
            className='flex-1 shrink-0 text-start whitespace-nowrap mt-2 ml-1'
            strong
          >
            {totalCount}
          </Text>
          <Area {...config} style={{width: '50%'}} />
        </Suspense>
      </div>
    </Card>
  );
};

export default TotalCountCard;
