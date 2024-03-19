import {
  DasboardLatestActivities,
  DashboardDealsChart,
  TotalCountCard,
  UpcomingEvents,
} from '@/app/components';
import { getCompanyCount } from '@/app/server/actions';
import { Col, Row } from 'antd';
import React from 'react';

const Dashboard = async() => {
  const companyCount = await getCompanyCount()

  return (
    <div className='flex flex-col gap-y-8'>
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} xl={8}>
          <TotalCountCard resource='companies' totalCount={companyCount} />
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
