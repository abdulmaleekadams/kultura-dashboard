import Link from 'next/link';
import {
  DashboardOutlined,
  ProjectOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { usePathname } from 'next/navigation';

type Props = {
  icon: React.ReactNode;
  label: string;
  url: string;
};

const sidebarItems = [
  {
    label: 'Dashboard',
    icon: <DashboardOutlined />,
    url: '/dashboard',
  },
  {
    label: 'Companies',
    icon: <ShopOutlined />,
    url: '/companies',
  },
  {
    label: 'Tasks',
    icon: <ProjectOutlined />,
    url: '/tasks',
  },
  {
    label: 'Administration',
    icon: <ProjectOutlined />,
    url: '/administration',
  },
];

const SidebarLink = ({ label, icon, url }: Props) => {
  'use client';
  const path = usePathname();
  return (
    <Link
      href={url}
      className={`flex  items-center gap-x-2 py-3 px-2 rounded textsm ${
        path === url ? 'bg-slate-300' : 'bg-transparent'
      } text-[1rem]`}
    >
      {icon}
      <span className='text-sm'>{label}</span>
    </Link>
  );
};

const SidebarLinks = () => {
  return (
    <div className='flex flex-col px-4 py-8 gap-y-2'>
      {sidebarItems.map(({ label, icon, url }) => (
        <SidebarLink key={url} label={label} icon={icon} url={url} />
      ))}
    </div>
  );
};

export default SidebarLinks;
