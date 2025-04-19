import { Programme } from '../types';

export const getCutoffColor = (cutoff: number): string => {
  if (cutoff >= 45) return 'text-red-600';
  if (cutoff >= 40) return 'text-orange-500';
  if (cutoff >= 35) return 'text-yellow-600';
  return 'text-green-600';
};

export const getCutoffBgColor = (cutoff: number): string => {
  if (cutoff >= 45) return 'bg-red-100';
  if (cutoff >= 40) return 'bg-orange-100';
  if (cutoff >= 35) return 'bg-yellow-100';
  return 'bg-green-100';
};

export const formatCutoff = (cutoff: number): string => {
  return cutoff.toFixed(3);
};

export const searchProgrammes = (
  programmes: Programme[],
  searchTerm: string,
  location: string,
  minCutoff: number,
  maxCutoff: number
): Programme[] => {
  return programmes.filter((programme) => {
    // Filter by search term (programme name or cluster)
    const matchesSearch = searchTerm === '' || 
      programme.programme_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      programme.cluster.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by location
    const matchesLocation = location === '' || programme.location === location;
    
    // Filter by cutoff range
    const matchesCutoff = 
      programme.cutoff_points >= minCutoff && 
      programme.cutoff_points <= maxCutoff;
    
    return matchesSearch && matchesLocation && matchesCutoff;
  });
};

export const sortProgrammes = (
  programmes: Programme[],
  sortBy: 'asc' | 'desc'
): Programme[] => {
  return [...programmes].sort((a, b) => {
    if (sortBy === 'asc') {
      return a.cutoff_points - b.cutoff_points;
    } else {
      return b.cutoff_points - a.cutoff_points;
    }
  });
};