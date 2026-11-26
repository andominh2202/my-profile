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
        try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
        applyTheme(next, true);
      });
    }

    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: light)');
      var onSystemChange = function (e) {
        var hasManual = false;
        try { hasManual = !!localStorage.getItem(THEME_KEY); } catch (err) {}
        if (!hasManual) applyTheme(e.matches ? 'light' : 'dark', true);
      };
      if (mq.addEventListener) mq.addEventListener('change', onSystemChange);
    }
  }

  /* ---------- Spotify Embed ---------- */
  var SPOTIFY_TYPES = ['playlist', 'album', 'track', 'artist', 'episode', 'show'];

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

  function renderMusic(spotify) {
    var embed = $('music-embed');
    var link = $('music-link');
    var info = parseSpotify(spotify && spotify.playlistUrl);

    if (embed) {
      clear(embed);
      if (info) {
        var iframe = document.createElement('iframe');
        iframe.title = 'Trình phát Spotify playlist';
        iframe.width = '100%';
        iframe.height = '352';
        iframe.setAttribute('loading', 'lazy');
        iframe.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture');
        iframe.addEventListener('load', function () {
          iframe.classList.add('is-loaded');
        }, { once: true });
        iframe.src = 'https://open.spotify.com/embed/' + info.type + '/' + info.id + '?utm_source=generator&theme=0';
        embed.appendChild(iframe);
        // Fallback visibility in case cross-origin load event is delayed offline
        setTimeout(function () { iframe.classList.add('is-loaded'); }, 900);
      } else {
        embed.appendChild(el('p', 'music-embed__fallback',
          'Chưa có playlist hợp lệ. Hãy dán link playlist Spotify vào js/data.js (spotify.playlistUrl).'));
      }
    }

    if (link) {
      if (info) {
        link.setAttribute('href', 'https://open.spotify.com/' + info.type + '/' + info.id);
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        link.hidden = false;
      } else {
        link.removeAttribute('href');
        link.hidden = true;
      }
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
      var gameCount = Array.isArray(p.games) ? p.games.length : 0;
      var items = [
        { label: 'Khu vực', value: str(p.location) || 'Việt Nam' },
        { label: 'Góc game', value: gameCount > 0 ? gameCount + ' tựa game yêu thích' : 'Đang cập nhật' },
        { label: 'Phong cách', value: str(p.tagline) || 'Game · Nhạc · Công nghệ' }
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
        var riotTag = Array.isArray(p.gamerTags) && p.gamerTags[0];
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

    (list || []).forEach(function (s) {
      if (!s) return;
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

    (list || []).forEach(function (t) {
      if (!t) return;
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

    (list || []).forEach(function (g, index) {
      if (!g) return;
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

    (list || []).forEach(function (h) {
      if (!h) return;
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

  function renderConnect(p) {
    setText('connect-status', p.status);
    var root = $('connect-actions');
    if (!root) return;
    clear(root);

    var socials = Array.isArray(p.socials) ? p.socials : [];
    var tags = Array.isArray(p.gamerTags) ? p.gamerTags : [];

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

    var sections = sectionIds.map($).filter(Boolean);
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
      function () { renderHobbies(p.hobbies); },
      function () { renderConnect(p); }
    ].forEach(function (fn) {
      try { fn(); } catch (e) {
        if (window.console) console.warn('[profile] render error:', e);
      }
    });

    initCopy();
    initMobileNav();
    initScrollSpy();
    initBackToTop();
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
