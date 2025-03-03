import React from 'react';
import { Crosshair } from '../types';

interface CrosshairPreviewProps {
  crosshair: Crosshair;
  size?: 'small' | 'medium' | 'large';
  showBackground?: boolean;
}

const CrosshairPreview: React.FC<CrosshairPreviewProps> = ({ 
  crosshair, 
  size = 'medium',
  showBackground = true 
}) => {
  const sizeMap = {
    small: 100,
    medium: 150,
    large: 200
  };

  const previewSize = sizeMap[size];
  const scale = previewSize / 200; // Base scale on a 200px reference

  // Convert color strings to rgba for opacity support
  const getColorWithOpacity = (color: string, opacity: number) => {
    // Handle hex colors
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    // Handle rgb colors
    if (color.startsWith('rgb')) {
      return color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
    }
    // Default fallback
    return color;
  };

  return (
    <div 
      className={`relative ${showBackground ? 'bg-gradient-to-br from-slate-700 to-slate-900' : ''} rounded-lg overflow-hidden`}
      style={{ 
        width: `${previewSize}px`, 
        height: `${previewSize}px` 
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Center Dot */}
        {crosshair.centerDot && (
          <div 
            className="absolute rounded-full"
            style={{
              width: `${crosshair.centerDotSize * scale}px`,
              height: `${crosshair.centerDotSize * scale}px`,
              backgroundColor: getColorWithOpacity(crosshair.color, crosshair.centerDotOpacity),
              boxShadow: crosshair.outlineOpacity > 0 
                ? `0 0 0 ${1 * scale}px ${getColorWithOpacity(crosshair.outlineColor, crosshair.outlineOpacity)}`
                : 'none'
            }}
          />
        )}

        {/* Inner Lines */}
        {crosshair.innerLines.show && (
          <>
            {/* Top */}
            <div 
              className="absolute"
              style={{
                width: `${crosshair.innerLines.thickness * scale}px`,
                height: `${crosshair.innerLines.length * scale}px`,
                backgroundColor: getColorWithOpacity(crosshair.color, crosshair.innerLines.opacity),
                boxShadow: crosshair.outlineOpacity > 0 
                  ? `0 0 0 ${1 * scale}px ${getColorWithOpacity(crosshair.outlineColor, crosshair.outlineOpacity)}`
                  : 'none',
                top: `calc(50% - ${(crosshair.innerLines.length + crosshair.innerLines.offset) * scale}px)`,
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            />
            {/* Right */}
            <div 
              className="absolute"
              style={{
                height: `${crosshair.innerLines.thickness * scale}px`,
                width: `${crosshair.innerLines.length * scale}px`,
                backgroundColor: getColorWithOpacity(crosshair.color, crosshair.innerLines.opacity),
                boxShadow: crosshair.outlineOpacity > 0 
                  ? `0 0 0 ${1 * scale}px ${getColorWithOpacity(crosshair.outlineColor, crosshair.outlineOpacity)}`
                  : 'none',
                left: `calc(50% + ${crosshair.innerLines.offset * scale}px)`,
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            />
            {/* Bottom */}
            <div 
              className="absolute"
              style={{
                width: `${crosshair.innerLines.thickness * scale}px`,
                height: `${crosshair.innerLines.length * scale}px`,
                backgroundColor: getColorWithOpacity(crosshair.color, crosshair.innerLines.opacity),
                boxShadow: crosshair.outlineOpacity > 0 
                  ? `0 0 0 ${1 * scale}px ${getColorWithOpacity(crosshair.outlineColor, crosshair.outlineOpacity)}`
                  : 'none',
                bottom: `calc(50% - ${(crosshair.innerLines.length + crosshair.innerLines.offset) * scale}px)`,
                left: '50%',
                transform: 'translateX(-50%) rotate(180deg)'
              }}
            />
            {/* Left */}
            <div 
              className="absolute"
              style={{
                height: `${crosshair.innerLines.thickness * scale}px`,
                width: `${crosshair.innerLines.length * scale}px`,
                backgroundColor: getColorWithOpacity(crosshair.color, crosshair.innerLines.opacity),
                boxShadow: crosshair.outlineOpacity > 0 
                  ? `0 0 0 ${1 * scale}px ${getColorWithOpacity(crosshair.outlineColor, crosshair.outlineOpacity)}`
                  : 'none',
                right: `calc(50% + ${crosshair.innerLines.offset * scale}px)`,
                top: '50%',
                transform: 'translateY(-50%) rotate(180deg)'
              }}
            />
          </>
        )}

        {/* Outer Lines */}
        {crosshair.outerLines.show && (
          <>
            {/* Top */}
            <div 
              className="absolute"
              style={{
                width: `${crosshair.outerLines.thickness * scale}px`,
                height: `${crosshair.outerLines.length * scale}px`,
                backgroundColor: getColorWithOpacity(crosshair.color, crosshair.outerLines.opacity),
                boxShadow: crosshair.outlineOpacity > 0 
                  ? `0 0 0 ${1 * scale}px ${getColorWithOpacity(crosshair.outlineColor, crosshair.outlineOpacity)}`
                  : 'none',
                top: `calc(50% - ${(crosshair.outerLines.length + crosshair.outerLines.offset) * scale}px)`,
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            />
            {/* Right */}
            <div 
              className="absolute"
              style={{
                height: `${crosshair.outerLines.thickness * scale}px`,
                width: `${crosshair.outerLines.length * scale}px`,
                backgroundColor: getColorWithOpacity(crosshair.color, crosshair.outerLines.opacity),
                boxShadow: crosshair.outlineOpacity > 0 
                  ? `0 0 0 ${1 * scale}px ${getColorWithOpacity(crosshair.outlineColor, crosshair.outlineOpacity)}`
                  : 'none',
                left: `calc(50% + ${crosshair.outerLines.offset * scale}px)`,
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            />
            {/* Bottom */}
            <div 
              className="absolute"
              style={{
                width: `${crosshair.outerLines.thickness * scale}px`,
                height: `${crosshair.outerLines.length * scale}px`,
                backgroundColor: getColorWithOpacity(crosshair.color, crosshair.outerLines.opacity),
                boxShadow: crosshair.outlineOpacity > 0 
                  ? `0 0 0 ${1 * scale}px ${getColorWithOpacity(crosshair.outlineColor, crosshair.outlineOpacity)}`
                  : 'none',
                bottom: `calc(50% - ${(crosshair.outerLines.length + crosshair.outerLines.offset) * scale}px)`,
                left: '50%',
                transform: 'translateX(-50%) rotate(180deg)'
              }}
            />
            {/* Left */}
            <div 
              className="absolute"
              style={{
                height: `${crosshair.outerLines.thickness * scale}px`,
                width: `${crosshair.outerLines.length * scale}px`,
                backgroundColor: getColorWithOpacity(crosshair.color, crosshair.outerLines.opacity),
                boxShadow: crosshair.outlineOpacity > 0 
                  ? `0 0 0 ${1 * scale}px ${getColorWithOpacity(crosshair.outlineColor, crosshair.outlineOpacity)}`
                  : 'none',
                right: `calc(50% + ${crosshair.outerLines.offset * scale}px)`,
                top: '50%',
                transform: 'translateY(-50%) rotate(180deg)'
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CrosshairPreview;