import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import VideoPlayer from './video-player';

const PLAYER_CONFIG = {
  videosNumber: 2,
  playDuration: 10,
};

const VIDEO_DATA_MOCK = [
  {
    id: 'root.id-video-1',
    width: 'root.width-video-1',
    height: 'root.height-video-1',
    url: 'root.url-video-1',
    image: 'root.image-video-1',
    duration: 'root.duration-video-1',
    user: {
      id: 'user.id-video-1',
      name: 'user.name-video-1',
      url: 'user.url-video-1',
    },
    video_files: [
      {
        id: 'video_files.0.id-video-1',
        quality: 'video_files.0.quality-video-1',
        file_type: 'video_files.0.file_type-video-1',
        width: 'video_files.0.width-video-1',
        height: 'video_files.0.height-video-1',
        link: 'video_files.0.link-video-1',
      },
    ],
    video_pictures: [
      {
        id: 'video_pictures.0.id-video-1',
        picture: 'video_pictures.0.picture-video-1',
        nr: 'video_pictures.0.nr-video-1',
      },
    ],
  },
  {
    id: 'root.id-video-2',
    width: 'root.width-video-2',
    height: 'root.height-video-2',
    url: 'root.url-video-2',
    image: 'root.image-video-2',
    duration: 'root.duration-video-2',
    user: {
      id: 'user.id-video-2',
      name: 'user.name-video-2',
      url: 'user.url-video-2',
    },
    video_files: [
      {
        id: 'video_files.0.id-video-2',
        quality: 'video_files.0.quality-video-2',
        file_type: 'video_files.0.file_type-video-2',
        width: 'video_files.0.width-video-2',
        height: 'video_files.0.height-video-2',
        link: 'video_files.0.link-video-2',
      },
    ],
    video_pictures: [
      {
        id: 'video_pictures.0.id-video-2',
        picture: 'video_pictures.0.picture-video-2',
        nr: 'video_pictures.0.nr-video-2',
      },
    ],
  },
];

jest.spyOn(window.HTMLMediaElement.prototype, 'pause').mockImplementation(() => null);
jest
  .spyOn(window.HTMLMediaElement.prototype, 'addTextTrack')
  .mockImplementation(() => new TextTrack());

describe('VideoPlayer', () => {
  it('shows loading indicator if isLoading provided', () => {
    const { getByText } = render(
      <VideoPlayer component={() => <div>VideoComponent</div>} isLoading config={PLAYER_CONFIG} />,
    );

    const RenderedComponent = getByText('Try searching for videos.');

    expect(RenderedComponent).toBeDefined();
  });

  it('shows a message if no videos are provided', async () => {
    const { getByText } = render(
      <VideoPlayer
        component={() => <div>VideoComponent</div>}
        videos={[]}
        config={PLAYER_CONFIG}
      />,
    );

    const RenderedComponent = getByText('Sorry, but no videos where found.');

    expect(RenderedComponent).toBeDefined();
  });

  it('creates a video component, if data is provided', () => {
    const { getByTestId } = render(
      <VideoPlayer
        component={(props: any) => (
          <div data-testid={props.data.id} onClick={props.handlePlayNext}>
            {props.data.id}
          </div>
        )}
        videos={VIDEO_DATA_MOCK}
        config={PLAYER_CONFIG}
      />,
    );

    expect(getByTestId('root.id-video-1')).toBeInTheDocument();
  });

  it('cycles through provided videos, when they call handlePlayNext', () => {
    const { getByTestId } = render(
      <VideoPlayer
        component={(props: any) => (
          <div data-testid={props.data.id} onClick={props.handlePlayNext}>
            {props.data.id}
          </div>
        )}
        videos={VIDEO_DATA_MOCK}
        config={PLAYER_CONFIG}
      />,
    );

    expect(getByTestId('root.id-video-1')).toBeInTheDocument();

    // Should show second video
    userEvent.click(getByTestId('root.id-video-1'));
    expect(getByTestId('root.id-video-2')).toBeInTheDocument();

    // Should should first video again
    userEvent.click(getByTestId('root.id-video-2'));
    expect(getByTestId('root.id-video-1')).toBeInTheDocument();
  });
});
