import React from 'react';
import { equals } from 'ramda';

import { Video } from 'src/api/pexels';
import { Text } from 'src/core';
import { Spinner } from 'src/components';

import { PlayerContainer, VideoContainer } from './components';

export interface VideoPlayerConfig {
  videosNumber: number;
  playDuration: number;
}

interface Props {
  isLoading?: boolean;
  error?: string;
  videos?: Video[];
  config: VideoPlayerConfig;
  component: any;
}

interface State {
  videos?: Video[];
  currentVideo: number;
  config: VideoPlayerConfig;
}

class VideoPlayer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      currentVideo: 0,
      config: props.config,
      videos: props.videos,
    };

    this.playNextVideo = this.playNextVideo.bind(this);
  }

  componentDidUpdate(prevProps: Props): void {
    if (!equals(this.props.videos, prevProps.videos)) {
      this.setState({
        currentVideo: 0, // To start from first video
        videos: this.props.videos,
        config: this.props.config,
      });
    } else if (!equals(this.props.config, prevProps.config)) {
      this.setState({
        currentVideo: 0, // To start from first video
        config: this.props.config,
      });
    }
  }

  playNextVideo(): void {
    const { config, videos } = this.state;

    if (videos) {
      const nextVideo = this.state.currentVideo + 1;
      const totalVideos = videos.length < config.videosNumber ? videos.length : config.videosNumber;

      this.setState({
        currentVideo: nextVideo % totalVideos,
      });
    }
  }

  renderVideo(): JSX.Element {
    const { videos, currentVideo, config } = this.state;
    const { error, component: Video } = this.props;

    if (error) {
      return <Text.Body>{error}</Text.Body>;
    } else if (!videos) {
      return <Text.Body>Try searching for videos.</Text.Body>;
    } else if (videos.length === 0) {
      return <Text.Body>Sorry, but no videos where found.</Text.Body>;
    }

    return (
      <VideoContainer>
        <Video
          maxPlayTime={config.playDuration}
          data={videos[currentVideo]}
          handlePlayNext={this.playNextVideo}
        />
      </VideoContainer>
    );
  }

  render(): JSX.Element {
    const { isLoading } = this.props;

    return (
      <PlayerContainer>
        <Spinner isLoading={isLoading} />
        {this.renderVideo()}
      </PlayerContainer>
    );
  }
}

export default VideoPlayer;
