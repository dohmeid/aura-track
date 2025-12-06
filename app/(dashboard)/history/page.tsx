import { Metadata } from 'next';
import { RedirectType, redirect } from 'next/navigation';
import { Inbox } from 'lucide-react';
import FilterSortControls from '@/app/components/history/FilterSortControls';
import CalendarHeatmap from '@/app/components/history/CalendarHeatmap';
import MoodEntryCard from '@/app/components/history/MoodEntryCard';
import { getMoodsForUser } from '@/app/actions/mood.actions';
import { getCurrentUser } from '@/app/actions/auth.actions';
import { Mood } from '@/lib/types';
import { JSX } from 'react';

export const metadata: Metadata = {
  title: 'History | AuraTrack',
  description: 'View your mood history and patterns over time.',
};

interface HistoryPageProps {
  searchParams?: { filterBy?: string | string[]; sort?: string | string[] };
}

const HistoryPage = async (props: HistoryPageProps): Promise<JSX.Element> => {
  const { searchParams } = props;
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login', RedirectType.replace);
  }

  // Robustly handle searchParams which may be strings or string[] per Next.js
  const params = searchParams ?? {};
  const firstOrValue = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v);
  const filterBy = firstOrValue(params.filterBy) ?? 'all';
  const sort = firstOrValue(params.sort) ?? 'newest';

  let moods: Mood[] = [];
  let fetchError: string | null = null;
  try {
    moods = await getMoodsForUser({
      userId: user.userId,
      filter: filterBy,
      sort,
    });
  } catch (err) {
    // Log on the server and show a friendly message in the UI
    // eslint-disable-next-line no-console
    console.error('Error fetching moods for user', (err as Error).message || err);
    fetchError = 'Unable to load your mood history. Please try again later.';
  }

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
      <header className="mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Mood History
        </h1>
        <p className="text-gray-500 mt-1">
          Explore your emotional journey through time.
        </p>
      </header>

      {/* Top Section: Heatmap & Controls */}
      <section
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in zoom-in-95 duration-1000 delay-100 fill-mode-backwards"
        aria-label="Mood Visualization and Controls"
      >
        {/* Heatmap takes up 2 columns on large screens */}
        <div className="lg:col-span-2">
          <CalendarHeatmap moods={moods} />
        </div>

        {/* Controls take up 1 column */}
        <div className="h-full">
          <FilterSortControls activeFilter={filterBy} activeSort={sort} />
        </div>
      </section>

      {/* List Section */}
      <section
        className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-backwards"
        aria-label="Mood Entries List"
      >
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-bold text-gray-700">
            {filterBy === 'all'
              ? 'All Entries'
              : `${filterBy.charAt(0).toUpperCase() + filterBy.slice(1)} Entries`}
          </h2>
          <span className="text-sm px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full font-medium">
            {moods?.length ?? 0}
          </span>
        </div>

        {fetchError ? (
          <div
            role="status"
            aria-live="polite"
            className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800"
          >
            {fetchError}
          </div>
        ) : moods && moods.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {moods.map((mood) => (
              <MoodEntryCard key={mood._id} mood={mood} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white/40 backdrop-blur-sm border-2 border-dashed border-gray-200 rounded-3xl text-center">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <Inbox className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600">No moods found</h3>
            <p className="text-gray-500 max-w-sm mx-auto mt-2">
              {filterBy !== 'all'
                ? 'Try changing your filters to see more entries.'
                : "You haven't logged any moods yet. Go to the dashboard to check in!"}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default HistoryPage;