import React from 'react';
import { useDispatch } from 'react-redux';

import { Grid, VideoPlayer, Video, VideoPlayerConfig } from 'src/components';
import { PageContainer } from 'src/containers';
import { useSelector } from 'src/redux';
import { actions as VideosActions } from 'src/redux/videos';

import { SearchForm } from './search-form';

const DEFAULT_CONFIG = {
  videosNumber: 10,
  playDuration: 20,
};

const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, data: videos, error } = useSelector((state) => state.videos);
  const [playbackConfig, setPlaybackConfig] = React.useState<VideoPlayerConfig>(DEFAULT_CONFIG);

  React.useEffect(() => {
    if (videos && videos.length > 0) {
      if (videos.length < playbackConfig.videosNumber) {
        setPlaybackConfig({
          ...playbackConfig,
          videosNumber: videos.length,
        });
      }
    }
  }, [videos]);

  return (
    <PageContainer title="Video App">
      <Grid.Container>
        <Grid.Row>
          <Grid.Col size={4} p={20} background="lightGrey">
            <SearchForm
              playbackConfig={playbackConfig}
              handleNewSearch={(values) => {
                setPlaybackConfig({
                  videosNumber: values.videosNumber,
                  playDuration: values.playDuration,
                });

                dispatch(VideosActions.getVideos(values));
              }}
              handleNewConfig={(values) => {
                setPlaybackConfig({
                  videosNumber: values.videosNumber,
                  playDuration: values.playDuration,
                });
              }}
            />
          </Grid.Col>

          <Grid.Col size={8} px={20} py={60} border="10px solid lightGrey">
            <Grid.Container>
              <VideoPlayer
                error={error}
                component={Video}
                isLoading={isLoading}
                videos={videos}
                config={playbackConfig}
              />
            </Grid.Container>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </PageContainer>
  );
};

export default MainPage;
