import { Character } from '../types';

export const characters: Character[] = [
  {
    id: 'iron-man',
    name: 'Iron Man',
    image: 'https://cdn.marvel-rivals.com/images/characters/iron-man/portrait.webp',
    role: 'Damage',
    difficulty: 'Medium',
    description: 'Tony Stark, the genius inventor and billionaire, fights as Iron Man with his advanced armor suit. His precision-based abilities require accurate targeting for maximum effectiveness.',
    recommendedCrosshairs: [
      {
        id: 'im-precision',
        name: 'Iron Precision',
        code: '0;P;c;5;h;0;f;0;0l;4;0o;2;0a;1;0f;0;1b;0;S;c;1;o;1',
        color: '#ff0000',
        outlineColor: '#000000',
        outlineOpacity: 1,
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
          show: false,
          opacity: 0,
          length: 0,
          thickness: 0,
          offset: 0
        },
        forCharacter: 'iron-man',
        votes: 245,
        tags: ['precision', 'small', 'dot']
      },
      {
        id: 'im-repulsor',
        name: 'Repulsor Focus',
        code: '0;P;c;7;h;0;0l;4;0o;0;0a;1;0f;0;1b;0;S;o;1',
        color: '#00a8ff',
        outlineColor: '#ffffff',
        outlineOpacity: 0.5,
        centerDot: true,
        centerDotSize: 3,
        centerDotOpacity: 1,
        innerLines: {
          show: true,
          opacity: 0.7,
          length: 6,
          thickness: 2,
          offset: 3
        },
        outerLines: {
          show: true,
          opacity: 0.5,
          length: 2,
          thickness: 1,
          offset: 10
        },
        forCharacter: 'iron-man',
        votes: 189,
        tags: ['balanced', 'medium', 'versatile', 'used by pros']
      }
    ]
  },
  {
    id: 'spider-man',
    name: 'Spider-Man',
    image: 'https://cdn.marvel-rivals.com/images/characters/spider-man/portrait.webp',
    role: 'Mobility',
    difficulty: 'Hard',
    description: 'Peter Parker, the friendly neighborhood Spider-Man, uses his web-slinging abilities and spider-sense to outmaneuver opponents. His high mobility requires crosshairs that work well during rapid movement.',
    recommendedCrosshairs: [
      {
        id: 'sm-web',
        name: 'Web Shooter',
        code: '0;s;1;P;c;5;o;1;0t;1;0l;3;0o;2;0a;1;0f;0;1b;0',
        color: '#ff0000',
        outlineColor: '#ffffff',
        outlineOpacity: 0.8,
        centerDot: false,
        centerDotSize: 0,
        centerDotOpacity: 0,
        innerLines: {
          show: true,
          opacity: 1,
          length: 3,
          thickness: 1,
          offset: 2
        },
        outerLines: {
          show: true,
          opacity: 0.7,
          length: 2,
          thickness: 2,
          offset: 6
        },
        forCharacter: 'spider-man',
        votes: 312,
        tags: ['dynamic', 'small', 'mobile', 'used by pros']
      },
      {
        id: 'sm-agile',
        name: 'Agile Tracker',
        code: '0;P;c;1;o;1;d;1;0l;0;0o;0;0a;1;0f;0;1t;0;1l;0;1o;0;1a;0;1m;0;1f;0',
        color: '#ffffff',
        outlineColor: '#000000',
        outlineOpacity: 1,
        centerDot: true,
        centerDotSize: 1,
        centerDotOpacity: 1,
        innerLines: {
          show: false,
          opacity: 0,
          length: 0,
          thickness: 0,
          offset: 0
        },
        outerLines: {
          show: true,
          opacity: 0.8,
          length: 5,
          thickness: 1,
          offset: 3
        },
        forCharacter: 'spider-man',
        votes: 278,
        tags: ['minimal', 'dot', 'fast']
      }
    ]
  },
  {
    id: 'hulk',
    name: 'Hulk',
    image: 'https://cdn.marvel-rivals.com/images/characters/hulk/portrait.webp',
    role: 'Tank',
    difficulty: 'Easy',
    description: 'Bruce Banner transforms into the incredible Hulk, a powerhouse with devastating close-range abilities. His crosshair settings focus on area damage rather than pinpoint accuracy.',
    recommendedCrosshairs: [
      {
        id: 'hulk-smash',
        name: 'Hulk Smash',
        code: '0;P;c;8;h;0;f;0;0l;8;0o;4;0a;1;0f;0;1b;0;S;c;1;o;1',
        color: '#00ff00',
        outlineColor: '#000000',
        outlineOpacity: 1,
        centerDot: true,
        centerDotSize: 4,
        centerDotOpacity: 0.8,
        innerLines: {
          show: true,
          opacity: 0.6,
          length: 8,
          thickness: 4,
          offset: 4
        },
        outerLines: {
          show: true,
          opacity: 0.4,
          length: 4,
          thickness: 2,
          offset: 12
        },
        forCharacter: 'hulk',
        votes: 156,
        tags: ['large', 'area', 'aggressive', 'used by pros']
      },
      {
        id: 'hulk-rage',
        name: 'Gamma Rage',
        code: '0;P;c;8;h;0;0l;6;0o;3;0a;1;0f;0;1b;0;S;c;1;s;1.6',
        color: '#7fff00',
        outlineColor: '#ffffff',
        outlineOpacity: 0.5,
        centerDot: true,
        centerDotSize: 5,
        centerDotOpacity: 1,
        innerLines: {
          show: true,
          opacity: 0.7,
          length: 6,
          thickness: 3,
          offset: 3
        },
        outerLines: {
          show: false,
          opacity: 0,
          length: 0,
          thickness: 0,
          offset: 0
        },
        forCharacter: 'hulk',
        votes: 132,
        tags: ['simple', 'large', 'dot']
      }
    ]
  },
  {
    id: 'black-panther',
    name: 'Black Panther',
    image: 'https://cdn.marvel-rivals.com/images/characters/black-panther/portrait.webp',
    role: 'Assassin',
    difficulty: 'Medium',
    description: "T'Challa, the Black Panther and king of Wakanda, uses enhanced reflexes and vibranium technology. His playstyle requires precise targeting for critical hits.",
    recommendedCrosshairs: [
      {
        id: 'bp-vibranium',
        name: 'Vibranium Edge',
        code: '0;P;c;6;h;0;f;0;0l;3;0o;2;0a;1;0f;0;1b;0;S;c;1;o;0.7',
        color: '#8a2be2',
        outlineColor: '#ffffff',
        outlineOpacity: 0.7,
        centerDot: true,
        centerDotSize: 2,
        centerDotOpacity: 1,
        innerLines: {
          show: true,
          opacity: 0.9,
          length: 3,
          thickness: 1,
          offset: 2
        },
        outerLines: {
          show: false,
          opacity: 0,
          length: 0,
          thickness: 0,
          offset: 0
        },
        forCharacter: 'black-panther',
        votes: 203,
        tags: ['precise', 'small', 'stealth', 'used by pros']
      },
      {
        id: 'bp-hunter',
        name: 'Wakandan Hunter',
        code: '0;s;1;P;c;1;h;0;0l;4;0o;0;0a;1;0f;0;1t;1;1l;2;1o;6;1a;0.6;1m;0;1f;0',
        color: '#ffffff',
        outlineColor: '#000000',
        outlineOpacity: 1,
        centerDot: false,
        centerDotSize: 0,
        centerDotOpacity: 0,
        innerLines: {
          show: true,
          opacity: 1,
          length: 4,
          thickness: 1,
          offset: 0
        },
        outerLines: {
          show: true,
          opacity: 0.6,
          length: 2,
          thickness: 1,
          offset: 6
        },
        forCharacter: 'black-panther',
        votes: 187,
        tags: ['dynamic', 'balanced', 'aggressive']
      }
    ]
  }
];