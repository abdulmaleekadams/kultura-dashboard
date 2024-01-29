'use client'
import { Layout, Menu, theme } from 'antd';

import Header from '../components/layout/Header';
import SidebarLinks from '../components/layout/SidebarLink';
import React from 'react';

const { Content, Footer, Sider } = Layout;


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
   const {
     token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  return (
    <>
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
        className='!fixed top-16 min-h-screen z-50'
      >
        <div className='demo-logo-vertical' />
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['4']}>
          <SidebarLinks />
        </Menu>
      </Sider>
      <Layout>
        <Header />
        <Content style={{ margin: '100px 16px 0' }}>
          <div
            className='tablet:ml-52 p-6 min-h-96 rounded-lg bg'
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
    </>
  );
};

export default DashboardLayout;
