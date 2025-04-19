import React from 'react';
import { BookOpen } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-yellow-50 to-white py-10 px-4 md:py-16">
      <div className="container mx-auto max-w-4xl text-center">
        <BookOpen className="h-16 w-16 mx-auto mb-4 text-yellow-700" />
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Find Your Perfect University Programme
        </h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Explore and filter through university programmes across Kenya based on your interests,
          location preferences, and cut-off points.
        </p>
        <div className="bg-white p-4 rounded-lg shadow-md inline-flex items-center">
          <span className="text-sm font-medium text-gray-600 mr-2">Tip:</span>
          <span className="text-sm text-gray-500">
            Use the filters below to narrow down your search and find the perfect programme.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;