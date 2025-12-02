'use client';

import React from 'react';
import { Layout, Button, Avatar, Dropdown, theme, Breadcrumb } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BellOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { USER_PROFILE } from './constants';

import { logoutAction } from '@/features/auth/actions';

const { Header: AntHeader } = Layout;

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ collapsed, setCollapsed }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = async () => {
    await logoutAction();
  };

  const userMenu = {
    items: [
      {
        key: 'profile',
        label: 'My Profile',
        icon: <UserOutlined />,
      },
      {
        key: 'settings',
        label: 'Settings',
        icon: <SettingOutlined />,
      },
      {
        type: 'divider' as const,
      },
      {
        key: 'logout',
        label: 'Logout',
        icon: <LogoutOutlined />,
        danger: true,
        onClick: handleLogout,
      },
    ],
  };

  return (
    <AntHeader
      style={{
        padding: '0 24px',
        background: colorBgContainer,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 9,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }}
    >
      <div className="flex items-center gap-4">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 48,
            height: 48,
          }}
        />
        <Breadcrumb
          items={[
            { title: 'Dashboard' },
            { title: 'Overview' },
          ]}
          className="hidden md:flex"
        />
      </div>

      <div className="flex items-center gap-4">
        <Button type="text" icon={<BellOutlined />} size="large" className="text-gray-500" />
        
        <Dropdown menu={userMenu} trigger={['click']} placement="bottomRight">
          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
            <Avatar src={USER_PROFILE.avatar} icon={<UserOutlined />} />
            <div className="hidden md:block leading-tight">
              <div className="font-semibold text-sm">{USER_PROFILE.name}</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
          </div>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header;
