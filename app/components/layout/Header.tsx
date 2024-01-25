'use client';
import CurrentUser from './CurrentUser';
import { Layout, Space } from 'antd';

const Header = () => {
  return (
    <Layout.Header className='flex justify-end items-center !bg-[#fff] sticky top-0 z-40 shadow'>
      <Space align='center' size={'middle'}>
        <CurrentUser />
      </Space>
    </Layout.Header>
  );
};

export default Header;
