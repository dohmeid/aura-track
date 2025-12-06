"use client";

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarItem {
  label: string;
  value: number;
}

interface Props {
  data: BarItem[];
  height?: number;
}

export default function BarChart({ data, height = 220 }: Props) {
  if (!data || data.length === 0) return <div className="h-full flex items-center justify-center text-sm text-gray-400 italic">No data available</div>;

  const labels = data.map((d) => d.label);
  const dataset = data.map((d) => d.value);

  // Aura Palette Colors
  const activeColor = '#a0dbe9'; // blizzard-blue
  const hoverColor = '#86bada'; // ethereal-blue

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Hours',
        data: dataset,
        backgroundColor: activeColor,
        hoverBackgroundColor: hoverColor,
        borderRadius: 8,
        barThickness: 'flex' as const,
        maxBarThickness: 32,
      },
    ],
  };

  const options = {
    indexAxis: 'x',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: 'rgba(200, 200, 200, 0.4)',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 12,
        displayColors: false,
        callbacks: {
          label: function (tooltipItem: import("chart.js").TooltipItem<"bar">) {
            const v = tooltipItem.parsed.y;
            return v !== null && v !== undefined ? `${v} hrs` : '';
          },
        },
      },
    },
    scales: { 
        x: { 
            grid: { display: false }, 
            ticks: { 
                maxRotation: 0, 
                autoSkip: true,
                color: '#9ca3af',
                font: { size: 10 }
            },
            border: { display: false }
        }, 
        y: { 
            beginAtZero: true, 
            grid: { color: 'rgba(0,0,0,0.04)', borderDash: [5, 5] },
            ticks: {
                color: '#9ca3af',
                font: { size: 10 }
            },
            border: { display: false }
        } 
    },
  } as const;

  return (
    <div className="w-full h-full min-h-[200px]">
      <div style={{ height: '100%', minHeight: height }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}