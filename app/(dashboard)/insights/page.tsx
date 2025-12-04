"use client";
import React, { useState } from 'react';
import { Sparkles, Moon, Zap, TrendingUp, Calendar, Info } from 'lucide-react';
import LineChart from '@/app/components/insights/LineChart';
import BarChart from '@/app/components/insights/BarChart';
import DistributionChart from '@/app/components/insights/DistributionChart';
import InsightCard from '@/app/components/insights/InsightCard';

// --- Skeleton Loader Component ---
const InsightsSkeleton = () => (
    <div className="space-y-6 animate-pulse">
        <div className="flex justify-between items-center">
            <div className="h-8 w-48 bg-gray-200 rounded-xl"></div>
            <div className="h-8 w-32 bg-gray-200 rounded-xl"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-3xl"></div>
            ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-80 bg-gray-200 rounded-3xl"></div>
            <div className="h-80 bg-gray-200 rounded-3xl"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-200 rounded-3xl"></div>
            <div className="h-64 bg-gray-200 rounded-3xl"></div>
        </div>
    </div>
);

// --- Main Page Component ---
export default function InsightsPage() {
    const [days, setDays] = useState<number>(21);
    const [moodSeries, setMoodSeries] = useState<{ x: string; y: number | null }[]>([]);
    const [sleepSeries, setSleepSeries] = useState<{ x: string; y: number | null }[]>([]);
    const [energySeries, setEnergySeries] = useState<{ x: string; y: number | null }[]>([]);
    const [distribution, setDistribution] = useState<{ label: string; value: number }[]>([]);
    const [averages, setAverages] = useState<{ avgMoodRange: number; avgMood7: number } | null>(null);
    const [correlation, setCorrelation] = useState<any>(null);
    const [bestDay, setBestDay] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    React.useEffect(() => {
        let mounted = true;
        setLoading(true);
        setError(null);

        fetch(`/api/insights?days=${days}`)
            .then(async (res) => {
                if (!res.ok) throw new Error(await res.text());
                return res.json();
            })
            .then((data) => {
                if (!mounted) return;
                // Add a small artificial delay to prevent layout thrashing if API is too fast
                // and to let animations play out nicely
                setTimeout(() => {
                    setMoodSeries(data.moodSeries || []);
                    setSleepSeries(data.sleepSeries || []);
                    setEnergySeries(data.energySeries || []);
                    setDistribution(data.distribution || []);
                    setAverages(data.averages || null);
                    setCorrelation(data.correlation || null);
                    setBestDay(data.bestDay || null);
                    setLoading(false);
                }, 300);
            })
            .catch((err) => {
                if (!mounted) return;
                console.error('Failed to load insights', err);
                setError('Failed to load insights. Please try refreshing.');
                setLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, [days]);

    // Derived calculations
    const avgMoodWeek = averages ? averages.avgMood7 : 0;
    const avgMoodAll = averages ? averages.avgMoodRange : 0;
    const avgSleep = React.useMemo(() => {
        const vals = sleepSeries.map((s) => s.y).filter((v) => typeof v === 'number') as number[];
        if (!vals.length) return 0;
        return vals.reduce((a, b) => a + b, 0) / vals.length;
    }, [sleepSeries]);

    const avgEnergy = React.useMemo(() => {
        const vals = energySeries.map((s) => s.y).filter((v) => typeof v === 'number') as number[];
        if (!vals.length) return 0;
        return vals.reduce((a, b) => a + b, 0) / vals.length;
    }, [energySeries]);

    // Helper for trend direction (simplified)
    const moodTrend = avgMoodWeek >= avgMoodAll ? 'Improving' : 'Declining';

    if (loading) {
        return (
            <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
                <InsightsSkeleton />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-10 flex flex-col items-center justify-center text-center">
                <div className="bg-red-50 p-4 rounded-full mb-4">
                    <Info className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-700">Oops!</h3>
                <p className="text-gray-500 mb-4">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-wistful text-white rounded-xl hover:bg-chantilly transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto w-full min-h-screen">

            {/* --- Header Section --- */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
                        <Sparkles className="text-chantilly w-8 h-8" />
                        Aura Insights
                    </h1>
                    <p className="text-gray-500 font-medium mt-1">Uncover patterns in your emotional energy.</p>
                </div>

                <div className="bg-white/60 p-1.5 rounded-xl border border-white/50 flex gap-1 shadow-sm backdrop-blur-sm">
                    {[7, 14, 21, 30].map((d) => (
                        <button
                            key={d}
                            onClick={() => setDays(d)}
                            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 ${d === days
                                    ? 'bg-white text-wistful shadow-sm ring-1 ring-black/5'
                                    : 'text-gray-400 hover:text-gray-600 hover:bg-white/40'
                                }`}
                        >
                            {d}d
                        </button>
                    ))}
                </div>
            </header>

            {/* --- Key Metrics Grid --- */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <InsightCard
                    title="Avg Mood"
                    value={avgMoodWeek.toFixed(1)}
                    hint={moodTrend}
                    icon={TrendingUp}
                    colorClass="text-chantilly"
                    delay={100}
                />
                <InsightCard
                    title="Avg Sleep"
                    value={`${avgSleep.toFixed(1)}h`}
                    hint="Daily average"
                    icon={Moon}
                    colorClass="text-blizzard-blue"
                    delay={150}
                />
                <InsightCard
                    title="Avg Energy"
                    value={`${avgEnergy.toFixed(0)}%`}
                    hint="Energy Level"
                    icon={Zap}
                    colorClass="text-sidecar" // using darker yellow for text visibility
                    delay={200}
                />
                <InsightCard
                    title="Best Day"
                    value={bestDay || '-'}
                    hint="Highest mood score"
                    icon={Calendar}
                    colorClass="text-wistful"
                    delay={250}
                />
            </section>

            {/* --- Main Chart Section --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Aura Flow (Line Chart) */}
                <div className="lg:col-span-2 bg-white/60 backdrop-blur-md border border-white/60 rounded-[30px] p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-500 animate-in fade-in zoom-in-95 delay-300 fill-mode-backwards">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-gray-700">Aura Flow</h2>
                            <p className="text-sm text-gray-400">Mood fluctuation over the last {days} days</p>
                        </div>
                    </div>
                    <div className="h-[280px] w-full">
                        <LineChart data={moodSeries as any} height={280} color="#9fa1d2" />
                    </div>
                </div>

                {/* Emotional Spectrum (Doughnut) */}
                <div className="bg-white/60 backdrop-blur-md border border-white/60 rounded-[30px] p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-500 animate-in fade-in zoom-in-95 delay-400 fill-mode-backwards flex flex-col">
                    <h2 className="text-lg font-bold text-gray-700 mb-1">Emotional Spectrum</h2>
                    <p className="text-sm text-gray-400 mb-6">Distribution of your feelings</p>
                    <div className="flex-1 flex items-center justify-center min-h-[220px]">
                        <DistributionChart data={distribution} />
                    </div>
                </div>
            </div>

            {/* --- Secondary Analysis --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">

                {/* Vitality Trends */}
                <div className="bg-white/60 backdrop-blur-md border border-white/60 rounded-[30px] p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 delay-500 fill-mode-backwards">
                    <h2 className="text-lg font-bold text-gray-700 mb-1">Sleep Patterns</h2>
                    <p className="text-sm text-gray-400 mb-6">Hours slept per night</p>
                    <div className="h-[220px]">
                        <BarChart data={sleepSeries.map((s) => ({ label: String(s.x).slice(5), value: s.y })) as any} height={220} />
                    </div>
                </div>

                {/* Energy Trends */}
                <div className="bg-white/60 backdrop-blur-md border border-white/60 rounded-[30px] p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 delay-600 fill-mode-backwards">
                    <h2 className="text-lg font-bold text-gray-700 mb-1">Energy Levels</h2>
                    <p className="text-sm text-gray-400 mb-6">Daily reported energy %</p>
                    <div className="h-[220px]">
                        <LineChart data={energySeries as any} height={220} color="#f1e6ae" />
                    </div>
                </div>
            </div>

            {/* --- Smart Correlations --- */}
            <section className="bg-white/40 backdrop-blur-sm rounded-[30px] p-6 border border-white/40 animate-in fade-in slide-in-from-bottom-8 delay-700 fill-mode-backwards">
                <div className="flex items-center gap-2 mb-4">
                    <Info className="w-5 h-5 text-wistful" />
                    <h2 className="text-lg font-bold text-gray-700">Quick Insights</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white/50 rounded-2xl border border-white/50">
                        <h4 className="text-sm font-semibold text-gray-500 uppercase">Sleep Correlation</h4>
                        <p className="text-gray-800 font-medium mt-1">
                            {correlation?.sleepMood > 0.3
                                ? "Strong connection: More sleep clearly boosts your mood."
                                : correlation?.sleepMood < -0.3
                                    ? "Unusual: More sleep seems to lower your mood?"
                                    : "No strong link between sleep duration and mood recently."}
                        </p>
                    </div>
                    <div className="p-4 bg-white/50 rounded-2xl border border-white/50">
                        <h4 className="text-sm font-semibold text-gray-500 uppercase">Current Streak</h4>
                        <p className="text-gray-800 font-medium mt-1">
                            Consistency is key. You have logged data for <span className="text-wistful font-bold">{days} days</span> in this view.
                        </p>
                    </div>
                    <div className="p-4 bg-white/50 rounded-2xl border border-white/50">
                        <h4 className="text-sm font-semibold text-gray-500 uppercase">Balance</h4>
                        <p className="text-gray-800 font-medium mt-1">
                            Your average mood is <span className="font-bold">{avgMoodWeek.toFixed(1)}/10</span>.
                            {avgMoodWeek >= 7 ? " You are thriving! 🌟" : avgMoodWeek >= 5 ? " You are holding steady. 🌿" : " Be gentle with yourself. 🤍"}
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
}