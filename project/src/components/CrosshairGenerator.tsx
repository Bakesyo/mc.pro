import React, { useState, useEffect } from 'react';
import { Copy, Save, RefreshCw } from 'lucide-react';
import { Crosshair } from '../types';
import CrosshairPreview from './CrosshairPreview';
import CaptchaModal from './CaptchaModal';

interface CrosshairGeneratorProps {
  onSave?: (crosshair: Crosshair) => void;
  initialCrosshair?: Crosshair;
}

const CrosshairGenerator: React.FC<CrosshairGeneratorProps> = ({ 
  onSave,
  initialCrosshair
}) => {
  const defaultCrosshair: Crosshair = {
    id: '',
    name: 'My Custom Crosshair',
    code: '',
    color: '#ffffff',
    outlineColor: '#000000',
    outlineOpacity: 0.5,
    centerDot: true,
    centerDotSize: 2,
    centerDotOpacity: 1,
    innerLines: {
      show: true,
      opacity: 0.8,
      length: 4,
      thickness: 2,
      offset: 2
    },
    outerLines: {
      show: true,
      opacity: 0.5,
      length: 2,
      thickness: 1,
      offset: 6
    },
    votes: 0,
    tags: ['custom']
  };

  const [crosshair, setCrosshair] = useState<Crosshair>(initialCrosshair || defaultCrosshair);
  const [copied, setCopied] = useState(false);
  const [crosshairName, setCrosshairName] = useState(initialCrosshair?.name || defaultCrosshair.name);
  const [showCaptcha, setShowCaptcha] = useState(false);

  // Generate a code for the crosshair based on its properties
  useEffect(() => {
    // This is a simplified version of how the code might be generated
    // In a real app, this would follow the game's actual format
    const generateCode = () => {
      let code = '0;';
      
      // Add center dot settings
      if (crosshair.centerDot) {
        code += 'P;';
        code += `c;${Math.floor(parseInt(crosshair.color.slice(1), 16) % 9)};`;
        code += `h;0;`;
        if (crosshair.outlineOpacity > 0) {
          code += `f;0;`;
        }
      }
      
      // Add inner lines settings
      if (crosshair.innerLines.show) {
        code += `0l;${crosshair.innerLines.length};`;
        code += `0o;${crosshair.innerLines.offset};`;
        code += `0a;${crosshair.innerLines.opacity.toFixed(1)};`;
        code += `0f;0;`;
        code += `1b;0;`;
      }
      
      // Add outline settings
      if (crosshair.outlineOpacity > 0) {
        code += `S;`;
        code += `c;1;`;
        code += `o;${crosshair.outlineOpacity.toFixed(1)}`;
      }
      
      // Add outer lines if shown
      if (crosshair.outerLines.show) {
        if (!code.includes('S;')) {
          code += `S;`;
        }
        code += `1t;1;`;
        code += `1l;${crosshair.outerLines.length};`;
        code += `1o;${crosshair.outerLines.offset};`;
        code += `1a;${crosshair.outerLines.opacity.toFixed(1)};`;
        code += `1m;0;`;
        code += `1f;0`;
      }
      
      return code;
    };
    
    const newCode = generateCode();
    setCrosshair(prev => ({ ...prev, code: newCode }));
  }, [
    crosshair.color, 
    crosshair.outlineColor,
    crosshair.outlineOpacity,
    crosshair.centerDot,
    crosshair.centerDotSize,
    crosshair.centerDotOpacity,
    crosshair.innerLines.show,
    crosshair.innerLines.opacity,
    crosshair.innerLines.length,
    crosshair.innerLines.thickness,
    crosshair.innerLines.offset,
    crosshair.outerLines.show,
    crosshair.outerLines.opacity,
    crosshair.outerLines.length,
    crosshair.outerLines.thickness,
    crosshair.outerLines.offset
  ]);

  // Update crosshair name when input changes
  useEffect(() => {
    setCrosshair(prev => ({ ...prev, name: crosshairName }));
  }, [crosshairName]);

  const handleCopyClick = () => {
    setShowCaptcha(true);
  };

  const handleCaptchaVerify = () => {
    navigator.clipboard.writeText(crosshair.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (onSave) {
      // Generate a unique ID if not present
      const crosshairToSave = {
        ...crosshair,
        id: crosshair.id || `custom-${Date.now()}`
      };
      onSave(crosshairToSave);
    }
  };

  const handleRandomize = () => {
    const colors = ['#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    setCrosshair({
      ...crosshair,
      color: randomColor,
      centerDot: Math.random() > 0.3, // 70% chance of having a center dot
      centerDotSize: Math.floor(Math.random() * 4) + 1,
      centerDotOpacity: Math.round((Math.random() * 0.5 + 0.5) * 10) / 10,
      innerLines: {
        show: Math.random() > 0.2, // 80% chance of having inner lines
        opacity: Math.round(Math.random() * 10) / 10,
        length: Math.floor(Math.random() * 6) + 2,
        thickness: Math.floor(Math.random() * 3) + 1,
        offset: Math.floor(Math.random() * 4) + 1
      },
      outerLines: {
        show: Math.random() > 0.4, // 60% chance of having outer lines
        opacity: Math.round(Math.random() * 10) / 10,
        length: Math.floor(Math.random() * 4) + 1,
        thickness: Math.floor(Math.random() * 2) + 1,
        offset: Math.floor(Math.random() * 8) + 4
      }
    });
  };

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Crosshair Preview</h3>
          <div className="flex justify-center mb-6">
            <CrosshairPreview crosshair={crosshair} size="large" />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">Crosshair Name</label>
            <input
              type="text"
              value={crosshairName}
              onChange={(e) => setCrosshairName(e.target.value)}
              className="w-full bg-slate-700 text-white border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div className="bg-slate-700 px-3 py-2 rounded text-sm font-mono flex-grow mr-2 truncate" title={crosshair.code}>
              {crosshair.code}
            </div>
            <button 
              onClick={handleCopyClick}
              className={`${copied ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} text-white p-2 rounded-md transition-colors flex items-center`}
            >
              <Copy className="h-5 w-5 mr-1" />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={handleRandomize}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition-colors flex items-center justify-center"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Randomize
            </button>
            
            {onSave && (
              <button 
                onClick={handleSave}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition-colors flex items-center justify-center"
              >
                <Save className="h-5 w-5 mr-2" />
                Save
              </button>
            )}
          </div>

          <div className="mt-6 p-4 bg-slate-700 rounded-md">
            <h4 className="text-sm font-medium text-white mb-2">How to Import</h4>
            <ol className="text-sm text-gray-300 space-y-1 list-decimal pl-5">
              <li>Copy the code above</li>
              <li>Open Marvel Rivals settings</li>
              <li>Go to Crosshair settings</li>
              <li>Click "Import Code" and paste</li>
              <li>Save your settings</li>
            </ol>
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-xl font-bold mb-4 text-white">Customize</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Crosshair Color</label>
            <div className="flex items-center">
              <input
                type="color"
                value={crosshair.color}
                onChange={(e) => setCrosshair({ ...crosshair, color: e.target.value })}
                className="h-10 w-10 rounded border-0"
              />
              <span className="ml-2 text-sm text-gray-400">{crosshair.color}</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Outline Color</label>
            <div className="flex items-center">
              <input
                type="color"
                value={crosshair.outlineColor}
                onChange={(e) => setCrosshair({ ...crosshair, outlineColor: e.target.value })}
                className="h-10 w-10 rounded border-0"
              />
              <span className="ml-2 text-sm text-gray-400">{crosshair.outlineColor}</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Outline Opacity: {crosshair.outlineOpacity}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={crosshair.outlineOpacity}
              onChange={(e) => setCrosshair({ ...crosshair, outlineOpacity: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>
          
          <div className="border-t border-slate-700 pt-4">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={crosshair.centerDot}
                onChange={(e) => setCrosshair({ ...crosshair, centerDot: e.target.checked })}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label className="ml-2 text-sm font-medium text-gray-300">Center Dot</label>
            </div>
            
            {crosshair.centerDot && (
              <div className="ml-6 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Size: {crosshair.centerDotSize}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={crosshair.centerDotSize}
                    onChange={(e) => setCrosshair({ ...crosshair, centerDotSize: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Opacity: {crosshair.centerDotOpacity}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={crosshair.centerDotOpacity}
                    onChange={(e) => setCrosshair({ ...crosshair, centerDotOpacity: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="border-t border-slate-700 pt-4">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={crosshair.innerLines.show}
                onChange={(e) => setCrosshair({ 
                  ...crosshair, 
                  innerLines: { ...crosshair.innerLines, show: e.target.checked } 
                })}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label className="ml-2 text-sm font-medium text-gray-300">Inner Lines</label>
            </div>
            
            {crosshair.innerLines.show && (
              <div className="ml-6 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Length: {crosshair.innerLines.length}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={crosshair.innerLines.length}
                    onChange={(e) => setCrosshair({ 
                      ...crosshair, 
                      innerLines: { ...crosshair.innerLines, length: parseInt(e.target.value) } 
                    })}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Thickness: {crosshair.innerLines.thickness}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={crosshair.innerLines.thickness}
                    onChange={(e) => setCrosshair({ 
                      ...crosshair, 
                      innerLines: { ...crosshair.innerLines, thickness: parseInt(e.target.value) } 
                    })}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Offset: {crosshair.innerLines.offset}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={crosshair.innerLines.offset}
                    onChange={(e) => setCrosshair({ 
                      ...crosshair, 
                      innerLines: { ...crosshair.innerLines, offset: parseInt(e.target.value) } 
                    })}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Opacity: {crosshair.innerLines.opacity}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={crosshair.innerLines.opacity}
                    onChange={(e) => setCrosshair({
                      ...crosshair,
                      innerLines: { ...crosshair.innerLines, opacity: parseFloat(e.target.value) }
                    })}
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="border-t border-slate-700 pt-4">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={crosshair.outerLines.show}
                onChange={(e) => setCrosshair({ 
                  ...crosshair, 
                  outerLines: { ...crosshair.outerLines, show: e.target.checked } 
                })}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label className="ml-2 text-sm font-medium text-gray-300">Outer Lines</label>
            </div>
            
            {crosshair.outerLines.show && (
              <div className="ml-6 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Length: {crosshair.outerLines.length}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={crosshair.outerLines.length}
                    onChange={(e) => setCrosshair({ 
                      ...crosshair, 
                      outerLines: { ...crosshair.outerLines, length: parseInt(e.target.value) } 
                    })}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Thickness: {crosshair.outerLines.thickness}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={crosshair.outerLines.thickness}
                    onChange={(e) => setCrosshair({ 
                      ...crosshair, 
                      outerLines: { ...crosshair.outerLines, thickness: parseInt(e.target.value) } 
                    })}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Offset: {crosshair.outerLines.offset}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={crosshair.outerLines.offset}
                    onChange={(e) => setCrosshair({ 
                      ...crosshair, 
                      outerLines: { ...crosshair.outerLines, offset: parseInt(e.target.value) } 
                    })}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Opacity: {crosshair.outerLines.opacity}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={crosshair.outerLines.opacity}
                    onChange={(e) => setCrosshair({ 
                      ...crosshair, 
                      outerLines: { ...crosshair.outerLines, opacity: parseFloat(e.target.value) } 
                    })}
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <CaptchaModal 
        isOpen={showCaptcha}
        onClose={() => setShowCaptcha(false)}
        onVerify={handleCaptchaVerify}
        crosshairCode={crosshair.code}
      />
    </div>
  );
};

export default CrosshairGenerator;