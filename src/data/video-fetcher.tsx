import { useMutation } from 'react-query';

import pexelsAPI, { PexelsResponse } from 'src/api/pexels';

interface DataProps {
  isLoading: boolean;
  data?: PexelsResponse;
}

interface ActionProps {
  getVideos: (v: GetVideoVars) => void;
}

interface GetVideoVars {
  searchTitle: string;
  videosNumber: number;
}

interface Props {
  children: (data: DataProps, actions: ActionProps) => JSX.Element;
}

const VideoFetcher = ({ children }: Props): JSX.Element => {
  const getVideos = useMutation<PexelsResponse, Error, GetVideoVars>((vars) => {
    const searchQuery = vars.searchTitle
      .trim()
      .split(/,\s*|\s/)
      .join(',');

    return pexelsAPI.getVideos({ query: searchQuery, numberOfVideos: vars.videosNumber });
  });

  return children(
    { data: getVideos.data, isLoading: getVideos.isLoading },
    { getVideos: getVideos.mutate },
  );
};

export default VideoFetcher;
