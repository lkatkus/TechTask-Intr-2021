import React from 'react';

import { Box } from 'src/core';
import { PageContainer } from 'src/containers';
import { Form, Field, Input, VideoPlayer } from 'src/components';

const MainPage: React.FC = () => {
  return (
    <PageContainer title="Video App">
      <Box display="flex">
        <Box width="50%">
          <Form handleSubmit={() => null}>
            {() => (
              <React.Fragment>
                <Field label="Video input" name="searchTitle" component={Input.Text} />
                <Field
                  label="Number of videos to play"
                  name="videosNumber"
                  component={Input.Text}
                />
                <Field
                  label="Each video plays for up to"
                  name="playDuration"
                  component={Input.Text}
                />
              </React.Fragment>
            )}
          </Form>
        </Box>
        <Box width="50%">
          <VideoPlayer />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default MainPage;
