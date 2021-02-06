import React from 'react';

import { Video as VideoType } from 'src/api/pexels';
import { Spinner } from 'src/components';

import { PlayerContainer, VideoContainer, Video } from './components';

export interface PlaybackConfig {
  videosNumber: number;
  playDuration: number;
}

interface Props {
  isLoading?: boolean;
  videos?: any[];
  config: PlaybackConfig;
}

interface State {
  videos?: VideoType[];
  currentVideo: number;
  config: PlaybackConfig;
}

class VideoPlayer extends React.Component<Props, State> {
  private videoRef: React.RefObject<HTMLVideoElement>;

  constructor(props: Props) {
    super(props);

    this.state = {
      currentVideo: 0,
      config: props.config,
      videos: props.videos,
    };

    this.videoRef = React.createRef();

    this.setCurrentVideoCaption = this.setCurrentVideoCaption.bind(this);
    this.prepareNextVideo = this.prepareNextVideo.bind(this);
  }

  componentDidUpdate(prevProps: Props): void {
    // @TODO add proper props comparison
    if (this.props.videos !== prevProps.videos) {
      this.setState({
        currentVideo: 0, // To start from first video
        videos: this.props.videos,
        config: this.props.config,
      });
    }
  }

  setCurrentVideoCaption(): void {
    const { videos, currentVideo } = this.state;

    if (videos && this.videoRef.current) {
      const track = this.videoRef.current.addTextTrack('captions', 'English', 'en');

      track.mode = 'showing';
      track.addCue(new VTTCue(0, videos[currentVideo].duration, videos[currentVideo].user.name));
    }
  }

  prepareNextVideo(): void {
    const { config, videos, currentVideo } = this.state;

    if (videos) {
      const nextVideo = this.state.currentVideo + 1;
      const totalVideos = videos.length < config.videosNumber ? videos.length : config.videosNumber;

      if (videos[currentVideo].duration < config.playDuration) {
        this.videoRef.current?.addEventListener('ended', () => {
          this.setState({
            currentVideo: nextVideo % totalVideos,
          });
        });
      } else {
        this.videoRef.current?.addEventListener('timeupdate', (e: any) => {
          if (e.target.currentTime >= config.playDuration) {
            this.setState({
              currentVideo: nextVideo % totalVideos,
            });
          }
        });
      }
    }
  }

  renderVideo(): JSX.Element {
    const { videos, currentVideo } = this.state;

    if (!videos) {
      return <div>Try searching for videos.</div>;
    } else if (videos.length === 0) {
      return <div>Sorry, but no videos where found.</div>;
    }

    return (
      <Video
        ref={this.videoRef}
        data={videos[currentVideo]}
        handleCanPlay={() => {
          this.setCurrentVideoCaption();
          this.prepareNextVideo();
        }}
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
