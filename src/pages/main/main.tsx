import React, { useState } from 'react';

import { Box } from 'src/core';
import { PageContainer, VideoPlayer } from 'src/containers';
import { Form, Field, Input } from 'src/components';

const VIDEO_NUMBER_OPTIONS = Array(10)
  .fill(undefined)
  .map((_, index) => ({
    value: index + 1,
    label: String(index + 1),
  }));

const PLAY_DURATION_OPTIONS = [
  { value: 10, label: '10s' },
  { value: 20, label: '20s' },
  { value: 30, label: '30s' },
];

interface FormValues {
  searchTitle: string;
  videosNumber: string;
  playDuration: string;
}

const MainPage: React.FC = () => {
  const [videoQuery, setVideoQuery] = useState<FormValues>();

  return (
    <PageContainer title="Video App">
      <Box display="flex">
        <Box width="50%">
          <Form<FormValues>
            initialValues={{ searchTitle: '', videosNumber: '', playDuration: '' }}
            handleSubmit={(values) => {
              setVideoQuery(values);
            }}
          >
            {() => (
              <React.Fragment>
                <Field label="Video input" name="searchTitle" component={Input.Text} />
                <Field
                  label="Number of videos to play"
                  name="videosNumber"
                  component={Input.Dropdown}
                  options={VIDEO_NUMBER_OPTIONS}
                />
                <Field
                  label="Each video plays for up to"
                  name="playDuration"
                  component={Input.Dropdown}
                  options={PLAY_DURATION_OPTIONS}
                />
                {/* @TODO update to autosubmit */}
                <button type="submit">Search</button>
              </React.Fragment>
            )}
          </Form>
        </Box>
        <Box width="50%">
          <VideoPlayer />
        </Box>
      </Box>

      <div>{JSON.stringify(videoQuery)}</div>
    </PageContainer>
  );
};

export default MainPage;
