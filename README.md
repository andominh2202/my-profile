# NOPE0612 — Immersive Aurora Portfolio

Trang web giới thiệu cá nhân của **Đỗ Minh An (`Nope0612`)**, xây dựng trên nền **React + TypeScript + Vite** với hệ thống **Aurora Afterdark**, WebGL Three.js, GSAP ScrollTrigger và Lenis.

- **Trang web trực tuyến (GitHub Pages):** https://andominh2202.github.io/my-profile/
- **Kho mã nguồn:** https://github.com/andominh2202/my-profile

---

## Tính năng đã hoàn thiện

- **Three.js WebGL Aurora (`AuroraScene`):** Shader GLSL cực quang đa lớp + trường hạt thích ứng 3 mức chất lượng (`high` / `medium` / `low`), tự tạm dừng khi ẩn tab và tự fallback sang CSS Aurora trên thiết bị yếu hoặc khi giảm chuyển động.
- **4 Giao diện (Theme Switcher):** **Aurora**, **Midnight**, **Cyber**, và **Polar Light** (lưu `localStorage`, đồng bộ `meta[name="theme-color"]`).
- **Motion Engine:** GSAP + ScrollTrigger + Lenis cuộn mượt, kinetic typography giữ nguyên dấu tiếng Việt, 3D card tilt nhẹ (tuyệt đối không có hiệu ứng vòng tròn theo chuột).
- **Command Palette (`Ctrl + K` / `Cmd + K`):** Tìm kiếm nhanh mục, mở mạng xã hội, sao chép Discord, đổi giao diện, mở Terminal.
- **Developer Terminal:** Lệnh client-side an toàn (`help`, `about`, `profile`, `games`, `projects`, `music`, `social`, `skills`, `contact`, `aurora`, `clear`).
- **Game Category Filter:** Lọc danh sách game theo thể loại thực tế.
- **Spotify Showcase:** Tải lười bằng `IntersectionObserver`, tự động chuyển sang nút mở trực tiếp Spotify khi ngoại tuyến hoặc bị chặn iframe.
- **Accessibility Panel:** Bật/tắt trực tiếp Giảm chuyển động, Tăng tương phản, Cỡ chữ lớn và Giảm hiệu ứng nền.

---

## Công nghệ sử dụng

- **Core:** React 18, TypeScript 5.7, Vite 6
- **3D / Visual:** Three.js (GLSL Aurora Shader + Points)
- **Motion:** GSAP 3.12 + ScrollTrigger, Lenis 1.1
- **Icons:** Lucide React

---

## Cấu trúc thư mục

```text
my-profile/
├── .github/workflows/deploy.yml   # GitHub Actions build & deploy Pages
├── public/assets/                 # avatar.svg, cover.svg, og-cover.png
├── src/
│   ├── app/App.tsx                # Ứng dụng chính, GSAP/Lenis, Scrollspy
│   ├── components/                # navigation, hero, profile, gaming, music, projects, social, contact, terminal, common, effects
│   ├── data/profile.ts            # Dữ liệu cá nhân (chỉnh sửa thông tin tại đây)
│   ├── hooks/                     # useTheme, useQualityLevel, useA11ySettings
│   ├── scenes/AuroraScene.tsx     # Three.js Aurora & Particles
│   ├── styles/tokens.css          # Nguồn Design Tokens duy nhất
│   ├── types/profile.ts           # Định nghĩa TypeScript
│   └── utils/                     # clipboard.ts, spotify.ts
├── css/styles.css                 # Layout Bento Grid, responsive & component styles
├── index.html                     # Entry Vite + SEO / Open Graph / JSON-LD
├── package.json
└── vite.config.ts                 # Cấu hình base: '/my-profile/'
```

---

## Cài đặt & chạy trên máy

```bash
npm ci
npm run dev
```

Kiểm tra TypeScript và build production:

```bash
npm run typecheck
npm run build
npm run preview
```

---

## Triển khai GitHub Pages

Repository đã cấu hình sẵn `.github/workflows/deploy.yml` với `base: '/my-profile/'`.
Mỗi khi push lên nhánh `main`, GitHub Actions sẽ tự động chạy `npm ci` → `npm run typecheck` → `npm run build` và deploy thư mục `dist/` lên GitHub Pages (chọn **Source: GitHub Actions** trong **Settings → Pages**).
