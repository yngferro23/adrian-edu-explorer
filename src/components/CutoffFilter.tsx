import React from 'react';
import { ArrowDownAZ, ArrowUpZA } from 'lucide-react';

interface CutoffFilterProps {
  minCutoff: number;
  maxCutoff: number;
  currentMinCutoff: number;
  currentMaxCutoff: number;
  onMinCutoffChange: (value: number) => void;
  onMaxCutoffChange: (value: number) => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (order: 'asc' | 'desc') => void;
}

const CutoffFilter: React.FC<CutoffFilterProps> = ({
  minCutoff,
  maxCutoff,
  currentMinCutoff,
  currentMaxCutoff,
  onMinCutoffChange,
  onMaxCutoffChange,
  sortOrder,
  onSortOrderChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">Cut-off Points Range</h3>
        <div className="flex space-x-2 items-center">
          <button
            className={`p-1.5 rounded ${
              sortOrder === 'asc' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => onSortOrderChange('asc')}
            title="Sort by cut-off points (lowest first)"
          >
            <ArrowDownAZ className="h-4 w-4" />
          </button>
          <button
            className={`p-1.5 rounded ${
              sortOrder === 'desc' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => onSortOrderChange('desc')}
            title="Sort by cut-off points (highest first)"
          >
            <ArrowUpZA className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-500">{currentMinCutoff.toFixed(2)}</span>
        <span className="text-sm text-gray-500">{currentMaxCutoff.toFixed(2)}</span>
      </div>
      <div className="flex space-x-4">
        <input
          type="range"
          min={minCutoff}
          max={maxCutoff}
          step={0.5}
          value={currentMinCutoff}
          onChange={(e) => onMinCutoffChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-600"
        />
        <input
          type="range"
          min={minCutoff}
          max={maxCutoff}
          step={0.5}
          value={currentMaxCutoff}
          onChange={(e) => onMaxCutoffChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-600"
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>Min</span>
        <span>Max</span>
      </div>
    </div>
  );
};

export default CutoffFilter;