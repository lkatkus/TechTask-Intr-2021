import { Video } from 'src/api/pexels';

export interface State {
  isLoading?: boolean;
  data?: Video[];
  error?: string;
}

export interface Payload {
  videos?: Video[];
  error?: string;
}

export interface GetVideoParams {
  searchTitle: string;
  videosNumber: number;
}
