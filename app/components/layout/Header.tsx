'use client';
import CurrentUser from './CurrentUser';
import { Layout, Space } from 'antd';

const Header = () => {
  return (
    <Layout.Header className='flex justify-end items-center !bg-[#fff] fixed top-0 z-40 shadow !w-[100vw]'>
      <Space align='center' size={'middle'}>
        <CurrentUser />
      </Space>
    </Layout.Header>
  );
};

export default Header;
