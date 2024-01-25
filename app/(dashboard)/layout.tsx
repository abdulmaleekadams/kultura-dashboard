'use client'
import { Layout, Menu, theme } from 'antd';

import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

import Header from '../components/layout/Header';
import React from 'react';
import SidebarLinks from '../components/layout/SidebarLink';

const { Content, Footer, Sider } = Layout;

const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UserOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
   const {
     token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();
  return (
    <Layout>
      <Sider
        breakpoint='lg'
        collapsedWidth='0'
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        className='!fixed top-16 min-h-screen'
      >
        <div className='demo-logo-vertical' />
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['4']}
        >
          <SidebarLinks />
          </Menu>
      </Sider>
      <Layout>
        <Header />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            className='tablet:ml-52'
          >
            {children}
            {/* content */}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }} className='tablet:ml-52'>
          Abdulmaleek Adams ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
