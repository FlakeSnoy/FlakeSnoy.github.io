import { useRoblox } from '../../hooks/useRoblox';
import { ROBLOX_USER_ID } from '../../components/configs/roblox';
import type { RobloxCollectible } from '../../types/roblox';

const Shimmer = ({ h = 'h-4', w = 'w-full' }: { h?: string; w?: string }) => (
  <div className={`${h} ${w} bg-white/5 rounded animate-pulse`} />
);

function RapBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="h-px w-full bg-white/5 mt-2">
      <div
        className="h-full bg-[#7eb8f7]/40 transition-all duration-700"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function ItemRow({ item, rank, max }: { item: RobloxCollectible; rank: number; max: number }) {
  return (
    <div className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#7eb8f7]/3 transition-colors group border-b border-[#1e3a5f]/20 last:border-0">
      <span className="text-[10px] text-white/15 w-5 text-right shrink-0">{rank}</span>
      <div className="flex-1 min-w-0">
        <p className="text-white/70 text-xs truncate group-hover:text-white transition-colors">{item.name}</p>
        {item.serialNumber && (
          <p className="text-[#7eb8f7]/30 text-[9px] tracking-wider">#{item.serialNumber}</p>
        )}
        <RapBar value={item.recentAveragePrice} max={max} />
      </div>
      <div className="text-right shrink-0">
        <p className="text-white/80 text-xs font-medium tabular-nums">
          {item.recentAveragePrice.toLocaleString()}
        </p>
        <p className="text-white/20 text-[9px] tracking-wider">RAP</p>
      </div>
    </div>
  );
}

export default function StatSection() {
  const { collectibles, totalRap, loading, error } = useRoblox(ROBLOX_USER_ID);

  const sorted = [...collectibles].sort((a, b) => b.recentAveragePrice - a.recentAveragePrice);
  const top = sorted.slice(0, 10);
  const maxRap = top[0]?.recentAveragePrice ?? 1;
  const avgRap = collectibles.length ? Math.round(totalRap / collectibles.length) : 0;

  const summaryCards = [
    { label: 'Total RAP', value: loading ? null : totalRap, suffix: 'R$', accent: true },
    { label: 'Limiteds', value: loading ? null : collectibles.length, suffix: 'items' },
    { label: 'Average RAP', value: loading ? null : avgRap, suffix: 'R$' },
    { label: 'Top Item', value: loading ? null : maxRap, suffix: 'R$' },
  ];

  return (
    <section
      id="stats"
      style={{ fontFamily: "'DM Mono', monospace" }}
      className="relative z-10 py-28 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <span className="text-[10px] tracking-widest uppercase text-[#7eb8f7]/50">02</span>
          <div className="h-px w-8 bg-[#7eb8f7]/20" />
          <span className="text-[10px] tracking-widest uppercase text-white/20">Account Stats</span>
        </div>

        {error && (
          <div className="border border-red-500/20 bg-red-500/5 px-5 py-3 text-red-400/60 text-xs mb-6">
            ⚠ {error}
          </div>
        )}

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1e3a5f]/20 mb-4">
          {summaryCards.map(({ label, value, suffix, accent }) => (
            <div
              key={label}
              className="bg-[#080c12]/80 p-6"
              style={accent ? { boxShadow: 'inset 0 1px 0 rgba(126,184,247,0.1)' } : {}}
            >
              <p className="text-[9px] tracking-widest uppercase text-white/20 mb-2">{label}</p>
              {loading ? (
                <Shimmer h="h-8" w="w-24" />
              ) : (
                <div className="flex items-end gap-1.5">
                  <span className={`text-2xl tabular-nums ${accent ? 'text-[#7eb8f7]' : 'text-white/80'}`}>
                    {value?.toLocaleString() ?? '—'}
                  </span>
                  <span className="text-white/20 text-[10px] pb-1">{suffix}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Limiteds table */}
        <div
          className="border border-[#1e3a5f]/50 bg-[#080c12]/60 backdrop-blur-sm"
          style={{ boxShadow: 'inset 0 1px 0 rgba(126,184,247,0.05)' }}
        >
          {/* Table header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1e3a5f]/30">
            <p className="text-[10px] tracking-widest uppercase text-white/25">
              Top Limiteds by RAP
            </p>
            <p className="text-[10px] text-white/15">
              {loading ? '···' : `${collectibles.length} total`}
            </p>
          </div>

          {loading ? (
            <div className="p-5 space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                  <Shimmer w="w-5" />
                  <Shimmer w="w-full" />
                  <Shimmer w="w-16" />
                </div>
              ))}
            </div>
          ) : top.length === 0 ? (
            <div className="px-5 py-12 text-center text-white/15 text-xs">
              No public limiteds found. Make sure your inventory is set to public.
            </div>
          ) : (
            <div>
              {top.map((item, i) => (
                <ItemRow key={item.userAssetId} item={item} rank={i + 1} max={maxRap} />
              ))}
            </div>
          )}

          {/* Footer */}
          {!loading && collectibles.length > 10 && (
            <div className="px-5 py-3 border-t border-[#1e3a5f]/20 text-[10px] text-white/15 text-center">
              Showing top 10 of {collectibles.length} items
            </div>
          )}
        </div>
      </div>
    </section>
  );
}