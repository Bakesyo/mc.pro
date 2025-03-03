import React from 'react';
import { Link } from 'react-router-dom';
import { Character } from '../types';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const difficultyColor = {
    Easy: 'bg-green-500',
    Medium: 'bg-yellow-500',
    Hard: 'bg-red-500'
  };

  return (
    <Link to={`/character/${character.id}`} className="block">
      <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.03]">
        <div className="h-48 overflow-hidden">
          <img 
            src={character.image} 
            alt={`${character.name} character portrait`} 
            className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white">{character.name}</h3>
            <div className={`${difficultyColor[character.difficulty]} text-xs px-2 py-1 rounded-full text-white`}>
              {character.difficulty}
            </div>
          </div>
          
          <div className="mb-3">
            <span className="inline-block bg-slate-700 text-sm px-3 py-1 rounded-full">
              {character.role}
            </span>
          </div>
          
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {character.description}
          </p>
          
          <div className="text-sm text-gray-400">
            {character.recommendedCrosshairs.length} recommended crosshairs
          </div>
          
          <button className="w-full mt-3 bg-gradient-to-r from-red-500 to-blue-500 hover:from-red-600 hover:to-blue-600 text-white py-2 rounded-md transition-colors">
            View Crosshairs
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CharacterCard;