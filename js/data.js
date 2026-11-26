/*
 * ============================================================
 *  DỮ LIỆU HỒ SƠ — CHỈ CẦN SỬA FILE NÀY
 * ============================================================
 *  Hướng dẫn nhanh:
 *  1. Thay các giá trị có comment "TODO: thay bằng của bạn".
 *  2. socials: xoá mục nào bạn không dùng. Discord để url: '' thì
 *     bấm vào sẽ copy tên Discord thay vì mở link.
 *  3. gamerTags: Riot ID dạng "Tên#TAG", Minecraft là tên in-game.
 *  4. spotify.playlistUrl: mở Spotify → playlist → Chia sẻ →
 *     Sao chép liên kết, rồi dán vào đây (dạng
 *     https://open.spotify.com/playlist/XXXX?si=...).
 *  5. games: "image" là tuỳ chọn (vd 'assets/valorant.jpg');
 *     bỏ trống thì hiển thị chữ cái đầu tên game.
 *  6. Lưu file rồi tải lại index.html là xong.
 * ============================================================
 */
window.PROFILE = {
  name: 'Đỗ Minh An', // TODO: thay bằng của bạn
  nickname: 'Nope0612', // TODO: thay bằng của bạn
  tagline: 'Gamer · Người nghe nhạc · Thích code dạo', // TODO: thay bằng của bạn
  bio: 'Xin chào! Mình là một người thích chơi game, nghe nhạc và mày mò công nghệ. ' +
    'Ban ngày học/làm việc, buổi tối leo rank cùng bạn bè. Cứ thoải mái kết bạn ' +
    'qua các mạng xã hội bên dưới nhé!', // TODO: thay bằng của bạn
  avatar: 'assets/avatar.svg',
  cover: 'assets/cover.svg',
  location: 'Việt Nam', // TODO: thay bằng của bạn
  status: 'Đang online — rủ chơi game nhé!', // TODO: thay bằng của bạn

  socials: [
    { id: 'github', label: 'GitHub', handle: 'andominh2022', url: 'https://github.com/andominh2022' }, // TODO: thay bằng của bạn
    { id: 'discord', label: 'Discord', handle: 'anwir0612', url: '' }, // TODO: thay bằng của bạn (url trống = bấm để copy)
    { id: 'facebook', label: 'Facebook', handle: 'dominhan0612', url: 'https://www.facebook.com/dominhan0612' }, // TODO: thay bằng của bạn
    { id: 'instagram', label: 'Instagram', handle: '@nope061206', url: 'https://www.instagram.com/nope061206' }, // TODO: thay bằng của bạn
    { id: 'tiktok', label: 'TikTok', handle: '@dominhan0612', url: 'https://www.tiktok.com/@dominhan0612' }, // TODO: thay bằng của bạn
  ],

  gamerTags: [
    { platform: 'riot', label: 'Riot ID', value: '' }, // TODO: điền Riot ID thật của bạn (vd: 'Ten#VN1')
    { platform: 'minecraft', label: 'Minecraft', value: '' } // TODO: điền tên Minecraft thật của bạn
  ],

  spotify: {
    // TODO: thay bằng link playlist của bạn (đây là playlist công khai mẫu)
    playlistUrl: 'https://open.spotify.com/playlist/0MD6yrNQFFWtP85FWxtblF?si=5108c0f62fd9443f'
  },

  games: [
    { title: 'Valorant', genre: 'FPS chiến thuật', image: '', note: 'Main Duelist, đang cày lên Diamond.' }, // TODO: thay bằng của bạn
    { title: 'League of Legends', genre: 'MOBA', image: '', note: 'Đi Mid là chính, thỉnh thoảng gánh team.' }, // TODO
    { title: 'Teamfight Tactics', genre: 'Auto battler', image: '', note: 'Chơi thư giãn sau mỗi trận rank căng thẳng.' }, // TODO
    { title: 'Minecraft', genre: 'Sandbox / Sinh tồn', image: '', note: 'Xây nhà, đào hầm cùng hội bạn trên server riêng.' } // TODO
  ],

  hobbies: [
    { icon: '🎧', title: 'Nghe nhạc', desc: 'Lo-fi khi học, V-pop và EDM khi chơi game.' }, // TODO: thay bằng của bạn
    { icon: '🎮', title: 'Chơi game', desc: 'FPS, MOBA và những tựa game sinh tồn cùng bạn bè.' }, // TODO
    { icon: '💻', title: 'Code', desc: 'Mày mò làm web và mấy công cụ nhỏ cho vui.' }, // TODO
    { icon: '📸', title: 'Chụp ảnh', desc: 'Lưu lại khoảnh khắc đẹp trên mỗi chuyến đi.' } // TODO
  ]
};
