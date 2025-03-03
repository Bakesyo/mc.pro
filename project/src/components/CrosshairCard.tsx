import React, { useState } from 'react';
import { Copy, ThumbsUp } from 'lucide-react';
import { Crosshair } from '../types';
import CrosshairPreview from './CrosshairPreview';
import CaptchaModal from './CaptchaModal';

interface CrosshairCardProps {
  crosshair: Crosshair;
  onCopy: (code: string) => void;
  onVote: (id: string) => void;
}

const CrosshairCard: React.FC<CrosshairCardProps> = ({ crosshair, onCopy, onVote }) => {
  const [copied, setCopied] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);

  const handleCopyClick = () => {
    setShowCaptcha(true);
  };

  const handleCaptchaVerify = () => {
    onCopy(crosshair.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-white">{crosshair.name}</h3>
          <div className="flex items-center space-x-1 bg-slate-700 px-2 py-1 rounded text-xs">
            <ThumbsUp className="h-3 w-3 text-blue-400" />
            <span>{crosshair.votes}</span>
          </div>
        </div>
        
        <div className="flex justify-center mb-4">
          <CrosshairPreview crosshair={crosshair} size="medium" />
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <div className="bg-slate-700 px-3 py-1 rounded text-sm font-mono truncate max-w-[70%]" title={crosshair.code}>
            {crosshair.code.length > 20 ? `${crosshair.code.substring(0, 20)}...` : crosshair.code}
          </div>
          <button 
            onClick={handleCopyClick}
            className={`${copied ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} text-white p-2 rounded-full transition-colors`}
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {crosshair.tags.map(tag => (
            <span key={tag} className="bg-slate-700 text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        
        {crosshair.createdBy && (
          <div className="mt-3 text-xs text-gray-400">
            Created by: <span className="text-blue-400">{crosshair.createdBy}</span>
          </div>
        )}
        
        <button 
          onClick={() => onVote(crosshair.id)}
          className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 rounded-md transition-colors flex items-center justify-center space-x-2"
        >
          <ThumbsUp className="h-4 w-4" />
          <span>Vote for this crosshair</span>
        </button>
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

export default CrosshairCard;