import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { CrosshairFilter } from '../types';
import { characters } from '../data/characters';

interface SearchFilterProps {
  onFilterChange: (filter: CrosshairFilter) => void;
  showCharacterFilter?: boolean;
  showProPlayerFilter?: boolean;
  showStyleFilter?: boolean;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ 
  onFilterChange,
  showCharacterFilter = true,
  showProPlayerFilter = true,
  showStyleFilter = true
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [character, setCharacter] = useState('');
  const [proPlayer, setProPlayer] = useState('');
  const [style, setStyle] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onFilterChange({
      searchTerm: e.target.value,
      character,
      proPlayer,
      style
    });
  };

  const handleFilterChange = () => {
    onFilterChange({
      searchTerm,
      character,
      proPlayer,
      style
    });
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCharacter('');
    setProPlayer('');
    setStyle('');
    onFilterChange({});
    setIsFilterOpen(false);
  };

  const styles = [
    { id: 'dot', name: 'Dot' },
    { id: 'precision', name: 'Precision' },
    { id: 'dynamic', name: 'Dynamic' },
    { id: 'aggressive', name: 'Aggressive' },
    { id: 'minimal', name: 'Minimal' }
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search crosshairs..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="block w-full pl-10 pr-3 py-2 border border-slate-600 rounded-md bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="ml-2 p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md flex items-center"
        >
          <Filter className="h-5 w-5" />
          <span className="ml-1 hidden sm:inline">Filters</span>
        </button>
      </div>

      {isFilterOpen && (
        <div className="mt-3 p-4 bg-slate-700 rounded-md">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white font-medium">Filter Options</h3>
            <button onClick={clearFilters} className="text-sm text-gray-300 hover:text-white flex items-center">
              <X className="h-4 w-4 mr-1" />
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {showCharacterFilter && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Character</label>
                <select
                  value={character}
                  onChange={(e) => setCharacter(e.target.value)}
                  className="block w-full px-3 py-2 border border-slate-600 rounded-md bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Characters</option>
                  {characters.map(char => (
                    <option key={char.id} value={char.id}>{char.name}</option>
                  ))}
                </select>
              </div>
            )}

            {showProPlayerFilter && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Pro Player</label>
                <select
                  value={proPlayer}
                  onChange={(e) => setProPlayer(e.target.value)}
                  className="block w-full px-3 py-2 border border-slate-600 rounded-md bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Pro Players</option>
                  <option value="AimGod">AimGod</option>
                  <option value="WebSlinger">WebSlinger</option>
                  <option value="GreenMachine">GreenMachine</option>
                  <option value="PantherProwl">PantherProwl</option>
                </select>
              </div>
            )}

            {showStyleFilter && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Style</label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="block w-full px-3 py-2 border border-slate-600 rounded-md bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Styles</option>
                  {styles.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleFilterChange}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;