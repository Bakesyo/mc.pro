import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Twitch, Youtube } from 'lucide-react';
import { ProPlayer } from '../types';
import { characters } from '../data/characters';

interface ProPlayerCardProps {
  proPlayer: ProPlayer;
}

const ProPlayerCard: React.FC<ProPlayerCardProps> = ({ proPlayer }) => {
  // Get character names from IDs
  const mainCharacterNames = proPlayer.mainCharacters.map(id => {
    const character = characters.find(c => c.id === id);
    return character ? character.name : id;
  });

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
      <div className="h-48 overflow-hidden">
        <img 
          src={proPlayer.image} 
          alt={`${proPlayer.name} pro player portrait`} 
          className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white">{proPlayer.name}</h3>
          <div className="bg-blue-600 text-xs px-2 py-1 rounded-full text-white">
            Pro
          </div>
        </div>
        
        <div className="mb-3 text-sm text-gray-400">
          Team: <span className="text-gray-300">{proPlayer.team}</span>
        </div>
        
        <div className="mb-4">
          <div className="text-sm text-gray-400 mb-1">Main Characters:</div>
          <div className="flex flex-wrap gap-1">
            {mainCharacterNames.map((name, index) => (
              <span key={index} className="bg-slate-700 text-xs px-2 py-1 rounded">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProPlayerCard;