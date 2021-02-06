import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid } from 'src/components';
import { PageContainer, VideoPlayer, PlaybackConfig } from 'src/containers';
import { actions as VideosActions } from 'src/redux/videos';

import { SearchForm } from './search-form';

const DEFAULT_CONFIG = {
  videosNumber: 10,
  playDuration: 20,
};

const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, data: videos, searchParams } = useSelector((state: any) => state.videos);
  const [playbackConfig, setPlaybackConfig] = useState<PlaybackConfig>(DEFAULT_CONFIG);

  return (
    <PageContainer title="Video App">
      <Grid.Container>
        <Grid.Row>
          <Grid.Col size={4} px={10}>
            <SearchForm
              searchResults={searchParams}
              playbackConfig={playbackConfig}
              handleNewSearch={(values) => {
                setPlaybackConfig({
                  videosNumber: values.videosNumber,
                  playDuration: values.playDuration,
                });

                dispatch(VideosActions.getVideos(values));
              }}
            />
          </Grid.Col>

          <Grid.Col size={8} px={10}>
            <VideoPlayer isLoading={isLoading} videos={videos?.videos} config={playbackConfig} />
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </PageContainer>
  );
};

export default MainPage;
