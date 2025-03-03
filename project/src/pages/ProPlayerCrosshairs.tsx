import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProPlayerCard from '../components/ProPlayerCard';
import SearchFilter from '../components/SearchFilter';
import { proPlayers } from '../data/proPlayers';
import { CrosshairFilter } from '../types';

const ProPlayerCrosshairs = () => {
  const [filter, setFilter] = useState<CrosshairFilter>({});
  
  const handleFilterChange = (newFilter: CrosshairFilter) => {
    setFilter(newFilter);
  };
  
  // Apply filters
  let playersToDisplay = [...proPlayers];
  
  if (filter.searchTerm) {
    const searchTerm = filter.searchTerm.toLowerCase();
    playersToDisplay = playersToDisplay.filter(player => 
      player.name.toLowerCase().includes(searchTerm) || 
      player.team.toLowerCase().includes(searchTerm)
    );
  }
  
  if (filter.character) {
    playersToDisplay = playersToDisplay.filter(player => 
      player.mainCharacters.includes(filter.character!)
    );
  }
  
  return (
    <>
      <Helmet>
        <title>Pro Player Crosshair Settings | marvelcrosshair.pro</title>
        <meta 
          name="description" 
          content="Discover the exact crosshair settings used by professional Marvel Rivals players. Learn from the best and improve your aim with pro-verified configurations."
        />
        <link rel="canonical" href="https://marvelcrosshair.pro/pro-players" />
      </Helmet>

      <div className="container mx-auto px-6 py-10">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Pro Player Crosshair Settings</h1>
          <p className="text-gray-300 mb-6">
            Discover the exact crosshair settings used by professional Marvel Rivals players. Learn from the best and improve your aim with pro-verified configurations.
          </p>
          
          <SearchFilter 
            onFilterChange={handleFilterChange} 
            showProPlayerFilter={false}
            showStyleFilter={false}
          />
        </div>
        
        {playersToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {playersToDisplay.map(player => (
              <ProPlayerCard key={player.id} proPlayer={player} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No pro players found matching your filters.</p>
            <button 
              onClick={() => setFilter({})} 
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
        
        <div className="mt-16 bg-slate-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">About Our Pro Player Database</h2>
          <p className="text-gray-300 mb-4">
            Our pro player database is regularly updated with verified settings from top Marvel Rivals competitors. We work directly with professional players and teams to ensure the accuracy of all crosshair configurations.
          </p>
          <p className="text-gray-300 mb-4">
            Each pro player profile includes:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-300 space-y-2">
            <li>Verified crosshair settings for their main characters</li>
            <li>Team affiliation and player information</li>
            <li>Social media links to follow their competitive journey</li>
            <li>Regular updates after major tournaments and competitions</li>
          </ul>
          <p className="text-gray-300">
            Are you a professional Marvel Rivals player who would like to be featured in our database? <Link to="/contact" className="text-blue-400 hover:text-blue-300">Contact us</Link> to get your settings verified and added to our collection.
          </p>
        </div>
      </div>
    </>
  );
};

export default ProPlayerCrosshairs;