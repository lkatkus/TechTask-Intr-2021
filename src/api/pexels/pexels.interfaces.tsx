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
