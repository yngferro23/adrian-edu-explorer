import React from 'react';
import { Programme } from '../types';
import ProgrammeCard from './ProgrammeCard';
import { AlertCircle } from 'lucide-react';

interface ProgrammesListProps {
  programmes: Programme[];
  loading?: boolean;
}

const ProgrammesList: React.FC<ProgrammesListProps> = ({ programmes, loading = false }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  if (programmes.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-8 rounded-lg text-center">
        <AlertCircle className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
        <h3 className="text-lg font-medium">No programmes found</h3>
        <p className="mt-2 text-yellow-700">Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {programmes.map((programme, index) => (
        <div 
          key={`${programme.programme_name}-${programme.university_name}-${index}`}
          className="animate-fade-in"
          style={{ 
            animation: `fadeIn 0.3s ease-in-out forwards`,
            animationDelay: `${index * 0.05}s`,
            opacity: 0 
          }}
        >
          <ProgrammeCard programme={programme} />
        </div>
      ))}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ProgrammesList;