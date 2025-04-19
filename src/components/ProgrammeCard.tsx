import React from 'react';
import { School, BookOpen, MapPin, BarChart3, Tag } from 'lucide-react';
import { Programme } from '../types';
import { getCutoffColor, getCutoffBgColor, formatCutoff } from '../utils/helpers';

interface ProgrammeCardProps {
  programme: Programme;
}

const ProgrammeCard: React.FC<ProgrammeCardProps> = ({ programme }) => {
  const cutoffColor = getCutoffColor(programme.cutoff_points);
  const cutoffBgColor = getCutoffBgColor(programme.cutoff_points);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 flex-1">
            {programme.programme_name}
          </h3>
          <div className={`${cutoffBgColor} ${cutoffColor} text-sm font-bold px-2.5 py-1 rounded-full`}>
            {formatCutoff(programme.cutoff_points)}
          </div>
        </div>
        
        <div className="space-y-2 mt-3">
          <div className="flex items-center text-gray-600">
            <School className="h-4 w-4 mr-2 text-yellow-700" />
            <span className="text-sm">{programme.university_name}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-yellow-700" />
            <span className="text-sm">{programme.location}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Tag className="h-4 w-4 mr-2 text-yellow-700" />
            <span className="text-sm">{programme.cluster}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
        <div className="flex items-center">
          <BarChart3 className="h-4 w-4 mr-2 text-yellow-600" />
          <span className="text-xs text-gray-500">
            Cut-off Points: <span className={cutoffColor}>{formatCutoff(programme.cutoff_points)}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgrammeCard;