export interface MaimaiData {
  playerName: string;
  playCount: number;
  songs: { title: string; difficulty: string; achievement: number; breakRatio: number }[];
}
