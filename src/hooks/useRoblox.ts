import { useState, useEffect } from 'react';
import type { RobloxUser, RobloxCollectible } from '../types/roblox';

const P = (url: string) =>
  `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

export interface RobloxData {
  user: RobloxUser | null;
  avatarUrl: string | null;
  collectibles: RobloxCollectible[];
  totalRap: number;
  friendCount: number;
  followerCount: number;
  loading: boolean;
  error: string | null;
}

export function useRoblox(userId: number): RobloxData {
  const [user, setUser] = useState<RobloxUser | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [collectibles, setCollectibles] = useState<RobloxCollectible[]>([]);
  const [totalRap, setTotalRap] = useState(0);
  const [friendCount, setFriendCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;

    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const [userRes, avatarRes, friendRes, followerRes, colRes] = await Promise.all([
          fetch(P(`https://users.roblox.com/v1/users/${userId}`)),
          fetch(P(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=420x420&format=Png&isCircular=false`)),
          fetch(P(`https://friends.roblox.com/v1/users/${userId}/friends/count`)),
          fetch(P(`https://friends.roblox.com/v1/users/${userId}/followers/count`)),
          fetch(P(`https://inventory.roblox.com/v1/users/${userId}/assets/collectibles?sortOrder=Asc&limit=100`)),
        ]);

        const [userData, avatarData, friendData, followerData, colData] = await Promise.all([
          userRes.json(),
          avatarRes.json(),
          friendRes.json(),
          followerRes.json(),
          colRes.json(),
        ]);

        if (cancelled) return;

        setUser(userData);
        setAvatarUrl(avatarData?.data?.[0]?.imageUrl ?? null);
        setFriendCount(friendData?.count ?? 0);
        setFollowerCount(followerData?.count ?? 0);

        const items: RobloxCollectible[] = colData?.data ?? [];
        setCollectibles(items);
        setTotalRap(items.reduce((s, i) => s + (i.recentAveragePrice ?? 0), 0));
      } catch (e) {
        if (!cancelled) setError('Could not load Roblox data. Check inventory privacy settings.');
        console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => { cancelled = true; };
  }, [userId]);

  return { user, avatarUrl, collectibles, totalRap, friendCount, followerCount, loading, error };
}