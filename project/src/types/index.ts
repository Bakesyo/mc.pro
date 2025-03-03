export interface Character {
  id: string;
  name: string;
  image: string;
  role: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  recommendedCrosshairs: Crosshair[];
}

export interface ProPlayer {
  id: string;
  name: string;
  team: string;
  image: string;
  mainCharacters: string[];
  crosshairs: Crosshair[];
  socialLinks: {
    twitter?: string;
    twitch?: string;
    youtube?: string;
  };
}

export interface Crosshair {
  id: string;
  name: string;
  code: string;
  color: string;
  outlineColor: string;
  outlineOpacity: number;
  centerDot: boolean;
  centerDotSize: number;
  centerDotOpacity: number;
  innerLines: {
    show: boolean;
    opacity: number;
    length: number;
    thickness: number;
    offset: number;
  };
  outerLines: {
    show: boolean;
    opacity: number;
    length: number;
    thickness: number;
    offset: number;
  };
  createdBy?: string;
  forCharacter?: string;
  votes: number;
  tags: string[];
}

export interface CrosshairFilter {
  character?: string;
  proPlayer?: string;
  style?: string;
  searchTerm?: string;
}

export interface CharacterCrosshair {
  characterId: string;
  name: string;
  image: string;
  code: string;
  role: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}