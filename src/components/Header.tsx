import React from 'react';
import { Landmark } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-yellow-600 to-red-800 text-white py-4 shadow-lg">
      <div className="container mx-auto px-4 flex items-center">
        <Landmark className="h-8 w-8 mr-3" />
        <h1 className="text-2xl font-bold">KenyaEdu Explorer</h1>
      </div>
    </header>
  );
};

export default Header;