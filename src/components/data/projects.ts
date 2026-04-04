export interface CodingProject {
  name: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
}

export interface RobloxGameEntry {
  universeId: number;
  fallbackName: string;
  fallbackDescription: string;
}

// Add your Roblox game universe IDs here 
export const robloxGames: RobloxGameEntry[] = [
  // { universeId: 123456789, fallbackName: 'My Game', fallbackDescription: 'A game I built.' },
];

// Add your coding projects here
export const codingProjects: CodingProject[] = [
  {
    name: 'This Portfolio',
    description: 'Personal portfolio with live Roblox API integration. Built with React 19, TypeScript & Tailwind CSS 4.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Vite'],
    github: 'https://github.com/FlakeSnoy/FlakeSnoy.github.io',
    demo: 'https://flakesnoy.github.io',
  },
];