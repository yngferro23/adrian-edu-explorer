import React from 'react';
import { ListFilter } from 'lucide-react';

interface ResultsHeaderProps {
  count: number;
  searchTerm: string;
  selectedLocation: string;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({ count, searchTerm, selectedLocation }) => {
  let filterText = '';
  
  if (searchTerm && selectedLocation) {
    filterText = `matching "${searchTerm}" in ${selectedLocation}`;
  } else if (searchTerm) {
    filterText = `matching "${searchTerm}"`;
  } else if (selectedLocation) {
    filterText = `in ${selectedLocation}`;
  }

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          {count} {count === 1 ? 'Programme' : 'Programmes'} {filterText}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Showing all available programmes based on your filters
        </p>
      </div>
      <div className="hidden md:flex items-center bg-yellow-50 text-yellow-800 px-3 py-1.5 rounded-full text-sm">
        <ListFilter className="h-4 w-4 mr-1.5" />
        <span className="font-medium">{count}</span>
        <span className="ml-1">results</span>
      </div>
    </div>
  );
};

export default ResultsHeader;