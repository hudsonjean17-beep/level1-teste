export interface AnimeTitle {
  romaji: string;
  english: string | null;
  native: string;
}

export interface AnimeCoverImage {
  extraLarge: string;
  large: string;
  medium: string;
  color: string;
}

export interface Anime {
  id: number;
  title: AnimeTitle;
  coverImage: AnimeCoverImage;
  bannerImage: string | null;
  description: string;
  episodes: number | null;
  genres: string[];
  averageScore: number;
  status: string;
  seasonYear: number;
  format: string;
}

export interface PageInfo {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
}

export interface AnilistResponse {
  data: {
    Page: {
      pageInfo: PageInfo;
      media: Anime[];
    };
  };
}

export interface SingleAnilistResponse {
  data: {
    Media: Anime;
  };
}
