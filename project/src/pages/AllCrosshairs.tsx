import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Copy, Search, Filter, X } from 'lucide-react';
import { crosshairCodes } from '../data/crosshairCodes';
import CaptchaModal from '../components/CaptchaModal';

const AllCrosshairs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [selectedCode, setSelectedCode] = useState('');

  const handleCopyClick = (code: string) => {
    setSelectedCode(code);
    setShowCaptcha(true);
  };

  const handleCaptchaVerify = () => {
    navigator.clipboard.writeText(selectedCode);
    setCopiedId(selectedCode);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setRoleFilter('');
    setDifficultyFilter('');
  };

  // Apply filters
  let filteredCrosshairs = [...crosshairCodes];
  
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredCrosshairs = filteredCrosshairs.filter(
      crosshair => crosshair.name.toLowerCase().includes(term)
    );
  }
  
  if (roleFilter) {
    filteredCrosshairs = filteredCrosshairs.filter(
      crosshair => crosshair.role === roleFilter
    );
  }
  
  if (difficultyFilter) {
    filteredCrosshairs = filteredCrosshairs.filter(
      crosshair => crosshair.difficulty === difficultyFilter
    );
  }

  return (
    <>
      <Helmet>
        <title>Best Marvel Rivals Crosshair Settings | marvelcrosshair.pro</title>
        <meta 
          name="description" 
          content="Dominate with the best Marvel Rivals crosshair settings in  2025. Pro-verified codes for every character to instantly improve your aim accuracy and win more games."
        />
        <meta
          name="keywords"
          content="Marvel Rivals crosshair, best crosshair settings, Marvel Rivals aim guide, pro crosshair codes, Marvel Rivals 2025, aim settings, crosshair generator"
        />
        <link rel="canonical" href="https://marvelcrosshair.pro/all-crosshairs" />
      </Helmet>

      <div className="container mx-auto px-6 py-10">
        <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Ultimate Marvel Rivals Crosshair Settings (2025)</h1>
        
        <div className="mb-8">
          <p className="text-gray-300 mb-6">
            Browse our complete collection of optimized crosshair codes for all Marvel Rivals characters. These settings are used by top players to maximize aim precision and dominate matches.
          </p>
          
          <div className="flex items-center mb-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search characters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="block w-full px-3 py-2 border border-slate-600 rounded-md bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Roles</option>
                    <option value="Damage">Damage</option>
                    <option value="Tank">Tank</option>
                    <option value="Support">Support</option>
                    <option value="Mobility">Mobility</option>
                    <option value="Assassin">Assassin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Difficulty</label>
                  <select
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                    className="block w-full px-3 py-2 border border-slate-600 rounded-md bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Difficulties</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {filteredCrosshairs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-slate-800 rounded-lg overflow-hidden">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Character</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Role</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Difficulty</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Crosshair Code</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {filteredCrosshairs.map((crosshair) => (
                  <tr key={crosshair.characterId} className="hover:bg-slate-750">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img className="h-10 w-10 rounded-full object-cover" src={crosshair.image} alt={crosshair.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{crosshair.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-slate-700">{crosshair.role}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        crosshair.difficulty === 'Easy' ? 'bg-green-700' :
                        crosshair.difficulty === 'Medium' ? 'bg-yellow-700' :
                        'bg-red-700'
                      }`}>
                        {crosshair.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-300 font-mono truncate max-w-[200px]" title={crosshair.code}>
                        {crosshair.code.length > 20 ? `${crosshair.code.substring(0, 20)}...` : crosshair.code}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                      <button
                        onClick={() => handleCopyClick(crosshair.code)}
                        className={`${copiedId === crosshair.code ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} text-white px-3 py-1 rounded-md transition-colors flex items-center`}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        {copiedId === crosshair.code ? 'Copied!' : 'Copy Code'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-800 rounded-lg">
            <p className="text-gray-400 text-lg">No crosshairs found matching your filters.</p>
            <button 
              onClick={clearFilters} 
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
        
        <div className="mt-12 bg-slate-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">How to Use These Crosshair Codes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">PC Users</h3>
              <ol className="space-y-2 text-gray-300 list-decimal pl-5">
                <li>Open Marvel Rivals and navigate to Settings → Keyboard (or your input device settings).</li>
                <li>In the Reticle Save section, select the hero you wish to customize.</li>
                <li>Click Import Save, paste the desired code from above, and confirm.</li>
                <li>Test in the practice range and adjust if necessary.</li>
              </ol>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Console Players</h3>
              <p className="text-gray-300 mb-4">
                Use the above values as a guideline to manually adjust your reticle sliders in the game's settings.
              </p>

              <div className="bg-slate-700 p-4 rounded-md mt-4">
                <p className="text-sm text-gray-300">
                  <strong className="text-yellow-400">Note:</strong> These crosshair codes are based on the current version of Marvel Rivals. Game updates may change how crosshairs work, so check for the latest information if you encounter any issues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CaptchaModal 
        isOpen={showCaptcha}
        onClose={() => setShowCaptcha(false)}
        onVerify={handleCaptchaVerify}
        crosshairCode={selectedCode}
      />
    </>
  );
};

export default AllCrosshairs;