import { useMutation } from 'react-query';

import pexelsAPI from 'src/api/pexels';

interface Props {
  children: (data: any, actions: any) => JSX.Element;
}

const VideoFetcher = ({ children }: Props): JSX.Element => {
  const getVideos = useMutation((vars: any) =>
    pexelsAPI.getVideos({ query: vars.searchTitle, numberOfVideos: 1 }),
  );

  return children(
    { data: getVideos.data || {}, isLoading: getVideos.isLoading },
    { getVideos: getVideos.mutate },
  );
};

export default VideoFetcher;
