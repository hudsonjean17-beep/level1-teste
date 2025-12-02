import { AnilistResponse, SingleAnilistResponse, Anime } from '../types';

const ANILIST_API_URL = 'https://graphql.anilist.co';

const TRENDING_QUERY = `
query ($page: Int, $perPage: Int) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (sort: TRENDING_DESC, type: ANIME, isAdult: false) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        extraLarge
        large
        medium
        color
      }
      bannerImage
      episodes
      genres
      averageScore
      status
      format
    }
  }
}
`;

const SEARCH_QUERY = `
query ($search: String, $page: Int, $perPage: Int) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (search: $search, sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        extraLarge
        large
        medium
        color
      }
      episodes
      averageScore
      format
    }
  }
}
`;

const DETAILS_QUERY = `
query ($id: Int) {
  Media (id: $id, type: ANIME) {
    id
    title {
      romaji
      english
      native
    }
    coverImage {
      extraLarge
      large
      medium
      color
    }
    bannerImage
    description
    episodes
    genres
    averageScore
    status
    seasonYear
    format
  }
}
`;

export const fetchTrendingAnime = async (page = 1, perPage = 20): Promise<Anime[]> => {
  try {
    const response = await fetch(ANILIST_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: TRENDING_QUERY,
        variables: { page, perPage }
      })
    });

    const json = await response.json() as AnilistResponse;
    if (!response.ok) throw new Error('Falha ao buscar animes');
    return json.data.Page.media;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const searchAnime = async (search: string, page = 1, perPage = 20): Promise<Anime[]> => {
  try {
    const response = await fetch(ANILIST_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: SEARCH_QUERY,
        variables: { search, page, perPage }
      })
    });

    const json = await response.json() as AnilistResponse;
    return json.data.Page.media;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchAnimeDetails = async (id: number): Promise<Anime | null> => {
  try {
    const response = await fetch(ANILIST_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: DETAILS_QUERY,
        variables: { id }
      })
    });

    const json = await response.json() as SingleAnilistResponse;
    return json.data.Media;
  } catch (error) {
    console.error(error);
    return null;
  }
};
