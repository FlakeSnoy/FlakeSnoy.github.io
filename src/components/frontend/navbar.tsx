import { useState, useEffect } from 'react';

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Stats', href: '#stats' },
  { label: 'Games', href: '#games' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const SnowflakeSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
    <line x1="12" y1="6" x2="9" y2="3" />
    <line x1="12" y1="6" x2="15" y2="3" />
    <line x1="12" y1="18" x2="9" y2="21" />
    <line x1="12" y1="18" x2="15" y2="21" />
    <line x1="6" y1="12" x2="3" y2="9" />
    <line x1="6" y1="12" x2="3" y2="15" />
    <line x1="18" y1="12" x2="21" y2="9" />
    <line x1="18" y1="12" x2="21" y2="15" />
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav
      style={{ fontFamily: "'DM Mono', monospace" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#080c12]/80 backdrop-blur-xl border-b border-[#1e3a5f]/40'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5 text-[#7eb8f7] hover:text-white transition-colors group">
          <span className="opacity-70 group-hover:opacity-100 transition-opacity">
            <SnowflakeSVG />
          </span>
          <span className="text-sm tracking-widest uppercase text-white/80 group-hover:text-white transition-colors">
            FlakeSnoy
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className="px-4 py-1.5 text-[11px] tracking-widest uppercase text-white/40 hover:text-white hover:bg-white/5 rounded transition-all duration-200"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 text-white/50"
          onClick={() => setOpen(!open)}
        >
          <span className={`block w-5 h-px bg-current transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-px bg-current transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-current transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-64' : 'max-h-0'}`}>
        <div className="bg-[#080c12]/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex flex-col gap-3">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="text-[11px] tracking-widest uppercase text-white/40 hover:text-white transition-colors"
            >
              {n.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}