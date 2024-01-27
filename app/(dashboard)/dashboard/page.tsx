import {
  DasboardLatestActivities,
  DashboardDealsChart,
  TotalCountCard,
  UpcomingEvents,
} from '@/app/components';
import { Col, Row } from 'antd';
import React from 'react';

const Dashboard = () => {
  return (
    <div className='flex flex-col gap-y-8'>
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} xl={8}>
          <TotalCountCard resource='companies' totalCount={200} />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <TotalCountCard resource='contacts' totalCount={140} />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <TotalCountCard resource='deals' totalCount={40} />
        </Col>
      </Row>

      <Row gutter={[32, 32]}>
        <UpcomingEvents />
        <DashboardDealsChart />
      </Row>

      <Row gutter={[32, 32]}>
        <Col xs={24}>
          <DasboardLatestActivities />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
