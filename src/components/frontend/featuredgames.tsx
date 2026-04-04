import { robloxGames, codingProjects } from '../data/projects';

// Since game universe IDs aren't set yet, this renders a placeholder
// Once you add universeIds to data/projects.ts it'll auto-load

export default function FeaturedGames() {
  const hasGames = robloxGames.filter((g) => g.universeId > 0).length > 0;

  return (
    <section
      id="games"
      style={{ fontFamily: "'DM Mono', monospace" }}
      className="relative z-10 py-28 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <span className="text-[10px] tracking-widest uppercase text-[#7eb8f7]/50">03</span>
          <div className="h-px w-8 bg-[#7eb8f7]/20" />
          <span className="text-[10px] tracking-widest uppercase text-white/20">Projects</span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Roblox Games column */}
          <div>
            <p className="text-[10px] tracking-widest uppercase text-white/20 mb-4 px-1">Roblox Games</p>
            {!hasGames ? (
              <div
                className="border border-dashed border-[#1e3a5f]/40 bg-[#080c12]/40 p-8 text-center"
              >
                <p className="text-white/15 text-xs leading-6">
                  Add your universe IDs to<br />
                  <span className="text-[#7eb8f7]/30">src/data/projects.ts</span><br />
                  to display your games here.
                </p>
              </div>
            ) : (
              <div className="space-y-px">
                {robloxGames.filter((g) => g.universeId > 0).map((g) => (
                  <div
                    key={g.universeId}
                    className="border border-[#1e3a5f]/40 bg-[#080c12]/60 p-5 hover:border-[#7eb8f7]/20 transition-all"
                  >
                    <h3 className="text-white/80 text-sm mb-1">{g.fallbackName}</h3>
                    <p className="text-white/30 text-xs leading-5">{g.fallbackDescription}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Coding Projects column */}
          <div>
            <p className="text-[10px] tracking-widest uppercase text-white/20 mb-4 px-1">Coding Projects</p>
            <div className="space-y-px">
              {codingProjects.map((p) => (
                <div
                  key={p.name}
                  className="border border-[#1e3a5f]/40 bg-[#080c12]/60 p-5 hover:border-[#7eb8f7]/20 transition-all group"
                  style={{ boxShadow: 'inset 0 1px 0 rgba(126,184,247,0.04)' }}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-white/80 text-sm group-hover:text-white transition-colors">{p.name}</h3>
                    <div className="flex gap-2 shrink-0">
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] tracking-wider text-white/20 hover:text-[#7eb8f7] transition-colors"
                        >
                          GH ↗
                        </a>
                      )}
                      {p.demo && (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] tracking-wider text-white/20 hover:text-[#7eb8f7] transition-colors"
                        >
                          Live ↗
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-white/30 text-xs leading-5 mb-3">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[9px] tracking-widest uppercase border border-[#7eb8f7]/10 text-[#7eb8f7]/40"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}