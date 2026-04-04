import { useRoblox } from '../../hooks/useRoblox';
import { ROBLOX_USER_ID, ROBLOX_PROFILE_URL } from '../../components/configs/roblox';

const Skeleton = ({ w = 'w-24' }: { w?: string }) => (
  <span className={`inline-block h-4 ${w} bg-white/5 rounded animate-pulse`} />
);

export default function AboutSection() {
  const { user, avatarUrl, friendCount, followerCount, loading } = useRoblox(ROBLOX_USER_ID);

  const joinYear = user?.created ? new Date(user.created).getFullYear() : null;
  const joinFull = user?.created
    ? new Date(user.created).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  return (
    <section
      id="about"
      style={{ fontFamily: "'DM Mono', monospace" }}
      className="relative z-10 py-28 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-10">
          <span className="text-[10px] tracking-widest uppercase text-[#7eb8f7]/50">01</span>
          <div className="h-px w-8 bg-[#7eb8f7]/20" />
          <span className="text-[10px] tracking-widest uppercase text-white/20">About</span>
        </div>

        <div className="grid lg:grid-cols-5 gap-4">
          {/* Profile card */}
          <div
            className="lg:col-span-2 rounded-none border border-[#1e3a5f]/50 bg-[#080c12]/60 backdrop-blur-sm p-6 flex flex-col items-center text-center"
            style={{ boxShadow: 'inset 0 1px 0 rgba(126,184,247,0.05)' }}
          >
            <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border border-[#7eb8f7]/15">
              {loading || !avatarUrl
                ? <div className="w-full h-full bg-[#1e3a5f]/30 animate-pulse" />
                : <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
              }
            </div>
            <h3 className="text-white text-base mb-0.5">
              {loading ? <Skeleton w="w-28" /> : (user?.displayName ?? '—')}
            </h3>
            <p className="text-[#7eb8f7]/40 text-[10px] tracking-widest uppercase mb-5">
              {loading ? <Skeleton w="w-20" /> : (user?.name ? `@${user.name}` : '—')}
            </p>

            {/* Stats row */}
            <div className="w-full grid grid-cols-2 gap-px bg-[#1e3a5f]/20 mb-5">
              {[
                { label: 'Friends', val: friendCount },
                { label: 'Followers', val: followerCount },
              ].map(({ label, val }) => (
                <div key={label} className="bg-[#080c12] py-3 px-2 text-center">
                  <p className="text-white text-lg">
                    {loading ? '···' : val.toLocaleString()}
                  </p>
                  <p className="text-white/25 text-[9px] tracking-widest uppercase mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            <div className="text-[10px] text-white/20 tracking-wider mb-1">Member since</div>
            <div className="text-[#7eb8f7]/60 text-xs">
              {loading ? <Skeleton w="w-32" /> : joinFull}
            </div>

            <a
              href={ROBLOX_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 w-full text-center py-2 text-[10px] tracking-widest uppercase border border-[#7eb8f7]/20 text-[#7eb8f7]/60 hover:border-[#7eb8f7]/50 hover:text-[#7eb8f7] transition-all"
            >
              View on Roblox ↗
            </a>
          </div>

          {/* Right column */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Bio card */}
            <div
              className="border border-[#1e3a5f]/50 bg-[#080c12]/60 backdrop-blur-sm p-6"
              style={{ boxShadow: 'inset 0 1px 0 rgba(126,184,247,0.05)' }}
            >
              <p className="text-[10px] tracking-widest uppercase text-white/20 mb-4">Bio</p>
              <p className="text-white/50 text-sm leading-7">
                {/* ← Edit your bio here */}
                I'm a Roblox developer and passionate limited collector. Whether I'm building
                gameplay systems, hunting rare items, or stacking RAP — the grind never stops.
              </p>
              <p className="text-white/25 text-sm leading-7 mt-3">
                Outside Roblox, I build personal projects and explore new tech. This portfolio
                is a live snapshot of my account, limiteds, and work.
              </p>
            </div>

            {/* Quick info grid */}
            <div className="grid grid-cols-2 gap-px bg-[#1e3a5f]/20">
              {[
                { label: 'User ID', val: ROBLOX_USER_ID.toLocaleString() },
                { label: 'Joined Year', val: loading ? '···' : (joinYear?.toString() ?? '—') },
                { label: 'Platform', val: 'Roblox' },
                { label: 'Status', val: 'Active' },
              ].map(({ label, val }) => (
                <div key={label} className="bg-[#080c12]/80 px-5 py-4">
                  <p className="text-[9px] tracking-widest uppercase text-white/20 mb-1">{label}</p>
                  <p className="text-white/70 text-sm">{val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}