import React from 'react';

import { Video as VideoType } from 'src/api/pexels';

import { Video } from './components';

export interface PlaybackConfig {
  videosNumber: number;
  playDuration: number;
}

interface Props {
  isLoading?: boolean;
  videos: any[];
  config: PlaybackConfig;
}

interface State {
  videos: VideoType[];
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
    if (this.videoRef.current) {
      const { videos, currentVideo } = this.state;
      const track = this.videoRef.current.addTextTrack('captions', 'English', 'en');

      track.mode = 'showing';
      track.addCue(new VTTCue(0, videos[currentVideo].duration, videos[currentVideo].user.name));
    }
  }

  prepareNextVideo(): void {
    const { config, videos, currentVideo } = this.state;

    const nextVideo = this.state.currentVideo + 1;
    const totalVideos = videos.length < config.videosNumber ? videos.length : config.videosNumber;
    const playDuration =
      videos[currentVideo].duration < config.playDuration
        ? videos[currentVideo].duration
        : config.playDuration;

    setTimeout(() => {
      // To stop current video buffering
      if (this.videoRef.current) {
        this.videoRef.current.src = '';
        this.videoRef.current.pause();
      }

      this.setState({
        currentVideo: nextVideo % totalVideos,
      });
    }, playDuration * 1000);
  }

  render(): JSX.Element {
    const { videos, currentVideo } = this.state;
    const { isLoading } = this.props;

    return videos?.length > 0 ? (
      <div>
        <Video
          ref={this.videoRef}
          data={videos[currentVideo]}
          handleCanPlay={() => {
            this.setCurrentVideoCaption();
            this.prepareNextVideo();
          }}
        />
      </div>
    ) : (
      <div>{isLoading ? 'Fetching videos...' : 'Missing video data'}</div>
    );
  }
}

export default VideoPlayer;
