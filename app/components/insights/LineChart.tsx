"use client";

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ScriptableContext
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface Point {
  x: string | number;
  y: number;
}

interface Props {
  data: Point[];
  height?: number;
  color?: string; // Allow overriding color
  maxY?: number; // Allow overriding max Y value
  showAllLabels?: boolean; // Show all x-axis labels
}

export default function LineChart({ data, height = 200, color = '#9fa1d2', maxY = 10, showAllLabels = false }: Props) {
  if (!data || data.length === 0) return <div className="h-full flex items-center justify-center text-sm text-gray-400 italic">No data available for this range</div>;

  const labels = data.map((d) => {
    // Format date nicely if it looks like a date string
    if (typeof d.x === 'string' && d.x.includes('-')) {
        const date = new Date(d.x);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    return String(d.x);
  });
  
  const dataset = data.map((d) => d.y);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Score',
        data: dataset,
        fill: true,
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, `${color}40`); // 25% opacity
          gradient.addColorStop(1, `${color}00`); // 0% opacity
          return gradient;
        },
        borderColor: color,
        borderWidth: 3,
        tension: 0.4, // Smoother curves matches the "Aura" feel
        pointRadius: 4,
        pointBackgroundColor: '#fff',
        pointBorderColor: color,
        pointBorderWidth: 2,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: 'rgba(200, 200, 200, 0.4)',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 12,
        displayColors: false,
        callbacks: {
          label: function (tooltipItem: import("chart.js").TooltipItem<"line">) {
            const v = tooltipItem.parsed.y;
            return `Score: ${v !== null && v !== undefined ? v : '-'}`;
          },
        },
      },
    },
    scales: {
      x: { 
        grid: { display: false }, 
        ticks: { 
            maxRotation: 0, 
            autoSkip: !showAllLabels,
            maxTicksLimit: showAllLabels ? data.length : 7,
            color: '#9ca3af',
            font: { size: 10 }
        } 
      },
      y: {
        grid: { color: 'rgba(0,0,0,0.04)', borderDash: [5, 5] },
        beginAtZero: true,
        max: maxY,
        ticks: {
          stepSize: maxY / 5,
          color: '#9ca3af',
          font: { size: 10 },
          callback: function (value: string | number) {
            return Number(value).toFixed(0);
          },
        },
        border: { display: false }
      },
    },
  } as const;

  return (
    <div className="w-full h-full min-h-[200px]">
      <div style={{ height: '100%', minHeight: height }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}