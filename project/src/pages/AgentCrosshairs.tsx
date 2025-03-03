import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Info } from 'lucide-react';
import CrosshairCard from '../components/CrosshairCard';
import SearchFilter from '../components/SearchFilter';
import { characters } from '../data/characters';
import { CrosshairFilter } from '../types';

const AgentCrosshairs = () => {
  const { agentName } = useParams<{ agentName: string }>();
  const [filter, setFilter] = useState<CrosshairFilter>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Find the character data
  const character = characters.find(c => c.id === agentName);
  
  // If viewing all characters
  const isViewingAll = agentName === 'more';
  
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(code);
    setTimeout(() => setCopiedId(null), 2000);
  };
  
  const handleVote = (id: string) => {
    // In a real app, this would send a request to the server
    console.log(`Voted for crosshair: ${id}`);
  };
  
  const handleFilterChange = (newFilter: CrosshairFilter) => {
    setFilter(newFilter);
  };
  
  // If character not found and not viewing all
  if (!character && !isViewingAll) {
    return (
      <div className="container mx-auto px-6 py-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Character Not Found</h1>
          <p className="text-gray-300 mb-6">The character you're looking for doesn't exist in our database.</p>
          <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    );
  }
  
  // Get crosshairs to display
  let crosshairsToDisplay = isViewingAll 
    ? characters.flatMap(c => c.recommendedCrosshairs.map(crosshair => ({
        ...crosshair,
        characterName: c.name
      })))
    : character!.recommendedCrosshairs;
  
  // Apply filters
  if (filter.searchTerm) {
    const searchTerm = filter.searchTerm.toLowerCase();
    crosshairsToDisplay = crosshairsToDisplay.filter(c => 
      c.name.toLowerCase().includes(searchTerm) || 
      c.code.toLowerCase().includes(searchTerm) ||
      c.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
  
  if (filter.style) {
    crosshairsToDisplay = crosshairsToDisplay.filter(c => 
      c.tags.includes(filter.style!)
    );
  }
  
  return (
    <>
      <Helmet>
        <title>
          {isViewingAll 
            ? 'All Character Crosshairs | marvelcrosshair.pro' 
            : `${character!.name} Crosshairs | marvelcrosshair.pro`}
        </title>
        <meta 
          name="description" 
          content={isViewingAll 
            ? 'Browse all Marvel Rivals character crosshair settings. Find the perfect crosshair for every character and playstyle.' 
            : `Optimize your aim with the best crosshair settings for ${character!.name} in Marvel Rivals. Browse recommended configurations and pro player settings.`}
        />
        <link 
          rel="canonical" 
          href={isViewingAll 
            ? 'https://marvelcrosshair.pro/character/more' 
            : `https://marvelcrosshair.pro/character/${agentName}`}
        />
      </Helmet>

      <div className="container mx-auto px-6 py-10">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {isViewingAll ? 'All Character Crosshairs' : `${character!.name} Crosshairs`}
          </h1>
          
          {!isViewingAll && (
            <div className="bg-slate-800 rounded-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <img 
                    src={character!.image} 
                    alt={character!.name} 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-3/4 md:pl-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-slate-700 text-sm px-3 py-1 rounded-full">
                      {character!.role}
                    </span>
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      character!.difficulty === 'Easy' ? 'bg-green-600' :
                      character!.difficulty === 'Medium' ? 'bg-yellow-600' :
                      'bg-red-600'
                    }`}>
                      {character!.difficulty} Difficulty
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-4">
                    {character!.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-400">
                    <Info className="h-4 w-4 mr-1" />
                    {character!.recommendedCrosshairs.length} recommended crosshairs available
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <SearchFilter 
            onFilterChange={handleFilterChange} 
            showCharacterFilter={isViewingAll}
            showProPlayerFilter={false}
          />
        </div>
        
        {crosshairsToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {crosshairsToDisplay.map(crosshair => (
              <CrosshairCard 
                key={crosshair.id} 
                crosshair={crosshair} 
                onCopy={handleCopy} 
                onVote={handleVote} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No crosshairs found matching your filters.</p>
            <button 
              onClick={() => setFilter({})} 
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AgentCrosshairs;