import { useMutation } from 'react-query';

import pexelsAPI from 'src/api/pexels';

interface Props {
  children: (data: any, actions: any) => JSX.Element;
}

const VideoFetcher = ({ children }: Props): JSX.Element => {
  const getVideos = useMutation((vars: any) => {
    const searchQuery = vars.searchTitle.trim().split(/,\s*|\s/);

    return pexelsAPI.getVideos({ query: searchQuery, numberOfVideos: 1 });
  });

  return children(
    { data: getVideos.data || {}, isLoading: getVideos.isLoading },
    { getVideos: getVideos.mutate },
  );
};

export default VideoFetcher;
