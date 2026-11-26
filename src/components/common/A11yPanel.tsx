import { SlidersHorizontal, X } from 'lucide-react';
import type { A11ySettings } from '../../hooks/useA11ySettings';

interface A11yPanelProps {
  open: boolean;
  settings: A11ySettings;
  onToggle: (key: keyof A11ySettings) => void;
  onClose: () => void;
}

const OPTIONS: { key: keyof A11ySettings; label: string; desc: string }[] = [
  { key: 'reduceMotion', label: 'Giảm chuyển động', desc: 'Tắt GSAP/Lenis và các hiệu ứng động.' },
  { key: 'highContrast', label: 'Tăng tương phản', desc: 'Làm rõ viền và độ tương phản chữ.' },
  { key: 'largeText', label: 'Cỡ chữ lớn', desc: 'Phóng to kích thước chữ toàn trang.' },
  { key: 'simplifyEffects', label: 'Giảm hiệu ứng nền', desc: 'Tắt WebGL Aurora và lớp ánh sáng nền.' }
];

export function A11yPanel({ open, settings, onToggle, onClose }: A11yPanelProps) {
  if (!open) return null;

  return (
    <div
      className="cmd-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Cài đặt trợ năng"
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
            <span>Trợ năng &amp; Hiển thị</span>
          </span>
          <button type="button" className="cmd-close" onClick={onClose} aria-label="Đóng cài đặt trợ năng">
            <X size={16} />
          </button>
        </div>

        <div className="cmd-list" style={{ padding: '12px 16px', gap: '10px' }}>
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
