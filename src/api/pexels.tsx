interface User {
  id: number;
  name: string;
  url: string;
}

interface VideoFile {
  id: number;
  quality: string;
  file_type: string;
  width?: number;
  height?: number;
  link: string;
}

interface VideoPicture {
  id: number;
  picture: string;
  nr: number;
}

export interface Video {
  id: number;
  width: number;
  height: number;
  url: string;
  image: string;
  duration: number;
  user: User;
  video_files: VideoFile[];
  video_pictures: VideoPicture[];
}

export interface PexelsResponse {
  page: number;
  per_page: number;
  total_results: number;
  url: string;
  videos: Video[];
}

const SEARCH_URL = 'https://api.pexels.com/videos/search';
const API_KEY = process.env.REACT_APP_PEXELS_API_KEY || '';

interface SearchParams {
  query: string;
  numberOfVideos: number;
  orientation?: 'landscape' | 'portrait' | 'square';
}

const getVideos = async (params: SearchParams): Promise<PexelsResponse> => {
  const requestURL = SEARCH_URL + `?query=${params.query}`;

  const response = await fetch(requestURL, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: API_KEY,
    },
  });

  return response.json();
};

export default { getVideos };
