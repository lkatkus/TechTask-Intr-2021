import React, { useEffect, useState } from 'react';

import { Video } from './components';

export interface PlaybackConfig {
  videosNumber: number;
  playDuration: number;
}

interface Props {
  playbackConfig: PlaybackConfig;
  isLoading: boolean;
  videos: any;
}

const VideoPlayer: React.FC<Props> = ({ isLoading, playbackConfig, videos }) => {
  const [videoQue, setVideoQue] = useState([]);
  const [videoNr, setVideoNr] = useState<number>(0);
  const [currentVideo, setCurrentVideo] = useState<any | null>();
  const [config, setConfig] = useState<PlaybackConfig>(playbackConfig);

  useEffect(() => {
    if (playbackConfig) {
      setVideoNr(0);
      setCurrentVideo(null);
      setConfig(playbackConfig);
    }
  }, [playbackConfig]);

  useEffect(() => {
    if (videos) {
      setVideoQue(videos);
    }
  }, [videos]);

  useEffect(() => {
    if (videoQue.length > 0) {
      setCurrentVideo(videoQue[videoNr]);

      const videoDuration = (videoQue[videoNr] as any).duration;
      const nextVideoAfter =
        videoDuration < config.playDuration ? videoDuration : config.playDuration;

      const timer = setTimeout(() => {
        // @TODO fix issue when only 1 video is chosen
        const nextVideo = videoNr + 1 < config.videosNumber ? videoNr + 1 : 0;

        setVideoNr(nextVideo);
        setCurrentVideo(videoQue[nextVideo]);
      }, nextVideoAfter * 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [config, videoNr, videoQue]);

  return (
    <div>
      {currentVideo && !isLoading ? (
        <div>
          <Video data={currentVideo} />
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
