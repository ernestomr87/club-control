import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  TeamOutlined,
  ShopOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

export const MENU_ITEMS = [
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
  },
  {
    key: '/dashboard/clubs',
    icon: <ShopOutlined />,
    label: 'Clubs',
  },
  {
    key: '/dashboard/users',
    icon: <TeamOutlined />,
    label: 'Users',
  },
  {
    key: '/dashboard/calendar',
    icon: <CalendarOutlined />,
    label: 'Calendar',
  },
  {
    key: '/dashboard/settings',
    icon: <SettingOutlined />,
    label: 'Settings',
  },
];

export const USER_PROFILE = {
  name: 'Ernesto M.',
  email: 'ernesto@clubcontrol.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ernesto',
};
