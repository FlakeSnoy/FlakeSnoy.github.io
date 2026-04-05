import type { ReactNode } from 'react';
import Sidebar from './sidebar';
import TopBar from './topbar';
import ParticleBackground from '../particlebackground';

interface DShellProps {
  children: ReactNode;
}

export default function DShell({ children }: DShellProps) {
  return (
    <div
      className="min-h-screen bg-[#060a10] text-white overflow-x-hidden"
      style={{ fontFamily: "'DM Mono', monospace" }}
    >
      <ParticleBackground />
      <Sidebar />
      <TopBar />

      <div className="relative z-10 md:ml-48 pt-11">
        {children}
      </div>
    </div>
  );
}