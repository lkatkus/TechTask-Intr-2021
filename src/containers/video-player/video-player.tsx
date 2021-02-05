import React, { useEffect, useState } from 'react';

import { Video as VideoType } from 'src/api/pexels';

import { Video } from './components';

export interface PlaybackConfig {
  videosNumber: number;
  playDuration: number;
}

interface Props {
  playbackConfig: PlaybackConfig;
  isLoading: boolean;
  videos?: VideoType[];
}

const VideoPlayer: React.FC<Props> = ({ isLoading, playbackConfig, videos }) => {
  const [nextVideo, setNextVideo] = useState<number>(0);
  const [videoQue, setVideoQue] = useState<VideoType[]>([]);
  const [currentVideo, setCurrentVideo] = useState<VideoType>();

  useEffect(() => {
    if (videoQue.length > 0) {
      const totalVideos =
        videoQue.length < playbackConfig.videosNumber
          ? videoQue.length
          : playbackConfig.videosNumber;

      const next = videoQue[nextVideo % totalVideos];

      setCurrentVideo(next);
    }
  }, [videoQue, nextVideo, playbackConfig]);

  useEffect(() => {
    if (videos) {
      setVideoQue(videos);
    }
  }, [videos]);

  return (
    <div>
      {currentVideo && !isLoading ? (
        <div>
          <Video
            data={currentVideo}
            handleCanPlay={() => {
              const playDuration =
                currentVideo.duration < playbackConfig.playDuration
                  ? currentVideo.duration
                  : playbackConfig.playDuration;

              setTimeout(() => {
                setNextVideo(nextVideo + 1);
              }, playDuration * 1000);
            }}
          />
        </div>
      ) : (
        <div>
          <div>{isLoading ? 'Fetching videos...' : 'Missing video data'}</div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
