import { useState } from 'react';
import { Terminal, X } from 'lucide-react';
import { PROFILE } from '../../data/profile';

interface DevTerminalProps {
  open: boolean;
  onClose: () => void;
}

interface LogLine {
  id: number;
  type: 'cmd' | 'out';
  text: string;
}

export function DevTerminal({ open, onClose }: DevTerminalProps) {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<LogLine[]>([
    { id: 1, type: 'out', text: 'NOPE0612 Terminal v4.0 — Gõ "help" để xem các lệnh hỗ trợ.' }
  ]);

  if (!open) return null;

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setLogs([]);
      return;
    }

    let reply = '';
    switch (cmd) {
      case 'help':
        reply = 'Lệnh hỗ trợ: help, about, profile, games, projects, music, social, contact, aurora, clear';
        break;
      case 'about':
      case 'profile':
        reply = `${PROFILE.name} (@${PROFILE.nickname}) · ${PROFILE.location}\n${PROFILE.tagline}\n${PROFILE.bio}`;
        break;
      case 'games':
        reply = PROFILE.games.map((g) => `- ${g.title} [${g.genre}]: ${g.note}`).join('\n');
        break;
      case 'projects':
        reply = PROFILE.projects.length
          ? PROFILE.projects.map((p) => `- ${p.title}: ${p.description}`).join('\n')
          : 'Chưa có dự án nào được thêm trong src/data/profile.ts.';
        break;
      case 'music':
        reply = `Spotify Playlist: ${PROFILE.spotify.playlistUrl}`;
        break;
      case 'social':
      case 'contact':
        reply = PROFILE.socials.map((s) => `- ${s.label}: ${s.handle}${s.url ? ' (' + s.url + ')' : ' (copy)'}`).join('\n');
        break;
      case 'aurora':
        reply = '✦ Aurora Borealis active — Midnight #050811 · Electric Cyan #00E5FF · Nebula Violet #7657FF';
        break;
      default:
        reply = `Không nhận diện được lệnh "${cmd}". Gõ "help" để xem danh sách lệnh.`;
    }

    setLogs((prev) => [
      ...prev,
      { id: Date.now(), type: 'cmd', text: `nope0612@aurora:~$ ${raw}` },
      { id: Date.now() + 1, type: 'out', text: reply }
    ]);
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    runCommand(input);
    setInput('');
  };

  return (
    <div className="cmd-backdrop" role="dialog" aria-modal="true" aria-label="Developer Terminal" onClick={onClose}>
      <div className="term-modal" onClick={(e) => e.stopPropagation()}>
        <div className="term-head">
          <span className="term-title">
            <Terminal size={16} aria-hidden="true" />
            <span>nope0612@aurora — terminal</span>
          </span>
          <button type="button" className="cmd-close" onClick={onClose} aria-label="Đóng terminal">
            <X size={16} />
          </button>
        </div>

        <div className="term-body" role="log" aria-live="polite">
          {logs.map((line) => (
            <pre key={line.id} className={`term-line term-line--${line.type}`}>
              {line.text}
            </pre>
          ))}
        </div>

        <form className="term-form" onSubmit={onSubmit}>
          <span className="term-prompt" aria-hidden="true">$</span>
          <input
            className="term-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập lệnh (vd: help, games, social)..."
            aria-label="Nhập lệnh terminal"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
