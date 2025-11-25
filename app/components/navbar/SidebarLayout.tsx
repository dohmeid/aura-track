import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { User } from '@/lib/types';

interface SidebarLayoutProps {
  children: ReactNode;
  user: User;
}

export default function SidebarLayout({ children, user }: SidebarLayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar user={user} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
