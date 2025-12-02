import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  TeamOutlined,
  ShopOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

export const MENU_ITEMS = [
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
  },
  {
    key: 'students',
    icon: <TeamOutlined />, // Icono de grupo para alumnos
    label: <Link href="/students">Alumnos</Link>,
  },
  {
    key: 'staff',
    icon: <UserOutlined />, // Icono individual para profes
    label: <Link href="/staff">Profesores</Link>,
  },
  {
    key: 'facilities',
    icon: <ShopOutlined />, // Icono de grupo para clubs
    label: <Link href="/facilities">Instalaciones</Link>,
  },
  {
    key: 'calendar',
    icon: <CalendarOutlined />,
    label: <Link href="/calendar">Calendario</Link>,
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: <Link href="/settings">Configuración</Link>,
  },
];

export const USER_PROFILE = {
  name: 'Ernesto M.',
  email: 'ernesto@clubcontrol.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ernesto',
};
