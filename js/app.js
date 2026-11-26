/*
 * ==========================================================================
 * app.js — Render window.PROFILE (js/data.js), Theme Engine, Scrollspy,
 *          Mobile Drawer, Clipboard Feedback & Motion Controller.
 * Security: Zero innerHTML with user data; all text uses textContent.
 * ==========================================================================
 */
(function () {
  'use strict';

  var SVG_NS = 'http://www.w3.org/2000/svg';
  var THEME_KEY = 'profile-theme';

  /* ---------- Brand & Platform Vector Icons ---------- */
  var ICONS = {
    github: [
      ['path', { d: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' }]
    ],
    discord: [
      ['path', { d: 'M20.317 4.37a19.8 19.8 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z' }]
    ],
    facebook: [
      ['path', { d: 'M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z' }]
    ],
    instagram: [
      ['rect', { x: '2.5', y: '2.5', width: '19', height: '19', rx: '5.5', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }],
      ['circle', { cx: '12', cy: '12', r: '4.5', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }],
      ['circle', { cx: '17.5', cy: '6.5', r: '1.3' }]
    ],
    tiktok: [
      ['path', { d: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' }]
    ],
    spotify: [
      ['path', { d: 'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z' }]
    ],
    riot: [
      ['path', { d: 'M12.8 2L3 6.6l2.4 10.6 3.5-.9-.9-5.8 2.4-.5 1.8 6.8 3.5-.9-.8-6.7 2.4-.5 1.3 6.2 3.4-.9L21 4.8 12.8 2zm-3.1 17.4l.7 2.6 8.8-1.8-.4-2.5-9.1 1.7z' }]
    ],
    minecraft: [
      ['path', { d: 'M4 4h16v16H4V4zm3 4v4h3v2H8v4h2v-2h4v2h2v-4h-2v-2h3V8h-4v3h-2V8H7z' }]
    ],
    gamepad: [
      ['rect', { x: '2', y: '6', width: '20', height: '12', rx: '4', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }],
      ['path', { d: 'M6 12h4M8 10v4M15 13h.01M18 11h.01', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round' }]
    ],
    link: [
      ['path', { d: 'M10 14a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5M14 10a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round' }]
    ]
  };

  var reducedMotionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  function prefersReducedMotion() {
    return !!(reducedMotionQuery && reducedMotionQuery.matches);
  }

  /* ---------- DOM Helpers ---------- */
  function $(id) { return document.getElementById(id); }
  function str(v) { return v == null ? '' : String(v); }
  function stripAt(v) { return str(v).trim().replace(/^@+/, ''); }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null && text !== '') node.textContent = String(text);
    return node;
  }

  function setText(id, value) {
    var node = $(id);
    if (node && value != null) node.textContent = str(value);
  }

  function setSrc(id, value, alt) {
    var node = $(id);
    if (!node || !value) return;
    node.setAttribute('src', str(value));
    if (alt !== undefined) node.setAttribute('alt', str(alt));
  }

  function clear(node) {
    while (node && node.firstChild) node.removeChild(node.firstChild);
  }

  function createIcon(name) {
    var spec = ICONS[name] || ICONS.link;
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '20');
    svg.setAttribute('height', '20');
    svg.setAttribute('fill', 'currentColor');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    spec.forEach(function (item) {
      var child = document.createElementNS(SVG_NS, item[0]);
      Object.keys(item[1]).forEach(function (k) { child.setAttribute(k, item[1][k]); });
      svg.appendChild(child);
    });
    return svg;
  }

  function safeUrl(url) {
    var u = str(url).trim();
    return /^(https?:\/\/|mailto:)/i.test(u) ? u : '';
  }

  function getInitials(name) {
    var parts = str(name).trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return 'PR';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[parts.length - 2].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  function setSectionVisible(sectionId, visible) {
    var sec = $(sectionId);
    if (sec) sec.hidden = !visible;
    var navLinks = document.querySelectorAll(
      '.nav__link[href="#' + sectionId + '"], .nav__drawer-link[href="#' + sectionId + '"]'
    );
    Array.prototype.forEach.call(navLinks, function (link) {
      var li = link.parentElement;
      if (li && li.tagName === 'LI') li.hidden = !visible;
      else link.hidden = !visible;
    });
  }

  /* ---------- Theme Engine (Dark + Light + System Sync + Persistence) ---------- */
  var themeSwitchTimer = null;

  function getActiveTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function applyTheme(theme, animate) {
    var next = theme === 'light' ? 'light' : 'dark';
    var root = document.documentElement;

    if (animate && !prefersReducedMotion()) {
      root.classList.add('is-switching-theme');
      if (themeSwitchTimer) clearTimeout(themeSwitchTimer);
      themeSwitchTimer = setTimeout(function () {
        root.classList.remove('is-switching-theme');
        themeSwitchTimer = null;
      }, 300);
    }

    root.setAttribute('data-theme', next);
    root.style.colorScheme = next;

    var meta = $('meta-theme-color') || document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', next === 'light' ? '#F8FAFC' : '#080B12');

    var btn = $('theme-toggle');
    if (btn) {
      var isLight = next === 'light';
      btn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
      btn.setAttribute('aria-label', isLight ? 'Chuyển sang giao diện tối' : 'Chuyển sang giao diện sáng');
    }
  }

  function initTheme() {
    applyTheme(getActiveTheme(), false);

    var btn = $('theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var next = getActiveTheme() === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem(THEME_KEY, next); } catch (e) { }
        applyTheme(next, true);
      });
    }

    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: light)');
      var onSystemChange = function (e) {
        var hasManual = false;
        try { hasManual = !!localStorage.getItem(THEME_KEY); } catch (err) { }
        if (!hasManual) applyTheme(e.matches ? 'light' : 'dark', true);
      };
      if (mq.addEventListener) mq.addEventListener('change', onSystemChange);
    }
  }

  /* ---------- Spotify Embed ---------- */
  var SPOTIFY_TYPES = ['playlist', 'album', 'track', 'artist', 'episode', 'show'];
  var SPOTIFY_LABELS = {
    playlist: 'Playlist Spotify',
    album: 'Album Spotify',
    track: 'Bài hát Spotify',
    artist: 'Nghệ sĩ Spotify',
    episode: 'Tập podcast Spotify',
    show: 'Podcast Spotify'
  };

  function parseSpotify(input) {
    var raw = str(input).trim();
    if (!raw) return null;
    var type, id, m;

    m = raw.match(/^spotify:([a-z]+):([A-Za-z0-9]+)$/);
    if (m) {
      type = m[1];
      id = m[2];
    } else {
      var url;
      try { url = new URL(raw); } catch (e) { return null; }
      if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
      if (url.hostname !== 'open.spotify.com') return null;
      var parts = url.pathname.split('/').filter(Boolean);
      if (parts[0] && /^intl-[a-z-]+$/i.test(parts[0])) parts.shift();
      if (parts[0] === 'embed') parts.shift();
      type = parts[0];
      id = parts[1];
    }
    if (SPOTIFY_TYPES.indexOf(type) === -1) return null;
    if (!id || !/^[A-Za-z0-9]{10,40}$/.test(id)) return null;
    return { type: type, id: id };
  }

  function showMusicFallback(embed, spotifyUrl, message) {
    clear(embed);
    var box = el('div', 'music-embed__fallback');
    box.appendChild(el('p', '', message));
    if (spotifyUrl) {
      var action = el('a', 'btn btn--secondary', 'Mở trực tiếp trên Spotify ↗');
      action.href = spotifyUrl;
      action.target = '_blank';
      action.rel = 'noopener noreferrer';
      box.appendChild(action);
    }
    embed.appendChild(box);
  }

  function renderMusic(spotify) {
    var embed = $('music-embed');
    var link = $('music-link');
    var info = parseSpotify(spotify && spotify.playlistUrl);
    var directUrl = info ? 'https://open.spotify.com/' + info.type + '/' + info.id : '';

    if (link) {
      if (info) {
        link.setAttribute('href', directUrl);
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        link.hidden = false;
      } else {
        link.removeAttribute('href');
        link.hidden = true;
      }
    }

    if (!embed) return;
    clear(embed);

    if (!info) {
      showMusicFallback(embed, '', 'Chưa có liên kết Spotify hợp lệ trong cấu hình.');
      return;
    }

    if (window.navigator && window.navigator.onLine === false) {
      showMusicFallback(embed, directUrl, 'Bạn đang ngoại tuyến nên không thể tải trình phát Spotify nhúng.');
      return;
    }

    var placeholder = el('div', 'music__placeholder');
    placeholder.appendChild(el('span', '', 'Đang tải trình phát Spotify…'));
    var quickFallback = el('a', 'card__action', 'Mở trực tiếp trên Spotify ↗');
    quickFallback.href = directUrl;
    quickFallback.target = '_blank';
    quickFallback.rel = 'noopener noreferrer';
    quickFallback.style.marginLeft = '0';
    placeholder.appendChild(quickFallback);
    embed.appendChild(placeholder);

    function mountIframe() {
      if (window.navigator && window.navigator.onLine === false) {
        showMusicFallback(embed, directUrl, 'Bạn đang ngoại tuyến nên không thể tải trình phát Spotify nhúng.');
        return;
      }

      var settled = false;
      var iframe = document.createElement('iframe');
      iframe.title = SPOTIFY_LABELS[info.type] || 'Trình phát Spotify';
      iframe.width = '100%';
      iframe.height = '352';
      iframe.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture');

      var loadTimeout = setTimeout(function () {
        if (!settled) {
          settled = true;
          showMusicFallback(
            embed,
            directUrl,
            'Trình phát Spotify không phản hồi (có thể bị chặn hoặc mất kết nối).'
          );
        }
      }, 7000);

      iframe.addEventListener('load', function () {
        if (settled) return;
        settled = true;
        clearTimeout(loadTimeout);
        iframe.classList.add('is-loaded');
        if (placeholder.parentNode === embed) {
          embed.removeChild(placeholder);
        }
      }, { once: true });

      iframe.addEventListener('error', function () {
        if (settled) return;
        settled = true;
        clearTimeout(loadTimeout);
        showMusicFallback(embed, directUrl, 'Không thể tải trình phát Spotify nhúng.');
      }, { once: true });

      var themeParam = getActiveTheme() === 'dark' ? '&theme=0' : '';
      iframe.src = 'https://open.spotify.com/embed/' + info.type + '/' + info.id + '?utm_source=generator' + themeParam;
      embed.appendChild(iframe);
    }

    if ('IntersectionObserver' in window) {
      var musicIo = new IntersectionObserver(function (entries) {
        if (entries.some(function (e) { return e.isIntersecting; })) {
          musicIo.disconnect();
          mountIframe();
        }
      }, { rootMargin: '300px 0px' });
      musicIo.observe(embed);
    } else {
      mountIframe();
    }
  }

  /* ---------- Render Sections from window.PROFILE ---------- */
  function renderAbout(p) {
    var bioRoot = $('about-bio');
    if (bioRoot && p.bio) {
      clear(bioRoot);
      bioRoot.appendChild(el('p', '', p.bio));
    }

    var hlRoot = $('about-highlights');
    if (hlRoot) {
      clear(hlRoot);
      var validGames = Array.isArray(p.games)
        ? p.games.filter(function (g) { return g && str(g.title).trim(); })
        : [];
      var gameCount = validGames.length;
      var items = [
        { label: 'Khu vực', value: str(p.location) || 'Việt Nam' },
        { label: 'Góc game', value: gameCount > 0 ? gameCount + ' tựa game yêu thích' : 'Đang cập nhật' },
        { label: 'Nhịp sống', value: 'Game · Nhạc · Code' }
      ];
      items.forEach(function (item) {
        var tile = el('div', 'highlight-tile');
        tile.appendChild(el('span', 'highlight-tile__label', item.label));
        tile.appendChild(el('strong', 'highlight-tile__value', item.value));
        hlRoot.appendChild(tile);
      });
    }
  }

  function renderHeroQuick(p) {
    var socials = Array.isArray(p.socials) ? p.socials : [];
    var discordItem = null;
    socials.forEach(function (s) {
      if (s && str(s.id).toLowerCase() === 'discord' && !safeUrl(s.url) && s.handle) {
        discordItem = s;
      }
    });

    var heroDiscordBtn = $('hero-copy-discord');
    if (heroDiscordBtn) {
      if (discordItem) {
        var handle = str(discordItem.handle);
        var labelText = 'Copy Discord · ' + handle;
        heroDiscordBtn.setAttribute('data-copy', 'value');
        heroDiscordBtn.setAttribute('data-copy-value', handle);
        var labelSpan = heroDiscordBtn.querySelector('.btn__copy-label');
        if (labelSpan) {
          labelSpan.textContent = labelText;
          labelSpan.setAttribute('data-default-label', labelText);
        }
      } else {
        var validTags = Array.isArray(p.gamerTags)
          ? p.gamerTags.filter(function (t) { return t && str(t.value).trim(); })
          : [];
        var riotTag = validTags[0];
        if (riotTag && riotTag.value) {
          var val = str(riotTag.value);
          var rLabel = 'Copy ' + str(riotTag.label || 'ID') + ' · ' + val;
          heroDiscordBtn.setAttribute('data-copy', 'value');
          heroDiscordBtn.setAttribute('data-copy-value', val);
          var rSpan = heroDiscordBtn.querySelector('.btn__copy-label');
          if (rSpan) {
            rSpan.textContent = rLabel;
            rSpan.setAttribute('data-default-label', rLabel);
          }
        } else {
          heroDiscordBtn.hidden = true;
        }
      }
    }

    var quickRoot = $('hero-socials');
    if (!quickRoot) return;
    clear(quickRoot);

    socials.forEach(function (s) {
      if (!s) return;
      var id = str(s.id).toLowerCase().replace(/[^a-z0-9-]/g, '');
      var url = safeUrl(s.url);
      var node;
      if (url) {
        node = document.createElement('a');
        node.href = url;
        node.target = '_blank';
        node.rel = 'noopener noreferrer';
        node.setAttribute('aria-label', str(s.label) + ': ' + str(s.handle) + ' (mở tab mới)');
        node.title = str(s.label) + ' (' + str(s.handle) + ')';
      } else {
        node = document.createElement('button');
        node.type = 'button';
        node.setAttribute('data-copy', 'handle');
        node.setAttribute('data-copy-value', str(s.handle));
        node.setAttribute('aria-label', 'Copy ' + str(s.label) + ': ' + str(s.handle));
        node.title = 'Copy ' + str(s.label) + ': ' + str(s.handle);
      }
      node.className = 'hero__social-btn';
      node.appendChild(createIcon(id));
      quickRoot.appendChild(node);
    });

    var spInfo = parseSpotify(p.spotify && p.spotify.playlistUrl);
    if (spInfo) {
      var spLink = document.createElement('a');
      spLink.className = 'hero__social-btn';
      spLink.href = 'https://open.spotify.com/' + spInfo.type + '/' + spInfo.id;
      spLink.target = '_blank';
      spLink.rel = 'noopener noreferrer';
      spLink.setAttribute('aria-label', 'Mở playlist Spotify (mở tab mới)');
      spLink.title = 'Playlist Spotify';
      spLink.appendChild(createIcon('spotify'));
      quickRoot.appendChild(spLink);
    }
  }

  function renderSocials(list) {
    var root = $('socials-list');
    if (!root) return;
    clear(root);

    var valid = (list || []).filter(function (s) {
      return s && str(s.label).trim() && (safeUrl(s.url) || str(s.handle).trim());
    });
    setSectionVisible('socials', valid.length > 0);
    if (!valid.length) return;

    valid.forEach(function (s) {
      var id = str(s.id).toLowerCase().replace(/[^a-z0-9-]/g, '');
      var url = safeUrl(s.url);
      var card;
      var trailText;

      if (url) {
        card = document.createElement('a');
        card.href = url;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
        card.setAttribute('aria-label', str(s.label) + ': ' + str(s.handle) + ' (mở tab mới)');
        trailText = 'Mở ↗';
      } else {
        card = document.createElement('button');
        card.type = 'button';
        card.setAttribute('data-copy', 'handle');
        card.setAttribute('data-copy-value', str(s.handle));
        card.setAttribute('aria-label', 'Copy ' + str(s.label) + ': ' + str(s.handle));
        trailText = 'Sao chép';
      }
      card.className = 'social-card social-card--' + id;

      var icon = el('span', 'social-card__icon');
      icon.setAttribute('aria-hidden', 'true');
      icon.appendChild(createIcon(id));

      var text = el('span', 'social-card__text');
      text.appendChild(el('span', 'social-card__label', s.label));
      text.appendChild(el('span', 'social-card__handle', s.handle));

      var trail = el('span', 'social-card__trail', trailText);
      trail.setAttribute('data-default-label', trailText);
      trail.setAttribute('aria-hidden', 'true');

      card.appendChild(icon);
      card.appendChild(text);
      card.appendChild(trail);
      root.appendChild(card);
    });
  }

  function renderGamerTags(list) {
    var root = $('gamertags-list');
    if (!root) return;
    clear(root);

    var valid = (list || []).filter(function (t) {
      return t && str(t.value).trim();
    });
    setSectionVisible('gamertags', valid.length > 0);

    var passLink = document.querySelector('.hero__pass-link');
    if (passLink) {
      if (valid.length > 0) {
        passLink.setAttribute('href', '#gamertags');
        var passLabel = passLink.querySelector('span');
        if (passLabel) passLabel.textContent = 'ID Ingame';
        passLink.hidden = false;
      } else {
        passLink.setAttribute('href', '#socials');
        var passLabelSocial = passLink.querySelector('span');
        if (passLabelSocial) passLabelSocial.textContent = 'Mạng xã hội';
        passLink.hidden = false;
      }
    }

    if (!valid.length) return;

    valid.forEach(function (t) {
      var platform = str(t.platform).toLowerCase().replace(/[^a-z0-9-]/g, '');
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tag-card tag-card--' + platform;
      btn.setAttribute('data-copy', 'value');
      btn.setAttribute('data-copy-value', str(t.value));
      btn.setAttribute('aria-label', 'Copy ' + str(t.label) + ': ' + str(t.value));

      var icon = el('span', 'tag-card__icon');
      icon.setAttribute('aria-hidden', 'true');
      icon.appendChild(createIcon(ICONS[platform] ? platform : 'gamepad'));

      var hint = el('span', 'tag-card__hint', 'Bấm để copy');
      hint.setAttribute('data-default-label', 'Bấm để copy');
      hint.setAttribute('aria-hidden', 'true');

      btn.appendChild(icon);
      btn.appendChild(el('span', 'tag-card__label', t.label));
      btn.appendChild(el('span', 'tag-card__value', t.value));
      btn.appendChild(hint);
      root.appendChild(btn);
    });
  }

  function renderGames(list) {
    var root = $('games-list');
    if (!root) return;
    clear(root);

    var valid = (list || []).filter(function (g) {
      return g && str(g.title).trim();
    });
    setSectionVisible('games', valid.length > 0);
    if (!valid.length) return;

    valid.forEach(function (g, index) {
      var card = el('article', 'game-card' + (index === 0 ? ' game-card--featured' : ''));
      var cover = el('div', 'game-card__cover');
      var title = str(g.title);

      function useInitial() {
        clear(cover);
        if (index === 0) {
          var badge = el('span', 'game-card__badge', 'Tựa game chính');
          cover.appendChild(badge);
        }
        var mono = el('span', 'game-card__monogram', title.trim().charAt(0).toUpperCase() || '?');
        mono.setAttribute('aria-hidden', 'true');
        cover.appendChild(mono);
      }

      if (g.image) {
        if (index === 0) {
          cover.appendChild(el('span', 'game-card__badge', 'Tựa game chính'));
        }
        var img = document.createElement('img');
        img.alt = title;
        img.loading = 'lazy';
        img.addEventListener('error', useInitial, { once: true });
        img.src = str(g.image);
        cover.appendChild(img);
      } else {
        useInitial();
      }

      var body = el('div', 'game-card__body');
      if (g.genre) body.appendChild(el('span', 'game-card__genre', g.genre));
      body.appendChild(el('h3', 'game-card__title', title));
      if (g.note) body.appendChild(el('p', 'game-card__note', g.note));

      card.appendChild(cover);
      card.appendChild(body);
      root.appendChild(card);
    });
  }

  function renderHobbies(list) {
    var root = $('hobbies-list');
    if (!root) return;
    clear(root);

    var valid = (list || []).filter(function (h) {
      return h && str(h.title).trim();
    });
    setSectionVisible('hobbies', valid.length > 0);
    if (!valid.length) return;

    valid.forEach(function (h) {
      var card = el('div', 'hobby-card');
      var icon = el('span', 'hobby-card__icon', h.icon || '✦');
      icon.setAttribute('aria-hidden', 'true');

      var body = el('div', 'hobby-card__body');
      body.appendChild(el('h3', 'hobby-card__title', h.title));
      body.appendChild(el('p', 'hobby-card__desc', h.desc));

      card.appendChild(icon);
      card.appendChild(body);
      root.appendChild(card);
    });
  }

  function renderProjects(list) {
    var root = $('projects-list');
    if (!root) return;
    clear(root);

    var valid = (list || []).filter(function (item) {
      return item && str(item.title || item.name).trim();
    });
    setSectionVisible('projects', valid.length > 0);
    if (!valid.length) return;

    valid.forEach(function (item) {
      var title = str(item.title || item.name).trim();
      var desc = str(item.description || item.desc).trim();
      var imgUrl = str(item.image).trim();
      var repoUrl = safeUrl(item.repoUrl || item.codeUrl || item.github);
      var demoUrl = safeUrl(item.demoUrl || item.url);
      var techList = Array.isArray(item.tech || item.stack) ? (item.tech || item.stack) : [];

      var card = el('article', 'project-card');

      if (imgUrl) {
        var cover = el('div', 'project-card__cover');
        var img = document.createElement('img');
        img.alt = title;
        img.loading = 'lazy';
        img.addEventListener('error', function () {
          if (cover.parentNode === card) card.removeChild(cover);
        }, { once: true });
        img.src = imgUrl;
        cover.appendChild(img);
        card.appendChild(cover);
      }

      var body = el('div', 'project-card__body');
      body.appendChild(el('h3', 'project-card__title', title));
      if (desc) body.appendChild(el('p', 'project-card__desc', desc));

      var cleanTech = techList.map(function (t) { return str(t).trim(); }).filter(Boolean);
      if (cleanTech.length) {
        var techWrap = el('div', 'project-card__tech');
        cleanTech.forEach(function (t) {
          techWrap.appendChild(el('span', 'project-card__tag', t));
        });
        body.appendChild(techWrap);
      }

      if (repoUrl || demoUrl) {
        var links = el('div', 'project-card__links');
        if (repoUrl) {
          var codeLink = el('a', 'project-card__link', 'Code ↗');
          codeLink.href = repoUrl;
          codeLink.target = '_blank';
          codeLink.rel = 'noopener noreferrer';
          codeLink.setAttribute('aria-label', 'Xem mã nguồn dự án ' + title + ' (mở tab mới)');
          links.appendChild(codeLink);
        }
        if (demoUrl) {
          var demoLink = el('a', 'project-card__link project-card__link--demo', 'Demo ↗');
          demoLink.href = demoUrl;
          demoLink.target = '_blank';
          demoLink.rel = 'noopener noreferrer';
          demoLink.setAttribute('aria-label', 'Xem bản chạy thử dự án ' + title + ' (mở tab mới)');
          links.appendChild(demoLink);
        }
        body.appendChild(links);
      }

      card.appendChild(body);
      root.appendChild(card);
    });
  }

  function renderConnect(p) {
    setText('connect-status', p.status);
    var root = $('connect-actions');
    if (!root) return;
    clear(root);

    var socials = Array.isArray(p.socials) ? p.socials : [];
    var tags = Array.isArray(p.gamerTags)
      ? p.gamerTags.filter(function (t) { return t && str(t.value).trim(); })
      : [];
    var hasRiotId = tags.some(function (t) {
      return str(t.platform).toLowerCase() === 'riot';
    });

    setText(
      'connect-desc',
      hasRiotId
        ? 'Cứ thoải mái nhắn mình qua Discord, Facebook hoặc kết bạn trực tiếp bằng Riot ID để lập team buổi tối. Mọi thông tin kết nối đều sẵn sàng bên cạnh.'
        : 'Cứ thoải mái nhắn mình qua Discord hoặc Facebook để trò chuyện hay rủ chơi game cùng nhé. Mọi thông tin kết nối đều sẵn sàng bên cạnh.'
    );

    // 1. Copyable socials (e.g. Discord)
    socials.forEach(function (s) {
      if (!s || safeUrl(s.url) || !s.handle) return;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'connect-btn';
      btn.setAttribute('data-copy', 'value');
      btn.setAttribute('data-copy-value', str(s.handle));
      btn.setAttribute('aria-label', 'Copy ' + str(s.label) + ': ' + str(s.handle));

      var top = el('span', 'connect-btn__top');
      top.appendChild(el('span', '', str(s.label)));
      var badge = el('span', 'connect-btn__state', 'Sao chép');
      badge.setAttribute('data-default-label', 'Sao chép');
      top.appendChild(badge);

      btn.appendChild(top);
      btn.appendChild(el('span', 'connect-btn__value', s.handle));
      root.appendChild(btn);
    });

    // 2. First Gamertag (e.g. Riot ID)
    if (tags[0] && tags[0].value) {
      var t = tags[0];
      var tBtn = document.createElement('button');
      tBtn.type = 'button';
      tBtn.className = 'connect-btn';
      tBtn.setAttribute('data-copy', 'value');
      tBtn.setAttribute('data-copy-value', str(t.value));
      tBtn.setAttribute('aria-label', 'Copy ' + str(t.label) + ': ' + str(t.value));

      var tTop = el('span', 'connect-btn__top');
      tTop.appendChild(el('span', '', str(t.label)));
      var tBadge = el('span', 'connect-btn__state', 'Sao chép');
      tBadge.setAttribute('data-default-label', 'Sao chép');
      tTop.appendChild(tBadge);

      tBtn.appendChild(tTop);
      tBtn.appendChild(el('span', 'connect-btn__value', t.value));
      root.appendChild(tBtn);
    }

    // 3. Up to 2 External Social Links (prioritize Facebook & GitHub, then remaining)
    var linkedSocials = socials.filter(function (s) { return s && safeUrl(s.url); });
    linkedSocials.sort(function (a, b) {
      var order = { facebook: 1, github: 2, instagram: 3, tiktok: 4 };
      return (order[a.id] || 9) - (order[b.id] || 9);
    });

    linkedSocials.slice(0, 2).forEach(function (s) {
      var a = document.createElement('a');
      a.className = 'connect-btn';
      a.href = safeUrl(s.url);
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.setAttribute('aria-label', 'Mở ' + str(s.label) + ': ' + str(s.handle) + ' (mở tab mới)');

      var top = el('span', 'connect-btn__top');
      top.appendChild(el('span', '', str(s.label)));
      top.appendChild(el('span', '', 'Mở ↗'));

      a.appendChild(top);
      a.appendChild(el('span', 'connect-btn__value', s.handle));
      root.appendChild(a);
    });
  }

  /* ---------- Accessible Live Toast ---------- */
  var toastTimer = null;
  function showToast(message) {
    var toast = $('toast');
    if (!toast) return;
    if (toastTimer) clearTimeout(toastTimer);

    toast.classList.remove('is-visible');
    toast.textContent = '';

    window.requestAnimationFrame(function () {
      toast.textContent = str(message);
      toast.classList.add('is-visible');
      toastTimer = setTimeout(function () {
        toast.classList.remove('is-visible');
        setTimeout(function () {
          if (!toast.classList.contains('is-visible')) toast.textContent = '';
        }, 240);
        toastTimer = null;
      }, 2200);
    });
  }

  /* ---------- Clipboard with Per-Element Feedback ---------- */
  var copyTimers = typeof WeakMap !== 'undefined' ? new WeakMap() : null;

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(
        function () { return true; },
        function () { return fallbackCopy(text); }
      );
    }
    return Promise.resolve(fallbackCopy(text));
  }

  function getCopyValue(node) {
    if (node.hasAttribute('data-copy-value')) return node.getAttribute('data-copy-value');
    var field = node.getAttribute('data-copy');
    var target = field && node.querySelector('[class$="__' + field + '"]');
    return target ? target.textContent : '';
  }

  function markCopiedState(node) {
    node.classList.add('is-copied');
    var labelEl = node.querySelector('[data-default-label]');
    if (labelEl) {
      labelEl.textContent = 'Đã copy ✓';
    }

    if (copyTimers && copyTimers.has(node)) {
      clearTimeout(copyTimers.get(node));
    }

    var tid = setTimeout(function () {
      node.classList.remove('is-copied');
      if (labelEl) {
        labelEl.textContent = labelEl.getAttribute('data-default-label') || 'Bấm để copy';
      }
    }, 1800);

    if (copyTimers) copyTimers.set(node, tid);
  }

  function initCopy() {
    document.addEventListener('click', function (ev) {
      var node = ev.target && ev.target.closest ? ev.target.closest('[data-copy]') : null;
      if (!node) return;
      ev.preventDefault();
      var value = str(getCopyValue(node)).trim();
      if (!value) return;
      copyText(value).then(function (ok) {
        if (ok) markCopiedState(node);
        showToast(ok ? 'Đã copy: ' + value : 'Không copy được, hãy copy thủ công: ' + value);
      });
    });
  }

  /* ---------- Mobile Popover Navigation Drawer ---------- */
  function initMobileNav() {
    var toggle = $('nav-toggle');
    var drawer = $('nav-drawer');
    if (!toggle || !drawer) return;

    function isOpen() {
      return toggle.getAttribute('aria-expanded') === 'true';
    }

    function closeDrawer(restoreFocus) {
      if (!isOpen()) return;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Mở menu điều hướng');
      drawer.hidden = true;
      if (restoreFocus) toggle.focus();
    }

    function openDrawer() {
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Đóng menu điều hướng');
      drawer.hidden = false;
      var firstLink = drawer.querySelector('a, button');
      if (firstLink) firstLink.focus();
    }

    toggle.addEventListener('click', function () {
      if (isOpen()) closeDrawer(false);
      else openDrawer();
    });

    drawer.addEventListener('click', function (ev) {
      var link = ev.target && ev.target.closest ? ev.target.closest('a[href^="#"]') : null;
      if (link) closeDrawer(false);
    });

    document.addEventListener('click', function (ev) {
      if (!isOpen()) return;
      var shell = toggle.closest('.nav-shell');
      if (shell && !shell.contains(ev.target)) {
        closeDrawer(false);
      }
    });

    document.addEventListener('keydown', function (ev) {
      if (!isOpen()) return;
      if (ev.key === 'Escape') {
        ev.preventDefault();
        closeDrawer(true);
        return;
      }
      if (ev.key === 'Tab') {
        var focusables = Array.prototype.slice.call(
          drawer.querySelectorAll('a[href], button:not([disabled])')
        );
        focusables.unshift(toggle);
        if (!focusables.length) return;
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (ev.shiftKey && document.activeElement === first) {
          ev.preventDefault();
          last.focus();
        } else if (!ev.shiftKey && document.activeElement === last) {
          ev.preventDefault();
          first.focus();
        }
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024 && isOpen()) {
        closeDrawer(false);
      }
    });
  }

  /* ---------- Active Section Scrollspy & Back-to-Top ---------- */
  function initScrollSpy() {
    var allLinks = Array.prototype.slice.call(
      document.querySelectorAll('.nav__link[href^="#"], .nav__drawer-link[href^="#"]')
    );
    if (!allLinks.length || !('IntersectionObserver' in window)) return;

    var sectionIds = [];
    allLinks.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      if (id && sectionIds.indexOf(id) === -1) sectionIds.push(id);
    });

    var sections = sectionIds.map($).filter(function (sec) {
      return sec && !sec.hidden;
    });
    if (!sections.length) return;

    var clickLockUntil = 0;

    function setActive(activeId) {
      allLinks.forEach(function (a) {
        var match = a.getAttribute('href') === '#' + activeId;
        a.classList.toggle('is-active', match);
        if (match) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    }

    allLinks.forEach(function (a) {
      a.addEventListener('click', function () {
        var id = a.getAttribute('href').slice(1);
        if (id) {
          clickLockUntil = Date.now() + 500;
          setActive(id);
        }
      });
    });

    var io = new IntersectionObserver(function (entries) {
      if (Date.now() < clickLockUntil) return;
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, { rootMargin: '-22% 0px -62% 0px', threshold: 0 });

    sections.forEach(function (sec) { io.observe(sec); });

    window.addEventListener('scroll', function () {
      if (Date.now() < clickLockUntil) return;
      var nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 36;
      if (nearBottom && sections.length) {
        setActive(sections[sections.length - 1].id);
      }
    }, { passive: true });
  }

  function initBackToTop() {
    var topBtn = $('back-to-top');
    if (!topBtn) return;
    topBtn.addEventListener('click', function (ev) {
      ev.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth'
      });
      var topEl = $('top');
      if (topEl) topEl.focus({ preventScroll: true });
    });
  }

  /* ---------- Scroll Reveal (One-Shot + Decoupled Hover Settling) ---------- */
  function initReveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if (!items.length) return;

    function revealAllImmediately() {
      items.forEach(function (n) {
        n.classList.add('is-revealed', 'is-settled');
      });
    }

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      revealAllImmediately();
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      var visible = entries.filter(function (e) { return e.isIntersecting; });
      visible.forEach(function (entry, idx) {
        var target = entry.target;
        var delay = Math.min(idx * 50, 200);
        target.style.setProperty('--reveal-delay', delay + 'ms');
        target.classList.add('is-revealed');
        io.unobserve(target);

        setTimeout(function () {
          target.classList.add('is-settled');
        }, 520 + delay);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -28px 0px' });

    items.forEach(function (n) { io.observe(n); });

    if (reducedMotionQuery && reducedMotionQuery.addEventListener) {
      reducedMotionQuery.addEventListener('change', function (e) {
        if (e.matches) revealAllImmediately();
      });
    }
  }

  /* ---------- Scroll Progress, Preloader, WebGL Aurora, GSAP/Lenis & Desktop FX ---------- */
  function initPreloader() {
    var loader = $('preloader');
    if (!loader) return;
    if (document.documentElement.classList.contains('skip-intro') || prefersReducedMotion()) {
      loader.classList.add('is-done');
      return;
    }

    var fill = $('preloader-fill');
    var pct = $('preloader-pct');
    var progress = 25;
    var done = false;

    function setProgress(val) {
      progress = Math.min(100, Math.max(progress, val));
      if (fill) fill.style.transform = 'scaleX(' + (progress / 100).toFixed(2) + ')';
      if (pct) pct.textContent = Math.round(progress) + '%';
    }

    function finish() {
      if (done) return;
      done = true;
      setProgress(100);
      try { sessionStorage.setItem('nope_intro_seen', '1'); } catch (e) { }
      setTimeout(function () {
        loader.classList.add('is-done');
      }, 180);
    }

    setProgress(45);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        setProgress(85);
        setTimeout(finish, 140);
      }, finish);
    } else {
      setTimeout(finish, 260);
    }
    // Hard safety cap so external resources never block entry
    setTimeout(finish, 650);
  }

  function initWebGLAurora() {
    var canvas = $('aurora-canvas');
    if (!canvas || prefersReducedMotion() || window.innerWidth < 900) return;

    var gl = null;
    try {
      gl = canvas.getContext('webgl', { alpha: true, antialias: false, depth: false, powerPreference: 'low-power' });
    } catch (e) { gl = null; }
    if (!gl) return;

    var vertSrc =
      'attribute vec2 a_pos;' +
      'void main(){gl_Position=vec4(a_pos,0.0,1.0);}';

    var fragSrc =
      'precision mediump float;' +
      'uniform vec2 u_res;' +
      'uniform float u_time;' +
      'uniform vec2 u_mouse;' +
      'float wave(vec2 p,float f,float s){return sin(p.x*f+u_time*s+sin(p.y*1.6-u_time*0.25));}' +
      'void main(){' +
      'vec2 uv=gl_FragCoord.xy/u_res;' +
      'vec2 p=(uv-0.5)*vec2(u_res.x/max(u_res.y,1.0),1.0);' +
      'vec2 m=(u_mouse-0.5)*0.35;' +
      'float a=wave(p+m,2.4,0.35)*0.5+0.5;' +
      'float b=wave(p*1.3-m,3.1,-0.28)*0.5+0.5;' +
      'float c=smoothstep(0.95,0.05,length(p-vec2(m.x*0.6,-m.y*0.6)));' +
      'vec3 col=vec3(0.031,0.043,0.071);' +
      'col+=vec3(0.0,0.90,1.0)*(a*0.11*c);' +
      'col+=vec3(0.545,0.361,0.965)*(b*0.12);' +
      'col+=vec3(0.925,0.282,0.600)*(pow(a*b,2.0)*0.09);' +
      'float alpha=clamp((a*0.18+b*0.16)*c,0.0,0.45);' +
      'gl_FragColor=vec4(col,alpha);' +
      '}';

    function compile(type, src) {
      var sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    }

    var vs = compile(gl.VERTEX_SHADER, vertSrc);
    var fs = compile(gl.FRAGMENT_SHADER, fragSrc);
    if (!vs || !fs) return;

    var prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    var aPos = gl.getAttribLocation(prog, 'a_pos');
    var uRes = gl.getUniformLocation(prog, 'u_res');
    var uTime = gl.getUniformLocation(prog, 'u_time');
    var uMouse = gl.getUniformLocation(prog, 'u_mouse');

    var mx = 0.5, my = 0.5, tx = 0.5, ty = 0.5;
    var rafId = null;
    var start = performance.now();

    function resize() {
      var scale = 0.5;
      canvas.width = Math.max(320, Math.floor(window.innerWidth * scale));
      canvas.height = Math.max(240, Math.floor(window.innerHeight * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    function render(now) {
      if (document.hidden || getActiveTheme() === 'light') {
        rafId = null;
        return;
      }
      mx += (tx - mx) * 0.05;
      my += (ty - my) * 0.05;

      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - start) * 0.001);
      gl.uniform2f(uMouse, mx, my);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafId = window.requestAnimationFrame(render);
    }

    function startLoop() {
      if (!rafId && !document.hidden && getActiveTheme() === 'dark') {
        rafId = window.requestAnimationFrame(render);
      }
    }

    resize();
    canvas.classList.add('is-ready');
    startLoop();

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', function (ev) {
      tx = ev.clientX / Math.max(window.innerWidth, 1);
      ty = 1 - ev.clientY / Math.max(window.innerHeight, 1);
    }, { passive: true });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden && rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      } else {
        startLoop();
      }
    });
    window.addEventListener('pagehide', function () {
      if (rafId) window.cancelAnimationFrame(rafId);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    }, { once: true });
  }

  function initKineticHero() {
    var heading = $('hero-name');
    if (!heading) return;
    var text = str(heading.textContent).trim();
    if (!text) return;
    var words = text.split(/\s+/);
    clear(heading);
    words.forEach(function (word, idx) {
      heading.appendChild(el('span', 'kinetic-word', word));
      if (idx < words.length - 1) heading.appendChild(document.createTextNode(' '));
    });
  }

  function initMotionEngine() {
    var reduce = prefersReducedMotion();
    var hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

    if (reduce || !hasGsap) {
      initReveal();
      return;
    }

    var gsap = window.gsap;
    var ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    // Lenis smooth scroll synchronized with ScrollTrigger
    if (typeof window.Lenis !== 'undefined') {
      try {
        var lenis = new window.Lenis({
          duration: 1.05,
          easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
          smoothWheel: true
        });
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);

        // Preserve smooth anchor jumps via Lenis
        document.addEventListener('click', function (ev) {
          var anchor = ev.target && ev.target.closest ? ev.target.closest('a[href^="#"]') : null;
          if (!anchor) return;
          var href = anchor.getAttribute('href');
          if (!href || href === '#') return;
          var targetEl = document.querySelector(href);
          if (targetEl) {
            ev.preventDefault();
            lenis.scrollTo(targetEl, { offset: -84 });
          }
        });
      } catch (e) { }
    }

    // Kinetic Hero Word Entrance
    var words = document.querySelectorAll('#hero-name .kinetic-word');
    if (words.length) {
      gsap.from(words, {
        y: 18,
        opacity: 0,
        duration: 0.6,
        stagger: 0.07,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
      });
    }

    // Parallax subtle cover depth
    var coverImg = $('hero-cover');
    if (coverImg) {
      gsap.to(coverImg, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // Reveal Bento sections with ScrollTrigger (keeping CSS visibility clean)
    var cards = Array.prototype.slice.call(document.querySelectorAll('.card.reveal'));
    cards.forEach(function (card) {
      card.classList.add('is-revealed', 'is-settled');
      if (card.hidden) return;
      gsap.from(card, {
        y: 22,
        opacity: 0,
        duration: 0.55,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          once: true
        }
      });
    });
  }

  function initDesktopInteractions() {
    if (prefersReducedMotion() || !window.matchMedia) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    // 1. Ambient Cursor Ring
    var ring = $('cursor-ring');
    if (ring) {
      var cx = -100, cy = -100, rx = -100, ry = -100;
      var active = false;
      function tickCursor() {
        rx += (cx - rx) * 0.18;
        ry += (cy - ry) * 0.18;
        ring.style.transform = 'translate3d(' + rx.toFixed(1) + 'px,' + ry.toFixed(1) + 'px,0)';
        if (active) window.requestAnimationFrame(tickCursor);
      }
      document.addEventListener('pointermove', function (ev) {
        cx = ev.clientX;
        cy = ev.clientY;
        if (!active) {
          active = true;
          rx = cx;
          ry = cy;
          ring.classList.add('is-visible');
          window.requestAnimationFrame(tickCursor);
        }
        var hit = ev.target && ev.target.closest ? ev.target.closest('a, button, [data-copy]') : null;
        ring.classList.toggle('is-hover', !!hit);
      }, { passive: true });
      document.addEventListener('mouseleave', function () {
        active = false;
        ring.classList.remove('is-visible');
      });
    }

    // 2. Subtle Magnetic Buttons
    var magEls = document.querySelectorAll('.btn--primary, .hero__social-btn');
    Array.prototype.forEach.call(magEls, function (btn) {
      btn.addEventListener('pointermove', function (ev) {
        var r = btn.getBoundingClientRect();
        var dx = ((ev.clientX - r.left) / r.width - 0.5) * 8;
        var dy = ((ev.clientY - r.top) / r.height - 0.5) * 8;
        btn.style.transform = 'translate3d(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px,0)';
      }, { passive: true });
      btn.addEventListener('pointerleave', function () {
        btn.style.transform = '';
      }, { passive: true });
    });

    // 3. Subtle 3D Tilt Cards (<= 3.5 deg)
    var tiltEls = document.querySelectorAll('.hero__card, .game-card, .project-card');
    Array.prototype.forEach.call(tiltEls, function (card) {
      card.addEventListener('pointermove', function (ev) {
        var r = card.getBoundingClientRect();
        if (!r.width || !r.height) return;
        var px = (ev.clientX - r.left) / r.width - 0.5;
        var py = (ev.clientY - r.top) / r.height - 0.5;
        var rotY = (px * 5.5).toFixed(2);
        var rotX = (-py * 4.5).toFixed(2);
        card.style.transform = 'perspective(900px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) translate3d(0,-3px,0)';
      }, { passive: true });
      card.addEventListener('pointerleave', function () {
        card.style.transform = '';
      }, { passive: true });
    });
  }

  function initScrollProgress() {
    var bar = document.querySelector('.scroll-progress');
    if (!bar || prefersReducedMotion()) return;
    var ticking = false;
    function update() {
      ticking = false;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var ratio = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      bar.style.transform = 'scaleX(' + ratio.toFixed(4) + ')';
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
  }

  function initPointerLight() {
    if (prefersReducedMotion() || !window.matchMedia) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    var targets = document.querySelectorAll('.hero__card, .card--connect');
    Array.prototype.forEach.call(targets, function (elTarget) {
      elTarget.addEventListener('pointermove', function (ev) {
        var rect = elTarget.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        var x = ((ev.clientX - rect.left) / rect.width) * 100;
        var y = ((ev.clientY - rect.top) / rect.height) * 100;
        elTarget.style.setProperty('--px', x.toFixed(1) + '%');
        elTarget.style.setProperty('--py', y.toFixed(1) + '%');
      }, { passive: true });
    });
  }

  /* ---------- Bootstrap ---------- */
  function init() {
    initTheme();

    var p = window.PROFILE || {};
    var nick = stripAt(p.nickname);

    setSrc('hero-cover', p.cover, '');
    setSrc('hero-avatar', p.avatar, 'Ảnh đại diện của ' + (str(p.name) || 'chủ trang'));
    setText('hero-name', p.name);
    setText('hero-nickname', nick);
    setText('hero-tagline', p.tagline);
    setText('hero-status', p.status);
    setText('hero-location', p.location);

    setText('nav-monogram', getInitials(p.name));
    if (nick) {
      setText('nav-brand-text', nick);
      var navBrand = document.querySelector('.nav__brand');
      if (navBrand) navBrand.setAttribute('aria-label', nick + ' — Về đầu trang');
      setText('hero-pass-handle', '@' + nick);
      setText('footer-nick', nick);
    }
    setText('footer-name', p.name);
    setText('footer-tagline', p.tagline);
    setText('footer-year', new Date().getFullYear());

    if (p.name) {
      document.title = str(p.name) + (nick ? ' (' + nick + ')' : '') + ' — Hồ sơ cá nhân';
    }

    [
      function () { renderHeroQuick(p); },
      function () { renderAbout(p); },
      function () { renderGamerTags(p.gamerTags); },
      function () { renderSocials(p.socials); },
      function () { renderMusic(p.spotify); },
      function () { renderGames(p.games); },
      function () { renderProjects(p.projects); },
      function () { renderHobbies(p.hobbies); },
      function () { renderConnect(p); }
    ].forEach(function (fn) {
      try { fn(); } catch (e) {
        if (window.console) console.warn('[profile] render error:', e);
      }
    });

    initPreloader();
    initCopy();
    initMobileNav();
    initScrollSpy();
    initBackToTop();
    initKineticHero();
    initMotionEngine();
    initScrollProgress();
    initPointerLight();
    initDesktopInteractions();
    setTimeout(initWebGLAurora, 60);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
