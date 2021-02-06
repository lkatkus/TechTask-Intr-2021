import { Video } from 'src/api/pexels';

export interface State {
  isLoading?: boolean;
  data?: Video[] | null;
  error?: Error | null;
}

export interface Payload {
  videos?: Video[] | null;
  error?: Error | null;
}

export interface GetVideoParams {
  searchTitle: string;
  videosNumber: number;
}
