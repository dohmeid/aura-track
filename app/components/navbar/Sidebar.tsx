'use client';
import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import Avatar from '../navbar/Avatar';
import SidebarClient from './SidebarClient';
import SidebarLogoutButton from '../navbar/SidebarLogoutButton';
import Logo from '../general/Logo';

interface SidebarProps {
  user: {
    userId: string;
    email: string;
    username: string;
  };
}

const navItems = [
  { label: 'Dashboard', icon: 'LayoutDashboard', href: '/home' },
  { label: 'Log Mood', icon: 'Heart', href: '/log-mood' },
  { label: 'History', icon: 'History', href: '/history' },
  { label: 'Insights', icon: 'Zap', href: '/insights' },
] as const;

export default function Sidebar({ user }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`relative flex h-screen flex-col border-r transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-70'}`}
      style={{ background: `var(--dark-blue)` }}
    >
      {/* Content wrapper */}
      <div className="relative z-10 flex h-full flex-col p-4 sm:p-6">
        {/* Header with Logo and Collapse Button */}
        <div className="mb-8 flex items-center justify-between gap-2">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Logo />
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto rounded-lg p-2 transition-all duration-200 hover:bg-mint-tulip/30 active:scale-95"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <ChevronLeft
              size={24}
              className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
              style={{ color: 'var(--chantilly)' }}
            />
          </button>
        </div>

        {/* User Section */}
        <div
          className={`mb-8 flex items-center transition-all duration-300 ${isCollapsed ? 'justify-center' : 'gap-3 rounded-2xl p-4'
            }`}
          style={
            !isCollapsed
              ? {
                background: `linear-gradient(135deg,
                                rgba(243, 178, 221, 0.08) 0%,
                                rgba(196, 242, 232, 0.06) 100%)`,
                border: '1px solid rgba(205, 206, 211, 0.2)',
              }
              : {}
          }
        >
          <Avatar username={user.username} />
          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-sm font-bold text-gray-500">{user.username}</h2>
              <p className="truncate text-xs text-gray-500">{user.email}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <SidebarClient key={item.label} item={item} isCollapsed={isCollapsed} />
          ))}
        </nav>

        {/* Logout Button */}
        <SidebarLogoutButton isCollapsed={isCollapsed} />
      </div>
    </aside>
  );
}
