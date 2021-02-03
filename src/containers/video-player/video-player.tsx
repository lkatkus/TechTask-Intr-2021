import React, { useEffect, useState } from 'react';

import { Video } from './components';

interface Props {
  isLoading: boolean;
  videos: any;
}

const VideoPlayer: React.FC<Props> = ({ isLoading, videos }) => {
  const [videoQue, setVideoQue] = useState([]);
  const [currentVideo, setCurrentVideo] = useState();

  useEffect(() => {
    if (videos) {
      setVideoQue(videos);
    }
  }, [videos]);

  useEffect(() => {
    if (videoQue.length > 0) {
      setCurrentVideo(videoQue[0]);

      const timer = setTimeout(() => {
        setCurrentVideo(videoQue[1]);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [videoQue]);

  return currentVideo ? (
    <div>
      <Video data={currentVideo} />
    </div>
  ) : (
    <div>
      <div>{isLoading ? 'Fetching videos...' : 'Missing video data'}</div>
    </div>
  );
};

export default VideoPlayer;
