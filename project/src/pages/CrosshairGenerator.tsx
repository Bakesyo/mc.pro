import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Save } from 'lucide-react';
import CrosshairGeneratorComponent from '../components/CrosshairGenerator';
import { Crosshair } from '../types';

const CrosshairGeneratorPage = () => {
  const [savedCrosshairs, setSavedCrosshairs] = useState<Crosshair[]>([]);
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  const handleSaveCrosshair = (crosshair: Crosshair) => {
    // Check if crosshair with same ID already exists
    const existingIndex = savedCrosshairs.findIndex(c => c.id === crosshair.id);
    
    if (existingIndex >= 0) {
      // Update existing crosshair
      const updatedCrosshairs = [...savedCrosshairs];
      updatedCrosshairs[existingIndex] = crosshair;
      setSavedCrosshairs(updatedCrosshairs);
    } else {
      // Add new crosshair
      setSavedCrosshairs([...savedCrosshairs, crosshair]);
    }
    
    // Show saved message
    setShowSavedMessage(true);
    setTimeout(() => setShowSavedMessage(false), 3000);
  };

  return (
    <>
      <Helmet>
        <title>Marvel Rivals Crosshair Generator | marvelcrosshair.pro</title>
        <meta name="description" content="Create your perfect Marvel Rivals crosshair with our interactive generator. Customize every aspect and get a unique code to use in-game for better aim and accuracy." />
        <meta name="keywords" content="Marvel Rivals, crosshair generator, custom crosshair, gaming, aim settings, crosshair codes" />
        <link rel="canonical" href="https://marvelcrosshair.pro/generator" />
      </Helmet>

      <div className="container mx-auto px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Marvel Rivals Crosshair Generator</h1>
            <p className="text-gray-300">
              Create your perfect Marvel Rivals crosshair with our interactive generator. Customize every aspect and get a unique code to use in-game for better aim and accuracy.
            </p>
          </div>

          {showSavedMessage && (
            <div className="bg-green-600 text-white p-4 rounded-md mb-6 flex items-center">
              <Save className="h-5 w-5 mr-2" />
              Crosshair saved successfully!
            </div>
          )}

          <CrosshairGeneratorComponent onSave={handleSaveCrosshair} />

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">How to Import Your Crosshair</h2>
            
            <div className="bg-slate-800 rounded-lg p-6">
              <ol className="space-y-4">
                <li className="flex">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                  <div>
                    <p className="text-gray-300">Copy your crosshair code by clicking the "Copy" button.</p>
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                  <div>
                    <p className="text-gray-300">Open Marvel Rivals and navigate to the Settings menu.</p>
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                  <div>
                    <p className="text-gray-300">Select "Crosshair" from the settings categories.</p>
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                  <div>
                    <p className="text-gray-300">Click on "Import Crosshair Code" and paste your code.</p>
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">5</span>
                  <div>
                    <p className="text-gray-300">Click "Apply" to save your new crosshair settings.</p>
                  </div>
                </li>
              </ol>
              
              <div className="mt-6 p-4 bg-slate-700 rounded border border-slate-600">
                <h3 className="text-white font-medium mb-2">Understanding Crosshair Codes</h3>
                <p className="text-sm text-gray-300 mb-3">
                  Our crosshair codes use a format similar to other competitive shooters, with parameters that control different aspects of your crosshair:
                </p>
                <ul className="text-sm text-gray-300 space-y-1 list-disc pl-5">
                  <li><span className="text-blue-400">0;</span> - Starts the code</li>
                  <li><span className="text-blue-400">P;</span> - Primary crosshair settings</li>
                  <li><span className="text-blue-400">c;5;</span> - Color (values 0-9)</li>
                  <li><span className="text-blue-400">0l;4;</span> - Inner line length</li>
                  <li><span className="text-blue-400">0o;2;</span> - Inner line offset</li>
                  <li><span className="text-blue-400">S;</span> - Secondary settings (outline, etc.)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Ad Section */}
          <div className="mt-12 bg-slate-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-2 text-center">Advertisement</p>
            <div className="h-[250px] flex items-center justify-center bg-slate-700 rounded">
              {/* Ad unit will be inserted here */}
              <p className="text-gray-500">Ad Space</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CrosshairGeneratorPage;