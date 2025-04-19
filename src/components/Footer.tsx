import React from 'react';
import { Landmark, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Landmark className="h-6 w-6 mr-2" />
            <span className="text-lg font-semibold">Adrian Edu Explorer</span>
          </div>
          
          <div className="flex items-center">
            <p className="text-gray-300 text-sm">
              Made with <Heart className="h-4 w-4 inline text-red-500 mx-1" /> for Kenyan students
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-gray-400 text-sm text-center">
          <p>
            &copy; {new Date().getFullYear()} Adrian Edu Explorer. All rights reserved.
          </p>
          <p className="mt-2">
            This tool is designed to help students find university programmes based on their preferences.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;