import { ProPlayer } from '../types';

export const proPlayers: ProPlayer[] = [
  {
    id: 'marvel-pro1',
    name: 'AimGod',
    team: 'Team Avengers',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    mainCharacters: ['iron-man', 'black-panther'],
    crosshairs: [
      {
        id: 'aimgod-precision',
        name: 'AimGod Precision',
        code: 'MRVL-PRO-AG1',
        color: '#00ff00',
        outlineColor: '#000000',
        outlineOpacity: 1,
        centerDot: true,
        centerDotSize: 1,
        centerDotOpacity: 1,
        innerLines: {
          show: true,
          opacity: 0.8,
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
        createdBy: 'AimGod',
        votes: 532,
        tags: ['pro', 'precision', 'small']
      }
    ],
    socialLinks: {
      twitter: 'https://twitter.com/aimgod',
      twitch: 'https://twitch.tv/aimgod',
      youtube: 'https://youtube.com/aimgod'
    }
  },
  {
    id: 'marvel-pro2',
    name: 'WebSlinger',
    team: 'Spiders Elite',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    mainCharacters: ['spider-man'],
    crosshairs: [
      {
        id: 'webslinger-dot',
        name: 'WebSlinger Dot',
        code: 'MRVL-PRO-WS1',
        color: '#ff0000',
        outlineColor: '#ffffff',
        outlineOpacity: 0.5,
        centerDot: true,
        centerDotSize: 2,
        centerDotOpacity: 0.8,
        innerLines: {
          show: false,
          opacity: 0,
          length: 0,
          thickness: 0,
          offset: 0
        },
        outerLines: {
          show: true,
          opacity: 0.6,
          length: 2,
          thickness: 1,
          offset: 4
        },
        createdBy: 'WebSlinger',
        votes: 478,
        tags: ['pro', 'dot', 'minimal']
      }
    ],
    socialLinks: {
      twitter: 'https://twitter.com/webslinger',
      twitch: 'https://twitch.tv/webslinger'
    }
  },
  {
    id: 'marvel-pro3',
    name: 'GreenMachine',
    team: 'Gamma Squad',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    mainCharacters: ['hulk'],
    crosshairs: [
      {
        id: 'greenmachine-smash',
        name: 'GreenMachine Smash',
        code: 'MRVL-PRO-GM1',
        color: '#00ff00',
        outlineColor: '#000000',
        outlineOpacity: 1,
        centerDot: true,
        centerDotSize: 3,
        centerDotOpacity: 1,
        innerLines: {
          show: true,
          opacity: 0.7,
          length: 5,
          thickness: 3,
          offset: 3
        },
        outerLines: {
          show: true,
          opacity: 0.5,
          length: 3,
          thickness: 2,
          offset: 8
        },
        createdBy: 'GreenMachine',
        votes: 412,
        tags: ['pro', 'large', 'aggressive']
      }
    ],
    socialLinks: {
      twitter: 'https://twitter.com/greenmachine',
      youtube: 'https://youtube.com/greenmachine'
    }
  },
  {
    id: 'marvel-pro4',
    name: 'PantherProwl',
    team: 'Wakanda Warriors',
    image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    mainCharacters: ['black-panther'],
    crosshairs: [
      {
        id: 'pantherprowl-stealth',
        name: 'PantherProwl Stealth',
        code: 'MRVL-PRO-PP1',
        color: '#8a2be2',
        outlineColor: '#ffffff',
        outlineOpacity: 0.6,
        centerDot: false,
        centerDotSize: 0,
        centerDotOpacity: 0,
        innerLines: {
          show: true,
          opacity: 1,
          length: 2,
          thickness: 1,
          offset: 1
        },
        outerLines: {
          show: true,
          opacity: 0.7,
          length: 1,
          thickness: 1,
          offset: 4
        },
        createdBy: 'PantherProwl',
        votes: 389,
        tags: ['pro', 'stealth', 'precise']
      }
    ],
    socialLinks: {
      twitter: 'https://twitter.com/pantherprowl',
      twitch: 'https://twitch.tv/pantherprowl',
      youtube: 'https://youtube.com/pantherprowl'
    }
  }
];