import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/app/actions/auth.actions';
import Sidebar from '@/app/components/navbar/Sidebar';

// This layout applies to all pages inside the (dashboard) group
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex h-screen bg-[#f8f9fa]">
      <Sidebar user={user} />
      <main className="flex-1 overflow-y-auto relative">
        {/* We can add a global gradient background for all dashboard pages here if desired */}
        <div className="min-h-full">
           {children}
        </div>
      </main>
    </div>
  );
}