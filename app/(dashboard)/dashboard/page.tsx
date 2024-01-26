import {
  DashboardDealsChart,
  TotalCountCard,
  UpcomingEvents,
} from '@/app/components';
import { Col, Row } from 'antd';
import React from 'react';

const Dashboard = () => {
  return (
    <div>
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
      <Row gutter={[32, 32]} style={{ marginTop: '32px' }}>
        <UpcomingEvents />
        <DashboardDealsChart />
      </Row>
    </div>
  );
};

export default Dashboard;
