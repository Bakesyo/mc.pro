import React, { useState, useEffect } from 'react';
import { X, Copy, AlertCircle } from 'lucide-react';

interface CaptchaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: () => void;
  crosshairCode: string;
}

const CaptchaModal: React.FC<CaptchaModalProps> = ({ isOpen, onClose, onVerify, crosshairCode }) => {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setVerified(false);
      setError(null);
      setCopied(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Simulate captcha verification
  const handleVerifyClick = () => {
    setVerified(true);
    setError(null);
    onVerify();
  };

  const handleCopy = () => {
    if (!verified) {
      setError('Please complete the captcha first');
      return;
    }
    
    navigator.clipboard.writeText(crosshairCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
        
        <h3 className="text-xl font-bold text-white mb-4">Verify to Copy Crosshair Code</h3>
        
        <p className="text-gray-300 mb-6">
          Complete the captcha below to copy this crosshair code to your clipboard.
        </p>
        
        {error && (
          <div className="bg-red-900/50 border border-red-700 text-white p-3 rounded-md mb-4 flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        
        <div className="flex justify-center mb-6">
          {/* Simulated captcha for development */}
          <div className="border border-slate-600 rounded-md p-4 w-full">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-300">Captcha Verification</span>
              <span className="text-xs bg-blue-600 px-2 py-1 rounded text-white">Demo</span>
            </div>
            <div className="bg-slate-700 h-16 mb-3 rounded flex items-center justify-center">
              <span className="text-gray-400 text-sm">Captcha Challenge</span>
            </div>
            <button 
              onClick={handleVerifyClick}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
            >
              Verify
            </button>
          </div>
        </div>
        
        {verified && (
          <div className="mb-4">
            <div className="bg-slate-700 p-3 rounded-md mb-2">
              <p className="text-sm font-mono text-gray-300 break-all">{crosshairCode}</p>
            </div>
            <button
              onClick={handleCopy}
              className={`w-full ${copied ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} text-white py-2 rounded-md transition-colors flex items-center justify-center`}
            >
              <Copy className="h-4 w-4 mr-2" />
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
        )}
        
        <div className="text-xs text-gray-400 text-center">
          By completing this captcha, you're helping us keep this site free and supporting our work.
        </div>
      </div>
    </div>
  );
};

export default CaptchaModal;