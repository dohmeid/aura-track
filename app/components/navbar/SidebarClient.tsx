'use client';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Heart, History, Zap, User } from 'lucide-react';

const iconMap = {
  LayoutDashboard,
  Heart,
  History,
  Zap,
  User,
};

export default function SidebarClient({
  item,
  isCollapsed,
}: {
  item: { label: string; href: string; icon: keyof typeof iconMap };
  isCollapsed: boolean;
}) {
  const router = useRouter();
  const Icon = iconMap[item.icon];

  return (
    <button
      onClick={() => router.push(item.href)}
      className={`group w-full rounded-xl px-4 py-3 font-medium text-foreground transition-colors duration-200 hover:hover-gradient ${
        isCollapsed ? 'flex justify-center' : ''
      }`}
      title={isCollapsed ? item.label : undefined}
    >
      <div className="flex items-center gap-3">
        <Icon
          size={20}
          style={{ color: 'var(--chantilly)' }}
          strokeWidth={2.5}
          className="transition-transform duration-200 group-hover:scale-110"
        />
        {!isCollapsed && (
          <span className="transition-all duration-200 group-hover:translate-x-1">
            {item.label}
          </span>
        )}
      </div>
    </button>
  );
}
