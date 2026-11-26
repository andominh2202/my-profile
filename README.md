# Hồ sơ cá nhân — Đỗ Minh An (`Nope0612`)

Trang web giới thiệu bản thân tĩnh của **Đỗ Minh An (`Nope0612`)**, thiết kế theo bố cục **Bento Grid** với nền **Deep Navy** và điểm nhấn **Cyan / Electric Blue**.

- **Địa chỉ trang web (GitHub Pages):** https://andominh2202.github.io/my-profile/
- **Kho mã nguồn:** https://github.com/andominh2202/my-profile

---

## Tính năng thực sự có trong mã nguồn

- **Chế độ Sáng / Tối (Dark & Light Mode):** Nút chuyển đổi giao diện trên thanh điều hướng, tự nhận diện giao diện hệ thống, lưu lựa chọn vào `localStorage` và khởi tạo trước khi vẽ trang để tránh nháy màu.
- **Điều hướng thông minh:** Thanh điều hướng dính (`sticky`), tự động đánh dấu mục đang xem khi cuộn (`Scrollspy`), và menu dạng hộp thả trên điện thoại/máy tính bảng (hỗ trợ đóng bằng `Escape` hoặc bấm ra ngoài, giữ vòng lặp `Tab`).
- **Sao chép nhanh (Click-to-Copy):** Bấm vào Discord, Riot ID hoặc Minecraft để sao chép vào clipboard (có cơ chế dự phòng `execCommand` khi mở qua `file:///`) kèm thông báo toast hỗ trợ trình đọc màn hình.
- **Tự ẩn mục chưa có dữ liệu:** Nếu `gamerTags` hoặc `projects` (hoặc mục khác) rỗng/chưa điền giá trị, phần giao diện và liên kết điều hướng tương ứng sẽ tự động ẩn, đồng thời thẻ ghép cặp cùng hàng tự giãn đều.
- **Trình phát Spotify nhúng & Fallback:** Tự phân tích link playlist/album/track/podcast Spotify, chỉ tải khi cuộn gần tới (`IntersectionObserver`) và tự chuyển sang khung thông báo + nút mở trực tiếp Spotify nếu mất mạng hoặc bị chặn iframe.
- **Tối ưu truy cập & chuyển động:** Hỗ trợ `Skip link`, điều hướng bàn phím (`:focus-visible`), và tôn trọng `prefers-reduced-motion: reduce`.

---

## Công nghệ sử dụng

- **HTML5** (ngữ nghĩa, SEO, Open Graph, Twitter Card, JSON-LD `ProfilePage`)
- **CSS3** (CSS Variables cho Dark/Light tokens, CSS Grid 12 cột, Flexbox, Media Queries)
- **Vanilla JavaScript** (ES5/ES6 thuần dạng IIFE, không dùng framework, thư viện ngoài hay công cụ build)
- **Google Fonts** (`Plus Jakarta Sans`, `Inter`, `JetBrains Mono` kèm font hệ thống dự phòng)

---

## Cấu trúc thư mục

```text
my-profile/
├── index.html          # Cấu trúc trang, thẻ SEO/OG, script chống nháy theme
├── README.md           # Tài liệu hướng dẫn dự án
├── css/
│   └── styles.css      # Design tokens (Dark/Light), Bento Grid, responsive & animation
├── js/
│   ├── data.js         # Dữ liệu cá nhân (tên, bio, social, game, sở thích, dự án)
│   └── app.js          # Logic render DOM an toàn, theme, scrollspy, copy, Spotify
└── assets/
    ├── avatar.svg      # Ảnh đại diện mặc định
    ├── cover.svg       # Ảnh bìa mặc định
    └── og-cover.png    # Ảnh xem trước 1200×630 khi chia sẻ link (Open Graph)
```

---

## Cách chạy trên máy

Do là website tĩnh thuần và mọi đường dẫn đều là tương đối:

1. **Mở trực tiếp:** Nhấp đúp vào file `index.html` để mở bằng trình duyệt (`file:///`).
2. **Hoặc chạy qua local server** (khuyên dùng để kiểm tra đúng hành vi subpath `/my-profile/`):
   ```powershell
   npx http-server . -p 8080
   ```
   Sau đó truy cập `http://127.0.0.1:8080/`.

---

## Cách sửa thông tin, thêm ảnh game và thêm dự án

### 1. Sửa thông tin trong `js/data.js`
Mở `js/data.js` và chỉnh đối tượng `window.PROFILE`:
- **Thông tin cơ bản:** `name`, `nickname`, `tagline`, `bio`, `location`, `status`, `avatar`, `cover`.
- **Mạng xã hội (`socials`):** Để `url: ''` (ví dụ Discord) nếu muốn bấm vào là sao chép `handle` thay vì mở liên kết ngoài.
- **Tên ingame (`gamerTags`):** Điền `value` thật cho `Riot ID` hoặc `Minecraft`. Nếu để `''`, mục **Tên ingame** và liên kết menu tương ứng sẽ tự động ẩn.
- **Spotify (`spotify.playlistUrl`):** Dán link chia sẻ công khai từ Spotify (`https://open.spotify.com/playlist/...`).
- **Thêm ảnh cho Game (`games`):** Chép ảnh vào thư mục `assets/` (ví dụ `assets/valorant.jpg`) rồi điền `image: 'assets/valorant.jpg'`. Nếu để trống `''`, thẻ game sẽ hiển thị chữ cái đầu trên nền gradient.
- **Thêm Dự án (`projects`):** Bỏ comment hoặc thêm object mới vào mảng `projects`:
  ```js
  projects: [
    {
      title: 'Tên dự án',
      description: 'Mô tả ngắn về dự án.',
      tech: ['HTML5', 'CSS3', 'JavaScript'],
      image: 'assets/project-1.png', // Tùy chọn (để '' nếu không có ảnh)
      repoUrl: 'https://github.com/andominh2202/ten-repo', // Tùy chọn
      demoUrl: 'https://andominh2202.github.io/ten-repo/'   // Tùy chọn
    }
  ]
  ```
  Nếu `projects: []`, toàn bộ mục **Dự án** và liên kết trên menu sẽ tự động ẩn.

### 2. Những phần phải sửa trực tiếp trong `index.html`
Các crawler mạng xã hội và công cụ tìm kiếm thường đọc HTML tĩnh trước khi JavaScript chạy, vì vậy hãy sửa trực tiếp trong `index.html` khi đổi thông tin cốt lõi:
- Thẻ `<title>` và `<meta name="description">`
- Thẻ `<link rel="canonical">`
- Thẻ Open Graph (`og:url`, `og:title`, `og:description`, `og:image`) và Twitter Card (`twitter:title`, `twitter:description`, `twitter:image`)
- Khối `<script type="application/ld+json">` (`ProfilePage` / `sameAs`)
- Nội dung tĩnh ban đầu của `#hero-name`, `#hero-nickname`, `#hero-tagline`, `#hero-status`, `#connect-status`, `#about-bio` (để đồng bộ trước khi JS chạy).

---

## Cách cập nhật lên GitHub Pages

Repo hiện cấu hình remote `origin` trỏ tới `https://github.com/andominh2202/my-profile.git` (nhánh `main`), các đường dẫn tài nguyên đều dùng dạng tương đối để chạy đúng trong subpath `/my-profile/`:

1. Sau khi chỉnh sửa file và kiểm tra trên máy, đẩy thay đổi lên nhánh `main`:
   ```powershell
   git add .
   git commit -m "update: cap nhat thong tin ca nhan"
   git push origin main
   ```
2. Đảm bảo đã bật **GitHub Pages** tại **Settings → Pages** của repo:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` / `/ (root)`
   - Bật **Enforce HTTPS**.
3. Đợi 1–2 phút để GitHub build và kiểm tra lại tại https://andominh2202.github.io/my-profile/.
