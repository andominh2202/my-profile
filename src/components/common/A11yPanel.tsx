import { SlidersHorizontal, X } from 'lucide-react';
import type { A11ySettings } from '../../hooks/useA11ySettings';
import { THEME_OPTIONS, type AuroraTheme } from '../../hooks/useTheme';
import type { QualityLevel } from '../../types/profile';

export type QualityPreference = 'auto' | QualityLevel;

interface A11yPanelProps {
  open: boolean;
  settings: A11ySettings;
  theme: AuroraTheme;
  qualityPref: QualityPreference;
  onToggle: (key: keyof A11ySettings) => void;
  onSetTheme: (t: AuroraTheme) => void;
  onSetQuality: (q: QualityPreference) => void;
  onClose: () => void;
}

const OPTIONS: { key: keyof A11ySettings; label: string; desc: string }[] = [
  { key: 'reduceMotion', label: 'Giảm chuyển động', desc: 'Tắt GSAP/Lenis và các hiệu ứng động.' },
  { key: 'highContrast', label: 'Tăng tương phản', desc: 'Làm rõ viền và độ tương phản chữ.' },
  { key: 'largeText', label: 'Cỡ chữ lớn', desc: 'Phóng to kích thước chữ toàn trang.' },
  { key: 'simplifyEffects', label: 'Giảm hiệu ứng nền', desc: 'Tắt WebGL Aurora và lớp ánh sáng nền.' }
];

const QUALITY_OPTIONS: { id: QualityPreference; label: string }[] = [
  { id: 'auto', label: 'Tự động' },
  { id: 'high', label: 'Cao' },
  { id: 'medium', label: 'Trung bình' },
  { id: 'low', label: 'Nhẹ' }
];

export function A11yPanel({
  open,
  settings,
  theme,
  qualityPref,
  onToggle,
  onSetTheme,
  onSetQuality,
  onClose
}: A11yPanelProps) {
  if (!open) return null;

  return (
    <div
      className="cmd-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Cài đặt hiển thị và trợ năng"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        }
      }}
    >
      <div className="cmd-modal" onClick={(e) => e.stopPropagation()}>
        <div className="term-head">
          <span className="term-title">
            <SlidersHorizontal size={16} aria-hidden="true" />
            <span>Trợ năng, Giao diện &amp; Chất lượng</span>
          </span>
          <button type="button" className="cmd-close" onClick={onClose} aria-label="Đóng cài đặt">
            <X size={16} />
          </button>
        </div>

        <div className="cmd-list" style={{ padding: '14px 16px', gap: '12px', maxHeight: '70vh' }}>
          <div>
            <div className="cmd-group" style={{ marginBottom: '8px' }}>CHỦ ĐỀ GIAO DIỆN</div>
            <div className="filter-bar" style={{ marginBottom: 0 }}>
              {THEME_OPTIONS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={theme === t.id}
                  className={`filter-pill${theme === t.id ? ' is-active' : ''}`}
                  onClick={() => onSetTheme(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="cmd-group" style={{ marginBottom: '8px' }}>CHẤT LƯỢNG ĐỒ HỌA (WEBGL)</div>
            <div className="filter-bar" style={{ marginBottom: 0 }}>
              {QUALITY_OPTIONS.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  aria-pressed={qualityPref === q.id}
                  className={`filter-pill${qualityPref === q.id ? ' is-active' : ''}`}
                  onClick={() => onSetQuality(q.id)}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          <div className="cmd-group" style={{ marginTop: '4px' }}>TRỢ NĂNG</div>
          {OPTIONS.map((opt) => {
            const active = settings[opt.key];
            return (
              <button
                key={opt.key}
                type="button"
                role="switch"
                aria-checked={active}
                className={`cmd-item${active ? ' is-selected' : ''}`}
                onClick={() => onToggle(opt.key)}
              >
                <span style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', gap: '2px' }}>
                  <strong style={{ fontSize: '0.9rem' }}>{opt.label}</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{opt.desc}</span>
                </span>
                <span className="cmd-group">{active ? 'BẬT' : 'TẮT'}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
