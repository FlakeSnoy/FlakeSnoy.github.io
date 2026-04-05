/* eslint-disable react-hooks/static-components */
import { useState, useEffect } from 'react';

/* Types*/
interface SubLink {
  label: string;
  href: string;
}
interface NavItem {
  label: string;
  href?: string;
  children?: SubLink[];
}

/* Nav structure  */
const NAV: NavItem[] = [
  {
    label: 'About Me',
    children: [
      { label: 'Bio',        href: '#bio' },
      { label: 'Skills',     href: '#skills' },
      { label: 'Contact',    href: '#contact' },
    ],
  },
  {
    label: 'Roblox',
    children: [
      { label: 'Profile',    href: '#about' },
      { label: 'Stats',      href: '#stats' },
      { label: 'Limiteds',   href: '#limiteds' },
      { label: 'Games',      href: '#games' },
    ],
  },
  { label: 'Projects', href: '#projects' },
];

/* Snowflake icon */
const SnowflakeSVG = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
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

/* Chevron  */
const Chevron = ({ open }: { open: boolean }) => (
  <svg
    width="10" height="10" viewBox="0 0 10 10" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
    className={`transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
  >
    <polyline points="3,2 7,5 3,8" />
  </svg>
);

/* Smooth scroll helper */
const scrollTo = (href: string) => {
  const id = href.replace('#', '');
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/* Main component*/
export default function Sidebar() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'About Me': false,
    'Roblox':   false,
  });
  const [activeHref, setActiveHref] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Active section tracking */
  useEffect(() => {
    const allHrefs = NAV.flatMap((n) =>
      n.children ? n.children.map((c) => c.href) : [n.href ?? '']
    ).filter(Boolean);

    const handler = () => {
      for (const href of [...allHrefs].reverse()) {
        const el = document.getElementById(href.replace('#', ''));
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActiveHref(href);
          break;
        }
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  /* Auto-open the section that contains the active link */
  useEffect(() => {
    NAV.forEach((n) => {
      if (n.children?.some((c) => c.href === activeHref)) {
        setOpenSections((prev) => ({ ...prev, [n.label]: true }));
      }
    });
  }, [activeHref]);

  const toggleSection = (label: string) =>
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));

  /* ── Sidebar content (shared between desktop & mobile) ── */
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <a
        href="#hero"
        onClick={(e) => { e.preventDefault(); scrollTo('#hero'); setMobileOpen(false); }}
        className="flex items-center gap-2.5 px-5 py-4 border-b border-[#1e3a5f]/40
                   text-[#7eb8f7]/60 hover:text-[#7eb8f7] transition-colors group"
      >
        <span className="group-hover:rotate-12 transition-transform duration-300">
          <SnowflakeSVG size={15} />
        </span>
        <span className="text-[11px] tracking-widest uppercase text-white/50 group-hover:text-white/80 transition-colors">
          FlakeSnoy
        </span>
      </a>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {NAV.map((item) => {
          const hasChildren = !!item.children;
          const isOpen      = hasChildren && openSections[item.label];
          const isActive    = !hasChildren && item.href === activeHref;

          return (
            <div key={item.label}>
              {/* Top-level row */}
              {hasChildren ? (
                <button
                  onClick={() => toggleSection(item.label)}
                  className={`w-full flex items-center justify-between px-5 py-2.5 text-left
                              text-[11px] tracking-widest uppercase transition-all duration-150
                              ${isOpen ? 'text-white/70' : 'text-white/25 hover:text-white/50'}`}
                >
                  {item.label}
                  <span className={`transition-colors ${isOpen ? 'text-[#7eb8f7]/60' : 'text-white/15'}`}>
                    <Chevron open={isOpen} />
                  </span>
                </button>
              ) : (
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.href!);
                    setMobileOpen(false);
                  }}
                  className={`flex items-center gap-3 px-5 py-2.5 text-[11px] tracking-widest
                              uppercase transition-all duration-150 relative
                              ${isActive
                                ? 'text-[#7eb8f7] bg-[#7eb8f7]/5'
                                : 'text-white/25 hover:text-white/50 hover:bg-white/2'}`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-4 bg-[#7eb8f7]" />
                  )}
                  {item.label}
                </a>
              )}

              {/* Sub-links — animated collapse */}
              <div
                className="overflow-hidden transition-all duration-250 ease-in-out"
                style={{ maxHeight: isOpen ? `${(item.children?.length ?? 0) * 44}px` : '0px' }}
              >
                {item.children?.map((child) => {
                  const childActive = activeHref === child.href;
                  return (
                    <a
                      key={child.href}
                      href={child.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(child.href);
                        setMobileOpen(false);
                      }}
                      className={`flex items-center gap-2 pl-8 pr-5 py-2.5 text-[10px]
                                  tracking-widest uppercase transition-all duration-150 relative
                                  ${childActive
                                    ? 'text-[#7eb8f7] bg-[#7eb8f7]/5'
                                    : 'text-white/20 hover:text-white/50 hover:bg-white/2'}`}
                    >
                      {/* Indent line */}
                      <span className="absolute left-5 top-0 bottom-0 w-px bg-[#1e3a5f]/50" />
                      {childActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-3 bg-[#7eb8f7]" />
                      )}
                      <span className={`w-1 h-1 rounded-full shrink-0 ${childActive ? 'bg-[#7eb8f7]' : 'bg-white/15'}`} />
                      {child.label}
                    </a>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-[#1e3a5f]/30">
        <p className="text-[9px] tracking-widest uppercase text-white/10">
          © {new Date().getFullYear()} FlakeSnoy
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        style={{ fontFamily: "'DM Mono', monospace" }}
        className="hidden md:flex fixed left-0 top-0 h-screen w-48 z-50 flex-col
                   border-r border-[#1e3a5f]/40 bg-[#060a10]/90 backdrop-blur-xl"
      >
        // eslint-disable-next-line react-hooks/static-components
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div
        style={{ fontFamily: "'DM Mono', monospace" }}
        className="md:hidden fixed top-0 left-0 right-0 z-50 h-11
                   flex items-center justify-between px-4
                   bg-[#060a10]/95 backdrop-blur-xl border-b border-[#1e3a5f]/40"
      >
        <a href="#hero" className="flex items-center gap-2 text-[#7eb8f7]/60">
          <SnowflakeSVG size={13} />
          <span className="text-[10px] tracking-widest uppercase text-white/40">FlakeSnoy</span>
        </a>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 p-1.5 text-white/30 hover:text-white/60 transition-colors"
          aria-label="Toggle menu"
        >
          <span className={`block w-4 h-px bg-current transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-4 h-px bg-current transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-4 h-px bg-current transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        style={{ fontFamily: "'DM Mono', monospace" }}
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300
                    ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        {/* Drawer panel */}
        <div
          className={`absolute top-11 left-0 bottom-0 w-56 bg-[#060a10]/98 border-r border-[#1e3a5f]/40
                      transition-transform duration-300
                      ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <SidebarContent />
        </div>
      </div>
    </>
  );
}