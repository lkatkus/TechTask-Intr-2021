import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import VideoPlayer from './video-player';

const VIDEO_DATA_MOCK = [
  {
    id: 'root.id',
    width: 'root.width',
    height: 'root.height',
    url: 'root.url',
    image: 'root.image',
    duration: 'root.duration',
    user: {
      id: 'user.id',
      name: 'user.name',
      url: 'user.url',
    },
    video_files: [
      {
        id: 'video_files.0.id',
        quality: 'video_files.0.quality',
        file_type: 'video_files.0.file_type',
        width: 'video_files.0.width',
        height: 'video_files.0.height',
        link: 'video_files.0.link',
      },
    ],
    video_pictures: [
      {
        id: 'video_pictures.0.id',
        picture: 'video_pictures.0.picture',
        nr: 'video_pictures.0.nr',
      },
    ],
  },
];

describe('VideoPlayer', () => {
  it('shows loading indicator if isLoading provided', async () => {
    const { getByText } = render(
      <VideoPlayer isLoading config={{ videosNumber: 1, playDuration: 10 }} />,
    );

    const RenderedComponent = getByText('Try searching for videos.');

    expect(RenderedComponent).toBeDefined();
  });

  it('shows a message if no videos are provided', async () => {
    const { getByText } = render(
      <VideoPlayer videos={[]} config={{ videosNumber: 1, playDuration: 10 }} />,
    );

    const RenderedComponent = getByText('Sorry, but no videos where found.');

    expect(RenderedComponent).toBeDefined();
  });

  it('creates a video component, if data is provided', async () => {
    const { getByTestId } = render(
      <VideoPlayer videos={VIDEO_DATA_MOCK} config={{ videosNumber: 1, playDuration: 5 }} />,
    );

    const VideoComponent = getByTestId('root.id');
    const SourceComponent = getByTestId('video_files.0.id-source');

    expect(VideoComponent).toBeDefined();
    expect(VideoComponent).toHaveAttribute('poster', 'root.image');
    expect(SourceComponent).toBeDefined();
    expect(SourceComponent).toHaveAttribute('src', 'video_files.0.link');
    expect(SourceComponent).toHaveAttribute('type', 'video_files.0.file_type');
  });
});
