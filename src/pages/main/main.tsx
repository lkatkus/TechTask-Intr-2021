import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actions as VideosActions } from 'src/redux/videos';
import { Form, Field, Grid, Input } from 'src/components';
import { PageContainer, VideoPlayer } from 'src/containers';
import { useDebounce } from 'src/hooks';

const VIDEO_NUMBER_OPTIONS = Array(10)
  .fill(undefined)
  .map((_, index) => ({
    value: index + 1,
    label: String(index + 1),
  }));

const PLAY_DURATION_OPTIONS = [
  // @TODO remove 2, 5 when finished
  { value: 2, label: '2s' },
  { value: 5, label: '5s' },
  { value: 10, label: '10s' },
  { value: 20, label: '20s' },
  { value: 30, label: '30s' },
];

interface FormValues {
  searchTitle: string;
  videosNumber: number;
  playDuration: number;
}

const DEFAULT_CONFIG = {
  videosNumber: 10,
  playDuration: 5,
};

const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, data: videos } = useSelector((state: any) => state.videos);

  return (
    <PageContainer title="Video App">
      <Grid.Container>
        <Grid.Row>
          <Grid.Col size={4} px={10}>
            <Form<FormValues>
              initialValues={{ searchTitle: '', ...DEFAULT_CONFIG }}
              handleSubmit={(values) => {
                dispatch(VideosActions.getVideos(values));
              }}
            >
              {() => (
                <Grid.Container>
                  <Grid.Row mb={10}>
                    <Grid.Col>
                      <Field label="Video input" name="searchTitle" component={Input.Text} />
                    </Grid.Col>
                  </Grid.Row>
                  <Grid.Row mb={10}>
                    <Grid.Col>
                      <Field
                        label="Number of videos to play"
                        name="videosNumber"
                        component={Input.Dropdown}
                        options={VIDEO_NUMBER_OPTIONS}
                      />
                    </Grid.Col>
                  </Grid.Row>
                  <Grid.Row mb={10}>
                    <Grid.Col>
                      <Field
                        label="Each video plays for up to"
                        name="playDuration"
                        component={Input.Dropdown}
                        options={PLAY_DURATION_OPTIONS}
                      />
                    </Grid.Col>
                  </Grid.Row>
                  <Grid.Row>
                    {/* @TODO update to autosubmit */}
                    <button type="submit">Search</button>
                  </Grid.Row>
                </Grid.Container>
              )}
            </Form>
          </Grid.Col>

          <Grid.Col size={8} px={10}>
            <VideoPlayer isLoading={isLoading} videos={videos.videos} config={DEFAULT_CONFIG} />
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </PageContainer>
  );
};

export default MainPage;
