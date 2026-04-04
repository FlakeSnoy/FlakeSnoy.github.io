import { useRoblox } from '../../hooks/useRoblox';
import { ROBLOX_USER_ID } from '../../components/configs/roblox';

export default function Hero() {
  const { user, avatarUrl, loading } = useRoblox(ROBLOX_USER_ID);

  return (
    <section
      id="hero"
      className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6"
    >
      {/* Avatar */}
      <div className="mb-8 relative">
        <div className="w-32 h-32 rounded-full overflow-hidden border border-white/10 shadow-2xl mx-auto">
          {loading || !avatarUrl ? (
            <div className="w-full h-full bg-white/5 animate-pulse" />
          ) : (
            <img src={avatarUrl} alt="Roblox avatar" className="w-full h-full object-cover" />
          )}
        </div>
        {/* Subtle glow ring */}
        <div className="absolute inset-0 rounded-full border border-white/5 scale-110 blur-sm" />
      </div>

      {/* Name */}
      <h1 className="font-mono text-4xl md:text-6xl text-white tracking-tight mb-3">
        {loading ? (
          <span className="opacity-30">Loading...</span>
        ) : (
          user?.displayName ?? user?.name ?? 'FlakeSnoy'
        )}
      </h1>

      {/* Username */}
      {user?.name && (
        <p className="font-mono text-xs text-white/30 tracking-widest uppercase mb-6">
          @{user.name}
        </p>
      )}

      {/* Tagline */}
      <p className="text-white/50 text-sm md:text-base max-w-md leading-relaxed mb-10 font-light">
        Roblox developer & collector. Building experiences, stacking limiteds.
      </p>

      {/* CTAs */}
      <div className="flex gap-4 flex-wrap justify-center">
        <a
          href="#stats"
          className="px-6 py-2.5 bg-white text-black text-xs font-mono tracking-widest uppercase hover:bg-white/90 transition-colors"
        >
          View Stats
        </a>
        <a
          href="#games"
          className="px-6 py-2.5 border border-white/20 text-white/70 text-xs font-mono tracking-widest uppercase hover:border-white/50 hover:text-white transition-all"
        >
          My Games
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-white text-xs font-mono tracking-widest">scroll</span>
        <div className="w-px h-8 bg-white/40" />
      </div>
    </section>
  );
}