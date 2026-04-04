import { ROBLOX_USER_ID } from '../../components/configs/roblox';

const SOCIALS = [
  { label: 'Roblox', href: `https://www.roblox.com/users/${ROBLOX_USER_ID}/profile` },
  { label: 'GitHub', href: 'https://github.com/FlakeSnoy' },
  // { label: 'Discord', href: 'https://discord.com/...' },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      style={{ fontFamily: "'DM Mono', monospace" }}
      className="relative z-10 border-t border-[#1e3a5f]/30 py-12 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5 text-white/20">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/>
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/><line x1="19.07" y1="4.93" x2="4.93" y2="19.07"/>
            </svg>
            <span className="text-[10px] tracking-widest uppercase">
              FlakeSnoy · {new Date().getFullYear()}
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-widest uppercase text-white/20 hover:text-[#7eb8f7] transition-colors"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}