import connectDB from '@/lib/mongodb';
import Mood from '@/lib/models/mood.model';
import { verifyTokenServer } from '@/lib/auth.utils';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { toLocalISODate } from '@/lib/timezone.utils';

function startOfDay(d: Date) {
  const n = new Date(d);
  n.setHours(0, 0, 0, 0);
  return n;
}

function isoDate(d: Date) {
  return toLocalISODate(d);
}

function pearson(xs: number[], ys: number[]) {
  if (xs.length === 0 || ys.length === 0 || xs.length !== ys.length) return 0;
  const n = xs.length;
  const meanX = xs.reduce((a, b) => a + b, 0) / n;
  const meanY = ys.reduce((a, b) => a + b, 0) / n;
  let num = 0;
  let denX = 0;
  let denY = 0;
  for (let i = 0; i < n; i++) {
    const dx = xs[i] - meanX;
    const dy = ys[i] - meanY;
    num += dx * dy;
    denX += dx * dx;
    denY += dy * dy;
  }
  const den = Math.sqrt(denX * denY) || 1;
  return num / den;
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const days = Number(url.searchParams.get('days') || '21');

    // get token from cookies and verify (use await cookies() consistently)
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const decoded = await verifyTokenServer(token);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const userId = decoded.userId as string;

    await connectDB();

    const end = startOfDay(new Date());
    const start = startOfDay(new Date(end));
    start.setDate(start.getDate() - (days - 1));

    // Query entries for the user and sort by timestamp ascending
    const entries = await Mood.find({
      userId,
      timestamp: { $gte: start, $lte: new Date() },
    })
      .sort({ timestamp: 1 })
      .lean();

    // debug: number of entries found
    console.debug('INSIGHTS: entries found', entries.length);

    // Prepare series
    const moodSeries: { x: string; y: number | null }[] = [];
    const sleepSeries: { x: string; y: number | null }[] = [];
    const energySeries: { x: string; y: number | null }[] = [];

    // Build map by iso date
    const map = new Map<string, any[]>();
    for (let e of entries) {
      const d = isoDate(new Date(e.timestamp));
      if (!map.has(d)) map.set(d, []);
      const list = map.get(d)!;
      list.push(e);
    }

    for (let i = 0; i < days; i++) {
      const dt = new Date(start);
      dt.setDate(start.getDate() + i);
      const key = isoDate(dt);
      const list = map.get(key) || [];
      if (list.length === 0) {
        moodSeries.push({ x: key, y: null });
        sleepSeries.push({ x: key, y: null });
        energySeries.push({ x: key, y: null });
      } else {
        const avgMood = list.reduce((s, it) => s + (it.moodScore || 0), 0) / list.length;
        const avgSleep = list.reduce((s, it) => s + (it.sleepHours || 0), 0) / list.length;
        const avgEnergy = list.reduce((s, it) => s + (it.energyLevel || 0), 0) / list.length;
        moodSeries.push({ x: key, y: Math.round(avgMood * 10) / 10 });
        sleepSeries.push({ x: key, y: Math.round(avgSleep * 10) / 10 });
        energySeries.push({ x: key, y: Math.round(avgEnergy * 10) / 10 });
      }
    }

    // Distribution across range
    const distributionMap: Record<string, number> = {};
    for (let e of entries) {
      const label = e.moodEmotion || 'Unknown';
      distributionMap[label] = (distributionMap[label] || 0) + 1;
    }
    const distribution = Object.keys(distributionMap).map((k) => ({ label: k, value: distributionMap[k] }));

    // Averages
    const validMoodValues = entries.map((e) => e.moodScore).filter((v) => typeof v === 'number');
    const avgMoodRange = validMoodValues.length ? validMoodValues.reduce((a, b) => a + b, 0) / validMoodValues.length : 0;
    const last7 = validMoodValues.slice(-7);
    const avgMood7 = last7.length ? last7.reduce((a, b) => a + b, 0) / last7.length : avgMoodRange;

    // Correlation sleep vs mood (use per-entry pairs where both present)
    const pairs = entries.filter((e) => typeof e.sleepHours === 'number' && typeof e.moodScore === 'number');
    const sleeps = pairs.map((p) => p.sleepHours as number);
    const moods = pairs.map((p) => p.moodScore as number);
    const sleepMoodCorr = pearson(sleeps, moods);

    // Best day of week
    const byWeek: Record<number, { sum: number; cnt: number }> = {};
    for (let e of entries) {
      if (typeof e.moodScore !== 'number') continue;
      const w = new Date(e.timestamp).getDay();
      if (!byWeek[w]) byWeek[w] = { sum: 0, cnt: 0 };
      byWeek[w].sum += e.moodScore;
      byWeek[w].cnt += 1;
    }
    const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let bestDay = null;
    let bestAvg = -Infinity;
    for (let i = 0; i < 7; i++) {
      if (byWeek[i] && byWeek[i].cnt > 0) {
        const a = byWeek[i].sum / byWeek[i].cnt;
        if (a > bestAvg) {
          bestAvg = a;
          bestDay = weekdayNames[i];
        }
      }
    }

    return NextResponse.json({
      moodSeries,
      sleepSeries,
      energySeries,
      distribution,
      averages: { avgMoodRange, avgMood7 },
      correlation: { sleepMood: sleepMoodCorr },
      bestDay,
    });
  } catch (error) {
    console.error('API_INSIGHTS_ERROR', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
