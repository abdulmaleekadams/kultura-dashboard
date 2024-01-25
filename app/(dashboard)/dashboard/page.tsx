import { DashboardDealsChart, UpcomingEvents } from '@/app/components';
import { Row } from 'antd';
import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <Row gutter={[32, 32]} style={{marginTop: '32px'}}>
        <UpcomingEvents />
        <DashboardDealsChart />
      </Row>
    </div>
  );
};

export default Dashboard;
