export type SocialPlatform =
  | 'github'
  | 'discord'
  | 'facebook'
  | 'instagram'
  | 'tiktok'
  | 'spotify';

export interface SocialItem {
  id: SocialPlatform;
  label: string;
  handle: string;
  url: string;
}

export interface GamerTagItem {
  platform: 'riot' | 'minecraft' | string;
  label: string;
  value: string;
}

export interface GameItem {
  title: string;
  genre: string;
  image?: string;
  note: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  tech: string[];
  image?: string;
  repoUrl?: string;
  demoUrl?: string;
}

export interface HobbyItem {
  icon: string;
  title: string;
  desc: string;
}

export interface ProfileData {
  name: string;
  nickname: string;
  tagline: string;
  bio: string;
  avatar: string;
  cover: string;
  location: string;
  status: string;
  socials: SocialItem[];
  gamerTags: GamerTagItem[];
  spotify: {
    playlistUrl: string;
  };
  games: GameItem[];
  hobbies: HobbyItem[];
  projects: ProjectItem[];
}

export type QualityLevel = 'high' | 'medium' | 'low';
export type ThemeMode = 'dark' | 'light';
