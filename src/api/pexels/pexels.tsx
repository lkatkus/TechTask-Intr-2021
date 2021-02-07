import { PexelsResponse } from './pexels.interfaces';

const SEARCH_URL = 'https://api.pexels.com/videos/search?';
const API_KEY = process.env.REACT_APP_PEXELS_API_KEY || '';

interface SearchParams {
  query: string;
  numberOfVideos: number;
  orientation?: 'landscape' | 'portrait' | 'square';
}

const getVideos = async (params: SearchParams): Promise<PexelsResponse> => {
  const requestURL =
    SEARCH_URL +
    new URLSearchParams({
      query: params.query,
      per_page: String(params.numberOfVideos),
      orientation: 'landscape',
    });

  const response = await fetch(requestURL, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error('Something went wrong with your request.');
  }

  return response.json();
};

export default { getVideos };
