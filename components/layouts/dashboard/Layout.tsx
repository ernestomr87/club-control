'use client';

import React, { useState } from 'react';
import { Layout, ConfigProvider, theme } from 'antd';
import Sidebar from './Sidebar';
import Header from './Header';
import { FlashMessage } from '@/components/ui/FlashMessage';

const { Content } = Layout;

const DashboardLayoutCmp = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2563eb', // blue-600
          fontFamily: 'inherit',
        },
        components: {
          Layout: {
            bodyBg: '#f3f4f6', // gray-100
          },
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }} hasSider>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout
          style={{
            transition: 'all 0.2s',
          }}
        >
          <Header collapsed={collapsed} setCollapsed={setCollapsed} />
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <React.Suspense fallback={null}>
              <FlashMessage />
            </React.Suspense>
            {children}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default DashboardLayoutCmp;