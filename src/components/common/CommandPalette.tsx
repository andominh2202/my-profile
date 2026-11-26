import { useEffect, useMemo, useRef, useState } from 'react';
import { Command, Search, X } from 'lucide-react';
import { PROFILE } from '../../data/profile';
import { THEME_OPTIONS, type AuroraTheme } from '../../hooks/useTheme';
import { safeUrl } from '../../utils/clipboard';

interface CommandItem {
  id: string;
  label: string;
  group: string;
  action: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
  onSetTheme: (t: AuroraTheme) => void;
  onCopy: (key: string, value: string) => void;
  onOpenTerminal: () => void;
}

export function CommandPalette({
  open,
  onClose,
  onNavigate,
  onSetTheme,
  onCopy,
  onOpenTerminal
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const commands: CommandItem[] = useMemo(() => {
    const list: CommandItem[] = [
      { id: 'nav-about', label: 'Đi tới: Giới thiệu', group: 'Điều hướng', action: () => onNavigate('about') },
      { id: 'nav-socials', label: 'Đi tới: Mạng xã hội', group: 'Điều hướng', action: () => onNavigate('socials') },
      { id: 'nav-music', label: 'Đi tới: Playlist nhạc', group: 'Điều hướng', action: () => onNavigate('music') },
      { id: 'nav-games', label: 'Đi tới: Game yêu thích', group: 'Điều hướng', action: () => onNavigate('games') },
      { id: 'nav-hobbies', label: 'Đi tới: Sở thích', group: 'Điều hướng', action: () => onNavigate('hobbies') },
      { id: 'nav-connect', label: 'Đi tới: Kết nối', group: 'Điều hướng', action: () => onNavigate('connect') },
      { id: 'open-term', label: 'Mở Developer Terminal', group: 'Công cụ', action: onOpenTerminal }
    ];

    PROFILE.socials.forEach((s) => {
      const url = safeUrl(s.url);
      if (url) {
        list.push({
          id: `soc-${s.id}`,
          label: `Mở ${s.label} (${s.handle})`,
          group: 'Mạng xã hội',
          action: () => window.open(url, '_blank', 'noopener,noreferrer')
        });
      } else if (s.handle) {
        list.push({
          id: `soc-copy-${s.id}`,
          label: `Copy ${s.label}: ${s.handle}`,
          group: 'Sao chép',
          action: () => onCopy(`cmd-${s.id}`, s.handle)
        });
      }
    });

    THEME_OPTIONS.forEach((t) => {
      list.push({
        id: `theme-${t.id}`,
        label: `Đổi giao diện: ${t.label}`,
        group: 'Giao diện',
        action: () => onSetTheme(t.id)
      });
    });

    return list;
  }, [onNavigate, onOpenTerminal, onCopy, onSetTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.group.toLowerCase().includes(q)
    );
  }, [commands, query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(0);
      window.setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  if (!open) return null;

  const runItem = (item: CommandItem) => {
    item.action();
    onClose();
  };

  const onKeyDown = (ev: React.KeyboardEvent) => {
    if (ev.key === 'Escape') {
      ev.preventDefault();
      onClose();
    } else if (ev.key === 'ArrowDown') {
      ev.preventDefault();
      setSelected((s) => (filtered.length ? (s + 1) % filtered.length : 0));
    } else if (ev.key === 'ArrowUp') {
      ev.preventDefault();
      setSelected((s) => (filtered.length ? (s - 1 + filtered.length) % filtered.length : 0));
    } else if (ev.key === 'Enter' && filtered[selected]) {
      ev.preventDefault();
      runItem(filtered[selected]);
    }
  };

  return (
    <div
      className="cmd-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Bảng lệnh nhanh"
      onClick={onClose}
      onKeyDown={onKeyDown}
    >
      <div className="cmd-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-head">
          <Search size={17} aria-hidden="true" />
          <input
            ref={inputRef}
            className="cmd-input"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(0);
            }}
            placeholder="Tìm mục, mạng xã hội, đổi giao diện..."
            aria-label="Tìm kiếm lệnh"
          />
          <button type="button" className="cmd-close" onClick={onClose} aria-label="Đóng bảng lệnh">
            <X size={16} />
          </button>
        </div>

        <ul className="cmd-list" role="listbox">
          {filtered.length === 0 ? (
            <li className="cmd-empty">Không tìm thấy kết quả phù hợp.</li>
          ) : (
            filtered.map((item, idx) => (
              <li key={item.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={idx === selected}
                  className={`cmd-item${idx === selected ? ' is-selected' : ''}`}
                  onMouseEnter={() => setSelected(idx)}
                  onClick={() => runItem(item)}
                >
                  <span>{item.label}</span>
                  <span className="cmd-group">{item.group}</span>
                </button>
              </li>
            ))
          )}
        </ul>

        <div className="cmd-foot">
          <span><Command size={12} aria-hidden="true" /> Ctrl+K để mở · ↑↓ chọn · Enter thực thi · Esc đóng</span>
        </div>
      </div>
    </div>
  );
}
