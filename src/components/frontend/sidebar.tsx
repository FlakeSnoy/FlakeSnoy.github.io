import { useState, useEffect } from 'react';

const NAV = [
  { label: 'About',    href: '#about' },
  { label: 'Stats',    href: '#stats' },
  { label: 'Games',    href: '#games' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
];

const SnowflakeSVG = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="12" y1="2"    x2="12" y2="22" />
    <line x1="2"  y1="12"   x2="22" y2="12" />
    <line x1="4.93"  y1="4.93"  x2="19.07" y2="19.07" />
    <line x1="19.07" y1="4.93"  x2="4.93"  y2="19.07" />
    <line x1="12" y1="6"  x2="9"  y2="3"  />
    <line x1="12" y1="6"  x2="15" y2="3"  />
    <line x1="12" y1="18" x2="9"  y2="21" />
    <line x1="12" y1="18" x2="15" y2="21" />
    <line x1="6"  y1="12" x2="3"  y2="9"  />
    <line x1="6"  y1="12" x2="3"  y2="15" />
    <line x1="18" y1="12" x2="21" y2="9"  />
    <line x1="18" y1="12" x2="21" y2="15" />
  </svg>
);

export default function Sidebar() {
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);

  // Highlight active section on scroll
  useEffect(() => {
    const handler = () => {
      const sections = NAV.map((n) => n.href.replace('#', ''));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        style={{ fontFamily: "'DM Mono', monospace" }}
        className="hidden md:flex fixed left-0 top-0 h-screen w-52 z-50 flex-col
                   border-r border-[#1e3a5f]/40 bg-[#060a10]/80 backdrop-blur-xl"
      >
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 px-6 py-5 border-b border-[#1e3a5f]/40
                     text-[#7eb8f7]/70 hover:text-[#7eb8f7] transition-colors group"
        >
          <span className="group-hover:rotate-12 transition-transform duration-300">
            <SnowflakeSVG />
          </span>
          <span className="text-[11px] tracking-widest uppercase text-white/60 group-hover:text-white transition-colors">
            FlakeSnoy
          </span>
        </a>

        {/* Nav links */}
        <nav className="flex flex-col gap-px px-3 py-4 flex-1">
          {NAV.map((n) => {
            const id = n.href.replace('#', '');
            const isActive = active === id;
            return (
              <a
                key={n.href}
                href={n.href}
                onClick={(e) => { e.preventDefault(); handleNav(n.href); }}
                className={`flex items-center gap-3 px-3 py-2.5 text-[11px] tracking-widest uppercase
                            transition-all duration-200 group relative
                            ${isActive
                              ? 'text-[#7eb8f7] bg-[#7eb8f7]/8'
                              : 'text-white/25 hover:text-white/70 hover:bg-white/3'
                            }`}
              >
                {/* Active indicator */}
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-px h-4 bg-[#7eb8f7]
                              transition-opacity duration-200
                              ${isActive ? 'opacity-100' : 'opacity-0'}`}
                />
                {n.label}
              </a>
            );
          })}
        </nav>

        {/* Bottom — year */}
        <div className="px-6 py-4 border-t border-[#1e3a5f]/30">
          <p className="text-[9px] tracking-widest uppercase text-white/10">
            © {new Date().getFullYear()}
          </p>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div
        style={{ fontFamily: "'DM Mono', monospace" }}
        className="md:hidden fixed top-0 left-0 right-0 z-50 h-12
                   flex items-center justify-between px-5
                   bg-[#060a10]/90 backdrop-blur-xl border-b border-[#1e3a5f]/40"
      >
        <a href="#hero" className="flex items-center gap-2 text-[#7eb8f7]/70">
          <SnowflakeSVG size={14} />
          <span className="text-[10px] tracking-widest uppercase text-white/50">FlakeSnoy</span>
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 p-1.5 text-white/40 hover:text-white/70 transition-colors"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-current transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-px bg-current transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-current transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden fixed top-12 left-0 right-0 z-40 overflow-hidden transition-all duration-300
                    bg-[#060a10]/95 backdrop-blur-xl border-b border-[#1e3a5f]/40
                    ${open ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="flex flex-col gap-px px-3 py-3">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={(e) => { e.preventDefault(); handleNav(n.href); }}
              className="px-3 py-2.5 text-[11px] tracking-widest uppercase text-white/30
                         hover:text-white hover:bg-white/3 transition-all"
            >
              {n.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}