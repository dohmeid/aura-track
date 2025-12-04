"use client";

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Item {
  label: string;
  value: number;
}

interface Props {
  data: Item[];
}

export default function DistributionChart({ data }: Props) {
    if (!data || data.length === 0) return <div className="h-full flex items-center justify-center text-sm text-gray-400 italic">No entries yet</div>;

  const labels = data.map((d) => d.label);
  const values = data.map((d) => d.value);
  
  // Custom Aura Palette
  const colors = [
    '#f3b2dd', // chantilly
    '#9fa1d2', // wistful
    '#f1e6ae', // sidecar
    '#c4f2e8', // mint-tulip
    '#a0dbe9', // blizzard-blue
    '#d0b4b3', // clam-shell
  ];

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: labels.map((_, i) => colors[i % colors.length]),
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const total = values.reduce((s, v) => s + v, 0) || 1;
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%', // Thinner ring
    plugins: {
      legend: { 
          position: 'right',
          labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 15,
              font: {
                  family: "'Poppins', sans-serif",
                  size: 11
              },
              color: '#4b5563'
          }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        bodyColor: '#4b5563',
        borderColor: 'rgba(200, 200, 200, 0.4)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 12,
        callbacks: {
          label: function (context: any) {
            const idx = context.dataIndex;
            const val = values[idx];
            const pct = Math.round((val / total) * 100);
            return ` ${labels[idx]}: ${val} (${pct}%)`;
          },
        },
      },
    },
    layout: {
        padding: 10
    }
  } as any;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full h-[180px] md:h-[220px]">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
}