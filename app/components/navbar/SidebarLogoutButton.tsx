'use client';
import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { logout } from '@/app/actions/auth.actions';

function SidebarLogoutButton({ isCollapsed }: { isCollapsed: boolean }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={`group w-full rounded-xl px-4 py-3 font-medium text-foreground transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 bg-logout-gradient ${
        isCollapsed ? 'flex justify-center' : ''
      }`}
      title={isCollapsed ? 'Logout' : undefined}
    >
      <div className="flex items-center justify-center gap-2">
        <LogOut
          size={18}
          strokeWidth={2.5}
          className="transition-transform duration-200 group-hover:rotate-12"
        />
        {!isCollapsed && <span>{isLoading ? 'Logging out...' : 'Logout'}</span>}
      </div>
    </button>
  );
}

export default SidebarLogoutButton;
