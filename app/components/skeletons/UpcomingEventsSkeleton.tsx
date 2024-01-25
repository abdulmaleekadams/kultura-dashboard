'use client';
import { Badge, List, Skeleton } from 'antd';

const UpcomingEventsSkeleton = () => {
  return Array.from({ length: 5 }).map((_, idx) => (
    <List.Item key={idx}>
      <List.Item.Meta
        avatar={<Badge color='transparent' />}
        title={
          <Skeleton.Button
            active
            style={{
              height: '14px',
            }}
          />
        }
        description={
          <Skeleton.Button
            active
            style={{
              width: '300px',
              marginTop: '8px',
              height: '16px',
            }}
          />
        }
      />
    </List.Item>
  ));
};

export default UpcomingEventsSkeleton;
