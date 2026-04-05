import { useState, useEffect } from 'react';
import { useRoblox } from '../../hooks/useRoblox';
import { ROBLOX_USER_ID } from '../configs/roblox';

function Clock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="text-white/20 text-[10px] tracking-widest tabular-nums">
      {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
    </span>
  );
}

const SECTIONS: Record<string, string> = {
  hero:     'Home',
  bio:      'About Me / Bio',
  skills:   'About Me / Skills',
  contact:  'About Me / Contact',
  about:    'Roblox / Profile',
  stats:    'Roblox / Stats',
  limiteds: 'Roblox / Limiteds',
  games:    'Roblox / Games',
  projects: 'Projects',
};

function useBreadcrumb() {
  const [crumb, setCrumb] = useState('Home');
  useEffect(() => {
    const ids = Object.keys(SECTIONS);
    const handler = () => {
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setCrumb(SECTIONS[id]);
          return;
        }
      }
      setCrumb('Home');
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return crumb;
}

function StatusDot({ loading }: { loading: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-1.5 h-1.5 rounded-full ${loading ? 'bg-yellow-400/60 animate-pulse' : 'bg-emerald-400/70'}`} />
      <span className="text-[10px] tracking-widest uppercase text-white/20">
        {loading ? 'Loading' : 'Live'}
      </span>
    </div>
  );
}

export default function TopBar() {
  const crumb = useBreadcrumb();
  const { avatarUrl, user, loading } = useRoblox(ROBLOX_USER_ID);

  return (
    <header
      style={{ fontFamily: "'DM Mono', monospace" }}
      className="fixed top-0 left-48 right-0 z-40 h-11
                 hidden md:flex items-center justify-between px-5
                 bg-[#060a10]/80 backdrop-blur-xl border-b border-[#1e3a5f]/40"
    >
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-white/15 text-[10px]">❄</span>
        <nav className="flex items-center gap-1 text-[10px] tracking-widest uppercase truncate">
          {crumb.split(' / ').map((part, i, arr) => (
            <span key={i} className="flex items-center gap-1">
              <span className={i === arr.length - 1 ? 'text-white/50' : 'text-white/20'}>
                {part}
              </span>
              {i < arr.length - 1 && <span className="text-white/10">/</span>}
            </span>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-5 shrink-0">
        <StatusDot loading={loading} />
        <Clock />
        <div className="w-px h-4 bg-[#1e3a5f]/60" />
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full overflow-hidden border border-[#7eb8f7]/20 shrink-0">
            {avatarUrl
              ? <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
              : <div className="w-full h-full bg-[#1e3a5f]/40 animate-pulse" />
            }
          </div>
          <span className="text-[10px] tracking-widest text-white/30 uppercase hidden lg:block">
            {user?.name ?? '···'}
          </span>
        </div>
      </div>
    </header>
  );
}