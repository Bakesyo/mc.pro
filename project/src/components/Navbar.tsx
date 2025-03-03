import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Crosshair, Users, Shield, Info, List } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-slate-800 py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Crosshair className="h-8 w-8 text-red-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">marvelcrosshair.pro</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
          <div className="relative group">
            <button className="text-gray-300 hover:text-white transition-colors flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              Characters
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-slate-700 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
              <Link to="/character/iron-man" className="block px-4 py-2 text-sm text-gray-300 hover:bg-slate-600">Iron Man</Link>
              <Link to="/character/spider-man" className="block px-4 py-2 text-sm text-gray-300 hover:bg-slate-600">Spider-Man</Link>
              <Link to="/character/hulk" className="block px-4 py-2 text-sm text-gray-300 hover:bg-slate-600">Hulk</Link>
              <Link to="/character/black-panther" className="block px-4 py-2 text-sm text-gray-300 hover:bg-slate-600">Black Panther</Link>
              <Link to="/character/more" className="block px-4 py-2 text-sm text-gray-300 hover:bg-slate-600">View All</Link>
            </div>
          </div>
          <Link to="/all-crosshairs" className="text-gray-300 hover:text-white transition-colors flex items-center">
            <List className="h-4 w-4 mr-1" />
            All Crosshairs
          </Link>
          <Link to="/generator" className="text-gray-300 hover:text-white transition-colors flex items-center">
            <Crosshair className="h-4 w-4 mr-1" />
            Generator
          </Link>
          <Link to="/about" className="text-gray-300 hover:text-white transition-colors flex items-center">
            <Info className="h-4 w-4 mr-1" />
            About
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-300 hover:text-white">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-slate-700 rounded-lg p-4">
          <Link to="/" className="block py-2 text-gray-300 hover:text-white" onClick={toggleMenu}>Home</Link>
          <div className="py-2">
            <button className="flex items-center text-gray-300 hover:text-white w-full text-left">
              <Shield className="h-4 w-4 mr-1" />
              Characters
            </button>
            <div className="pl-6 mt-1 space-y-1">
              <Link to="/character/iron-man" className="block py-1 text-sm text-gray-300 hover:text-white" onClick={toggleMenu}>Iron Man</Link>
              <Link to="/character/spider-man" className="block py-1 text-sm text-gray-300 hover:text-white" onClick={toggleMenu}>Spider-Man</Link>
              <Link to="/character/hulk" className="block py-1 text-sm text-gray-300 hover:text-white" onClick={toggleMenu}>Hulk</Link>
              <Link to="/character/black-panther" className="block py-1 text-sm text-gray-300 hover:text-white" onClick={toggleMenu}>Black Panther</Link>
              <Link to="/character/more" className="block py-1 text-sm text-gray-300 hover:text-white" onClick={toggleMenu}>View All</Link>
            </div>
          </div>
          <Link to="/all-crosshairs" className="block py-2 text-gray-300 hover:text-white flex items-center" onClick={toggleMenu}>
            <List className="h-4 w-4 mr-1" />
            All Crosshairs
          </Link>
          <Link to="/generator" className="block py-2 text-gray-300 hover:text-white flex items-center" onClick={toggleMenu}>
            <Crosshair className="h-4 w-4 mr-1" />
            Generator
          </Link>
          <Link to="/about" className="block py-2 text-gray-300 hover:text-white flex items-center" onClick={toggleMenu}>
            <Info className="h-4 w-4 mr-1" />
            About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;