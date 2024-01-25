import { Card, Col } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import { Text } from '../../Text';
import { Area, AreaConfig } from '@ant-design/plots';

const DashboardDealsChart = () => {
  const config: AreaConfig = {
    data: [],
  };
  return (
    <Col xs={24} sm={24} xl={8} style={{ height: '460px' }}>
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
        <Area {...config} height={255} />
      </Card>
    </Col>
  );
};

export default DashboardDealsChart;
