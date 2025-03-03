import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Crosshair as CrosshairIcon, Users, Shield, ArrowRight, List } from 'lucide-react';
import CharacterCard from '../components/CharacterCard';
import CrosshairCard from '../components/CrosshairCard';
import { characters } from '../data/characters';

const Home = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Get featured crosshairs (highest voted from each character)
  const featuredCrosshairs = characters
    .map(character => {
      const highestVoted = [...character.recommendedCrosshairs].sort((a, b) => b.votes - a.votes)[0];
      return { ...highestVoted, characterName: character.name };
    })
    .slice(0, 4);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(code);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleVote = (id: string) => {
    // In a real app, this would send a request to the server
    console.log(`Voted for crosshair: ${id}`);
  };

  return (
    <>
      <Helmet>
        <title>Best Marvel Rivals Crosshair Settings | marvelcrosshair.pro</title>
        <meta name="description" content="Dominate with the best Marvel Rivals crosshair settings in 2025. Pro-verified codes for every character to instantly improve your aim accuracy and win more games." />
        <meta name="keywords" content="Marvel Rivals crosshair, best crosshair settings, Marvel Rivals aim guide, pro crosshair codes, Marvel Rivals 2025, aim settings, crosshair generator" />
        <link rel="canonical" href="https://marvelcrosshair.pro/" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 py-20">
        <div className="absolute inset-0 bg-[url('https://cdn.marvel-rivals.com/images/home/hero-bg.webp')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Best Marvel Rivals Crosshair Settings
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Dominate with pro-verified crosshair codes for every character. Instantly improve your aim accuracy and win more games.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/generator" className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center">
                <CrosshairIcon className="h-5 w-5 mr-2" />
                Create Your Crosshair
              </Link>
              <Link to="/all-crosshairs" className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center">
                <List className="h-5 w-5 mr-2" />
                Browse All Crosshairs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Characters */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-white">Featured Characters</h2>
            <Link to="/character/more" className="text-blue-400 hover:text-blue-300 flex items-center">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {characters.slice(0, 4).map(character => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Crosshairs */}
      <section className="py-16 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-white">Popular Crosshairs</h2>
            <Link to="/generator" className="text-blue-400 hover:text-blue-300 flex items-center">
              Create Your Own
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCrosshairs.map(crosshair => (
              <CrosshairCard 
                key={crosshair.id} 
                crosshair={crosshair} 
                onCopy={handleCopy} 
                onVote={handleVote} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-6 rounded-lg text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CrosshairIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">1. Find Your Crosshair</h3>
              <p className="text-gray-300">
                Browse our extensive collection of character-specific crosshairs and optimized settings to find the perfect match for your playstyle.
              </p>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-lg text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">2. Customize Settings</h3>
              <p className="text-gray-300">
                Use our interactive generator to fine-tune every aspect of your crosshair, from color and opacity to size and shape.
              </p>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-lg text-center">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">3. Copy & Play</h3>
              <p className="text-gray-300">
                Copy your crosshair code with one click, import it into Marvel Rivals, and start dominating the battlefield with improved accuracy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Crosshair Import Guide */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-white">How to Import Crosshairs</h2>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Import Your Crosshair</h3>
                <p className="text-gray-300 mb-6">
                  Our crosshair codes are formatted to work directly with Marvel Rivals' import system. Follow these simple steps to use any crosshair from our collection:
                </p>
                <ol className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</div>
                    <span>Copy the crosshair code by clicking the copy button</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</div>
                    <span>Open Marvel Rivals and navigate to Settings</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</div>
                    <span>Select the "Crosshair" tab in the settings menu</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</div>
                    <span>Click "Import" and paste your copied code</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">5</div>
                    <span>Click "Save" to apply your new crosshair</span>
                  </li>
                </ol>
                <Link to="/generator" className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                  Create Custom Crosshair
                </Link>
              </div>
              
              <div className="bg-slate-700 rounded-lg p-6">
                <h4 className="text-xl font-bold text-white mb-4">Pro Tips</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Many of our crosshairs are used by professional players</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Different characters benefit from different crosshair styles</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Experiment with different colors for better visibility</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Save your favorite crosshairs for different maps and situations</span>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-slate-800 rounded border border-slate-600">
                  <p className="text-sm text-gray-400">
                    <strong className="text-white">Note:</strong> Our crosshair codes follow the standard format used by Marvel Rivals. If you're having trouble importing, make sure you're copying the entire code without any extra spaces.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Improve Your Aim?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Create your perfect crosshair, save your favorites, and dominate the battlefield with precision.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/generator" className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center">
              <CrosshairIcon className="h-5 w-5 mr-2" />
              Start Creating Now
            </Link>
            <Link to="/all-crosshairs" className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center">
              <List className="h-5 w-5 mr-2" />
              View All Crosshairs
            </Link>
          </div>
        </div>
      </section>

      {/* Ad Section */}
      <section className="py-8 bg-slate-800">
        <div className="container mx-auto px-6 text-center">
          <div className="bg-slate-700 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Advertisement</p>
            <div className="h-[250px] flex items-center justify-center bg-slate-800 rounded">
              {/* Ad unit will be inserted here */}
              <p className="text-gray-500">Ad Space</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;