import React from 'react';

import { Video as VideoType } from 'src/api/pexels';
import { Spinner } from 'src/components';

import { PlayerContainer, VideoContainer } from './components';

export interface VideoPlayerConfig {
  videosNumber: number;
  playDuration: number;
}

interface Props {
  isLoading?: boolean;
  videos?: any[];
  config: VideoPlayerConfig;
  component: any;
}

interface State {
  videos?: VideoType[];
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

    // @TODO add binding decorator
    this.playNextVideo = this.playNextVideo.bind(this);
  }

  componentDidUpdate(prevProps: Props): void {
    if (this.props.videos !== prevProps.videos) {
      this.setState({
        currentVideo: 0, // To start from first video
        videos: this.props.videos,
        config: this.props.config,
      });
    } else if (this.props.config !== this.state.config) {
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
    const { component: Video } = this.props;

    if (!videos) {
      return <div>Try searching for videos.</div>;
    } else if (videos.length === 0) {
      return <div>Sorry, but no videos where found.</div>;
    }

    return (
      <Video
        maxPlayTime={config.playDuration}
        data={videos[currentVideo]}
        handlePlayNext={this.playNextVideo}
      />
    );
  }

  render(): JSX.Element {
    const { isLoading } = this.props;

    return (
      <PlayerContainer>
        <Spinner isLoading={isLoading} />
        <VideoContainer>{this.renderVideo()}</VideoContainer>
      </PlayerContainer>
    );
  }
}

export default VideoPlayer;
