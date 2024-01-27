'use client';
import { Card, List, Space } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import { Text } from '../../Text';
import { Suspense } from 'react';
import { LatestActivitiesSkeleton } from '../..';
import { latestEvents } from '@/mockData';
import dayjs from 'dayjs';
import CustomAvatar from '../../CustomAvatar';

const latestEventsData = latestEvents;
const DasboardLatestActivities = () => {
  return (
    <Card
      style={{ height: '100%' }}
      headStyle={{ padding: '8px 16px' }}
      bodyStyle={{ padding: '0 1rem' }}
      title={
        <div className='flex items-center gap-2'>
          <UnorderedListOutlined />
          <Text size='sm' className='ml-2'>
            Latest Activities
          </Text>
        </div>
      }
    >
      <Suspense fallback={<LatestActivitiesSkeleton />}>
        {latestEventsData?.length === 0 ? (
          <span className='flex justify-center items-center h-32'>
            No Upcoming events
          </span>
        ) : (
          <List itemLayout='horizontal'>
            {latestEventsData.map((item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  title={dayjs(item?.createdAt).format('MMM DD, YYYY - HH:mm')}
                  avatar={
                    <CustomAvatar
                      shape='square'
                      size={48}
                      src={item?.company.avatarUrl}
                      name={item?.company.name}
                    />
                  }
                  description={
                    <Space size={4}>
                      <Text strong>{item.user.name}</Text>
                      <Text >{item.action.toLowerCase()}d</Text>
                      <Text strong>{item.title}</Text>
                      <Text strong>deal</Text>
                      <Text >{item.action === 'CREATE' ? 'in' : 'to'}</Text>
                      <Text strong>{item.stage.title}</Text>
                    </Space>
                  }
                />
              </List.Item>
            ))}
          </List>
        )}
      </Suspense>
    </Card>
  );
};

export default DasboardLatestActivities;
