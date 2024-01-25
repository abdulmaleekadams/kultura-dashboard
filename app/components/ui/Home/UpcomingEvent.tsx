'use client'
import { Badge, List } from 'antd';
import React from 'react';
import { Text } from '../../Text';
import { getDate } from '@/utils/helpers';

type Props = {
  item: { color: string; startDate: string; endDate: string; title: string };
};

const UpcomingEvent = ({ item }: Props) => {
  const renderDate = getDate(item.startDate, item.endDate);

  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Badge color={item.color} />}
        title={<Text size='xs'>{renderDate}</Text>}
        description={
          <Text ellipsis={{ tooltip: true }} strong>
            {item.title}
          </Text>
        }
      />
    </List.Item>
  );
};

export default UpcomingEvent;
