'use client';
import React from 'react';
import Link from 'next/link';
import { Filter, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils/insights.utils';

interface FilterSortControlsProps {
  activeFilter: string;
  activeSort: string;
}

const FilterSortControls: React.FC<FilterSortControlsProps> = ({ activeFilter, activeSort }) => {

  const FilterLink = ({ value, label, type }: { value: string, label: string, type: 'filter' | 'sort' }) => {
    const isActive = type === 'filter' ? activeFilter === value : activeSort === value;

    // Construct new params while preserving the other type
    const newFilter = type === 'filter' ? value : activeFilter;
    const newSort = type === 'sort' ? value : activeSort;
    const href = `/history?filterBy=${newFilter}&sort=${newSort}`;

    return (
      <Link
        href={href}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex-1 text-center",
          isActive
            ? "bg-chantilly text-white shadow-md transform scale-105"
            : "text-gray-600 hover:bg-(--wistful)/10 hover:text-gray-900"
        )}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white/60 backdrop-blur-md border border-white/60 rounded-[30px] shadow-sm hover:shadow-lg transition-all duration-300 p-6">

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3 text-gray-400 uppercase tracking-wider text-xs font-bold">
          <Filter size={14} />
          <span>Time Range</span>
        </div>
        <nav className="flex flex-col gap-2 p-1 bg-white/50 rounded-2xl border border-white/40">
          <div className="grid grid-cols-2 gap-2">
            <FilterLink type="filter" value="all" label="All Time" />
            <FilterLink type="filter" value="week" label="Past Week" />
            <FilterLink type="filter" value="month" label="Past Month" />
            <FilterLink type="filter" value="year" label="Past Year" />
          </div>
        </nav>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3 text-gray-400 uppercase tracking-wider text-xs font-bold">
          <ArrowUpDown size={14} />
          <span>Sort Order</span>
        </div>
        <nav className="flex p-1 bg-white/50 rounded-2xl border border-white/40">
          <FilterLink type="sort" value="newest" label="Newest First" />
          <FilterLink type="sort" value="oldest" label="Oldest First" />
        </nav>
      </div>
    </div>
  );
};

export default FilterSortControls;