export interface RobloxUser {
  id: number;
  name: string;
  displayName: string;
  description: string;
  created: string;
  isBanned: boolean;
}

export interface RobloxCollectible {
  userAssetId: number;
  serialNumber: number | null;
  assetId: number;
  name: string;
  recentAveragePrice: number;
  originalPrice: number | null;
  assetStock: number | null;
  buildersClubMembershipType: number;
}

export interface RobloxFriendCount {
  count: number;
}

export interface RobloxGame {
  id: number;
  rootPlaceId: number;
  name: string;
  description: string;
  playing: number;
  visits: number;
  created: string;
  genre: string;
  favoritedCount: number;
  thumbnailUrl?: string;
}