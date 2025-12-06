'use client';
import React, { useMemo } from 'react';
import { Mood } from '@/lib/types';
import { cn } from '@/lib/utils/insights.utils';
import { toLocalISODate } from '@/lib/utils/timezone.utils';

interface CalendarHeatmapProps {
  moods: Mood[];
}

const getMoodColor = (score: number) => {
  if (score >= 8) return 'bg-[var(--mint-tulip)] hover:bg-[var(--mint-tulip)]/80 ring-[var(--mint-tulip)]';
  if (score >= 6) return 'bg-[var(--blizzard-blue)] hover:bg-[var(--blizzard-blue)]/80 ring-[var(--blizzard-blue)]';
  if (score >= 4) return 'bg-[var(--sidecar)] hover:bg-[var(--sidecar)]/80 ring-[var(--sidecar)]';
  if (score >= 2) return 'bg-[var(--wistful)]/80 hover:bg-[var(--wistful)]/60 ring-[var(--wistful)]';
  return 'bg-[var(--clam-shell)] hover:bg-[var(--clam-shell)]/80 ring-[var(--clam-shell)]';
};

const CalendarHeatmap: React.FC<CalendarHeatmapProps> = ({ moods }) => {

  // using a map for O(1) lookups
  const moodMap = useMemo(() => {
    return moods.reduce((acc, mood) => {
      const date = toLocalISODate(new Date(mood.timestamp));       // normalize date to YYYY-MM-DD using local timezone
      acc[date] = mood.moodScore;
      return acc;
    }, {} as Record<string, number>);
  }, [moods]);

  // Generate calendar grid data for the current year
  const { weeks, monthLabels } = useMemo(() => {
    const today = new Date();
    // Start from Jan 1st of current year
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    // End at Dec 31st
    const endOfYear = new Date(today.getFullYear(), 11, 31);

    const weeksData = [];
    const monthsData = [];

    const currentDate = new Date(startOfYear);

    // Adjust start date to the previous Sunday to align grid
    const dayOfWeek = currentDate.getDay(); // 0 = Sunday
    currentDate.setDate(currentDate.getDate() - dayOfWeek);

    let currentWeek = [];
    let lastMonth = -1;

    // Iterate until we pass the end of the year
    while (currentDate <= endOfYear || currentWeek.length > 0) {
      // Capture month label positions
      const currentMonth = currentDate.getMonth();
      // Only add label if it's the first week of the month and we are still within the year
      if (currentMonth !== lastMonth && currentWeek.length === 0 && currentDate <= endOfYear) {
        monthsData.push({
          label: currentDate.toLocaleString('default', { month: 'short' }),
          index: weeksData.length
        });
        lastMonth = currentMonth;
      }

      const dateString = toLocalISODate(currentDate);
      const isWithinYear = currentDate.getFullYear() === today.getFullYear();

      currentWeek.push({
        date: dateString,
        score: isWithinYear ? moodMap[dateString] : undefined,
        isWithinYear,
        fullDate: new Date(currentDate)
      });

      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);

      // If week is full (7 days), push to weeks array
      if (currentWeek.length === 7) {
        weeksData.push(currentWeek);
        currentWeek = [];

        // Stop if we've gone past end of year
        if (currentDate > endOfYear) break;
      }
    }

    return { weeks: weeksData, monthLabels: monthsData };
  }, [moodMap]);

  // Guard against zero weeks when calculating month label widths
  const totalWeeks = weeks.length || 52;

  // Updated to show all days and align correctly with standard JS getDay() (0=Sunday)
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="p-6 bg-white/60 backdrop-blur-md border border-white/60 rounded-[30px] shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Year in Pixels</h2>
        <div className="text-sm text-gray-500 font-medium">{new Date().getFullYear()}</div>
      </div>

      <div className="flex-1 overflow-x-auto pb-2 scrollbar-hide">
        <div className="min-w-[700px]">
          {/* Month Labels */}
          <div className="flex mb-2 pl-8 text-xs text-gray-400 font-medium">
            {monthLabels.map((m, i) => (
              <div
                key={m.label + i}
                style={{
                  // Distribute labels across the available weeks (safe fallback applied)
                  width: `${(totalWeeks / 12) * 100}%`,
                  flex: 1,
                }}
              >
                {m.label}
              </div>
            ))}
          </div>

          <div className="flex gap-1">
            {/* Day Labels (Left Column) */}
            <div className="flex flex-col gap-1 pt-0.5 pr-2">
              {weekDays.map((day, i) => (
                <div key={i} className="h-3 text-[10px] leading-3 text-gray-400 font-medium text-right w-6">
                  {day}
                </div>
              ))}
            </div>

            {/* The Grid */}
            <div className="flex gap-1 flex-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day) => {
                    if (!day.isWithinYear) {
                      return <div key={day.date} className="w-3 h-3" />; // Invisible spacer
                    }

                    const hasData = day.score !== undefined;
                    const colorClass = hasData ? getMoodColor(day.score!) : 'bg-gray-200/50 hover:bg-gray-200';

                    return (
                      <div
                        key={day.date}
                        tabIndex={0}
                        role="gridcell"
                        aria-label={`${day.fullDate.toDateString()}: ${hasData ? `Mood ${day.score}/10` : 'No data'}`}
                        className={cn(
                          "w-3 h-3 rounded-xs transition-all duration-200 relative group focus:outline-none focus:ring-2 focus:ring-offset-1 focus:z-10",
                          colorClass
                        )}
                      >
                        {/* Custom CSS Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block group-focus:block z-50 w-max px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity">
                          <p className="font-semibold">{day.fullDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
                          <p className="font-light">{hasData ? `Mood: ${day.score}/10` : 'No entry'}</p>
                          {/* Little arrow */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-end items-center flex-wrap gap-4 mt-6 text-xs text-gray-500 font-medium border-t border-gray-100 pt-4">
        <span>Less</span>
        <div className="flex gap-1" aria-hidden="true">
          <div className="w-3 h-3 bg-gray-200/50 rounded-xs" />
          <div className="w-3 h-3 bg-(--clam-shell) rounded-xs" />
          <div className="w-3 h-3 bg-(--wistful)/80 rounded-xs" />
          <div className="w-3 h-3 bg-(--sidecar) rounded-xs" />
          <div className="w-3 h-3 bg-(--blizzard-blue) rounded-xs" />
          <div className="w-3 h-3 bg-(--mint-tulip) rounded-xs" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default CalendarHeatmap;