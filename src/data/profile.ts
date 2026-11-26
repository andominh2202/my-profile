import type { ProfileData } from '../types/profile';

export const PROFILE: ProfileData = {
  name: 'Đỗ Minh An',
  nickname: 'Nope0612',
  tagline: 'Gamer · Người nghe nhạc · Thích code dạo',
  bio:
    'Xin chào! Mình là một người thích chơi game, nghe nhạc và mày mò công nghệ. ' +
    'Ban ngày học/làm việc, buổi tối leo rank cùng bạn bè. Cứ thoải mái kết bạn ' +
    'qua các mạng xã hội bên dưới nhé!',
  avatar: 'assets/avatar.svg',
  cover: 'assets/cover.svg',
  location: 'Việt Nam',
  status: 'Thường online buổi tối',

  socials: [
    { id: 'github', label: 'GitHub', handle: 'andominh2202', url: 'https://github.com/andominh2202' },
    { id: 'discord', label: 'Discord', handle: 'anwir0612', url: '' },
    { id: 'facebook', label: 'Facebook', handle: 'dominhan0612', url: 'https://www.facebook.com/dominhan0612' },
    { id: 'instagram', label: 'Instagram', handle: '@nope061206', url: 'https://www.instagram.com/nope061206' },
    { id: 'tiktok', label: 'TikTok', handle: '@dominhan0612', url: 'https://www.tiktok.com/@dominhan0612' }
  ],

  gamerTags: [
    { platform: 'riot', label: 'Riot ID', value: '' },
    { platform: 'minecraft', label: 'Minecraft', value: '' }
  ],

  spotify: {
    playlistUrl: 'https://open.spotify.com/playlist/0MD6yrNQFFWtP85FWxtblF?si=5108c0f62fd9443f'
  },

  games: [
    { title: 'Valorant', genre: 'FPS chiến thuật', image: '', note: 'Main Duelist, đang cày lên Diamond.' },
    { title: 'League of Legends', genre: 'MOBA', image: '', note: 'Đi Mid là chính, thỉnh thoảng gánh team.' },
    { title: 'Teamfight Tactics', genre: 'Auto battler', image: '', note: 'Chơi thư giãn sau mỗi trận rank căng thẳng.' },
    { title: 'Minecraft', genre: 'Sandbox / Sinh tồn', image: '', note: 'Xây nhà, đào hầm cùng hội bạn trên server riêng.' }
  ],

  hobbies: [
    { icon: '🎧', title: 'Nghe nhạc', desc: 'Lo-fi khi học, V-pop và EDM khi chơi game.' },
    { icon: '🎮', title: 'Chơi game', desc: 'FPS, MOBA và những tựa game sinh tồn cùng bạn bè.' },
    { icon: '💻', title: 'Code', desc: 'Mày mò làm web và mấy công cụ nhỏ cho vui.' },
    { icon: '📸', title: 'Chụp ảnh', desc: 'Lưu lại khoảnh khắc đẹp trên mỗi chuyến đi.' }
  ],

  projects: [
    // Ví dụ (bỏ comment để hiển thị mục Dự án):
    // {
    //   title: 'My Profile',
    //   description: 'Trang hồ sơ cá nhân tương tác dùng React, TypeScript, Vite và Three.js Aurora.',
    //   tech: ['React', 'TypeScript', 'Three.js', 'GSAP'],
    //   image: '',
    //   repoUrl: 'https://github.com/andominh2202/my-profile',
    //   demoUrl: 'https://andominh2202.github.io/my-profile/'
    // }
  ]
};
