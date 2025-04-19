import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FiltersSection from './components/FiltersSection';
import ProgrammesList from './components/ProgrammesList';
import ResultsHeader from './components/ResultsHeader';
import Footer from './components/Footer';
import InterestRecommendation from './components/InterestRecommendation';
import { programmesData, uniqueLocations, minCutoff, maxCutoff } from './data/programmesData';
import { searchProgrammes, sortProgrammes } from './utils/helpers';
import { Programme } from './types';

function App() {
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [currentMinCutoff, setCurrentMinCutoff] = useState(minCutoff);
  const [currentMaxCutoff, setCurrentMaxCutoff] = useState(maxCutoff);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // State for filtered programmes
  const [filteredProgrammes, setFilteredProgrammes] = useState<Programme[]>([]);
  const [loading, setLoading] = useState(false);

  // Effect to filter programmes when filters change
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    const timeoutId = setTimeout(() => {
      const filtered = searchProgrammes(
        programmesData,
        searchTerm,
        selectedLocation,
        currentMinCutoff,
        currentMaxCutoff
      );
      
      const sorted = sortProgrammes(filtered, sortOrder);
      setFilteredProgrammes(sorted);
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedLocation, currentMinCutoff, currentMaxCutoff, sortOrder]);

  // Handler to reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedLocation('');
    setCurrentMinCutoff(minCutoff);
    setCurrentMaxCutoff(maxCutoff);
    setSortOrder('desc');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Hero />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <InterestRecommendation programmes={programmesData} />
        
        <FiltersSection
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          locations={uniqueLocations}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          minCutoff={minCutoff}
          maxCutoff={maxCutoff}
          currentMinCutoff={currentMinCutoff}
          currentMaxCutoff={currentMaxCutoff}
          onMinCutoffChange={setCurrentMinCutoff}
          onMaxCutoffChange={setCurrentMaxCutoff}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          onResetFilters={handleResetFilters}
        />
        
        <div className="mt-8">
          <ResultsHeader
            count={filteredProgrammes.length}
            searchTerm={searchTerm}
            selectedLocation={selectedLocation}
          />
          
          <ProgrammesList
            programmes={filteredProgrammes}
            loading={loading}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;