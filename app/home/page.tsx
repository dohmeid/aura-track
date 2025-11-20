import { redirect } from 'next/navigation';
import SidebarLayout from '@/app/components/navbar/SidebarLayout';
import { getCurrentUser } from '@/app/actions/auth.actions';
import SuccessMessage from "@/app/components/general/SuccessMessage";

const CUSTOM_COLORS = {
  chantilly: '#f3b2dd',
  wistful: '#9fa1d2',
  sidecar: '#f1e6ae',
  blizzardBlue: '#a0dbe9',
  mintTulip: '#c4f2e8',
  ghost: '#cdced3',
  clamShell: '#d0b4b3',
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  // Get user data server-side
  const user = await getCurrentUser();

  // If not authenticated, redirect to login (middleware should catch this, but just in case)
  if (!user) {
    redirect('/login');
  }

  const params = await searchParams;
  const successType = params.success;
  const isLogin = successType === 'login';
  const isSignup = successType === 'signup';
  const hasSuccess = isLogin || isSignup;

  return (
    <SidebarLayout user={user}>
      <div className="min-h-screen p-8" style={{ backgroundColor: '#f8f9fa' }}>
        {/* Success Message - Client Component */}
        {hasSuccess && (
          <SuccessMessage isLogin={isLogin} />
        )}

        {/* Main Content */}
        <div className="mx-auto max-w-6xl">
          <h1
            className="mb-6 text-4xl font-bold"
            style={{ color: CUSTOM_COLORS.wistful }}
          >
            Welcome to AuraTrack
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            Start tracking your emotional aura and gain insights into your mood patterns.
          </p>

          {/* Quick Start Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Log Your Mood',
                description: 'Record how you are feeling right now',
                color: CUSTOM_COLORS.chantilly,
              },
              {
                title: 'View History',
                description: 'See your mood trends over time',
                color: CUSTOM_COLORS.mintTulip,
              },
              {
                title: 'Get Insights',
                description: 'Understand your emotional patterns',
                color: CUSTOM_COLORS.blizzardBlue,
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
                style={{
                  backgroundColor: card.color + '30',
                  borderLeft: `4px solid ${card.color}`,
                }}
              >
                <h3 className="mb-2 text-xl font-semibold text-gray-800">
                  {card.title}
                </h3>
                <p className="text-gray-600">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
