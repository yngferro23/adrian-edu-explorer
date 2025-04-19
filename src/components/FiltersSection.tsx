import React from 'react';
import SearchBar from './SearchBar';
import LocationFilter from './LocationFilter';
import CutoffFilter from './CutoffFilter';
import { Filter } from 'lucide-react';

interface FiltersSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  locations: string[];
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  minCutoff: number;
  maxCutoff: number;
  currentMinCutoff: number;
  currentMaxCutoff: number;
  onMinCutoffChange: (value: number) => void;
  onMaxCutoffChange: (value: number) => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (order: 'asc' | 'desc') => void;
  onResetFilters: () => void;
}

const FiltersSection: React.FC<FiltersSectionProps> = ({
  searchTerm,
  onSearchChange,
  locations,
  selectedLocation,
  onLocationChange,
  minCutoff,
  maxCutoff,
  currentMinCutoff,
  currentMaxCutoff,
  onMinCutoffChange,
  onMaxCutoffChange,
  sortOrder,
  onSortOrderChange,
  onResetFilters,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Filter className="h-5 w-5 mr-2 text-yellow-700" />
          <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
        </div>
        <button
          onClick={onResetFilters}
          className="text-sm text-yellow-700 hover:text-yellow-800 font-medium transition duration-150 ease-in-out"
        >
          Reset All
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Programme or Interest
            </label>
            <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <LocationFilter
              locations={locations}
              selectedLocation={selectedLocation}
              onLocationChange={onLocationChange}
            />
          </div>
        </div>
        
        <div>
          <CutoffFilter
            minCutoff={minCutoff}
            maxCutoff={maxCutoff}
            currentMinCutoff={currentMinCutoff}
            currentMaxCutoff={currentMaxCutoff}
            onMinCutoffChange={onMinCutoffChange}
            onMaxCutoffChange={onMaxCutoffChange}
            sortOrder={sortOrder}
            onSortOrderChange={onSortOrderChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FiltersSection;