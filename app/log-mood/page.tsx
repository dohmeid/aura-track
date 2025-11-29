import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/app/actions/auth.actions';
import SidebarLayout from '@/app/components/navbar/SidebarLayout';
import MoodForm from '@/app/components/mood/MoodForm';

export default async function LogMoodPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <SidebarLayout user={user}>
      <div className="h-full overflow-y-auto bg-[radial-gradient(circle_at_top_left,var(--blizzard-blue),var(--mint-tulip)_30%,var(--sidecar)_60%,#fff_100%)] p-6 md:p-10">
        <div className="mx-auto max-w-4xl">
          <header className="mb-8">
            <h1 className="text-4xl font-extrabold text-ghost">Log Your Mood</h1>
            <p className="text-gray-600 mt-2">
              Take a moment to reflect — small notes accumulate into meaningful insights.</p>
          </header>
          <MoodForm />
        </div>
      </div>
    </SidebarLayout>

  );
}
