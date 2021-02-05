import React, { useEffect, useRef, useReducer, useState } from 'react';

import { Video as VideoType } from 'src/api/pexels';

interface Props {
  data: VideoType;
  handleCanPlay: () => void;
}

const Video: React.FC<Props> = ({ data, handleCanPlay }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoData, setVideoData] = useState<VideoType>();

  useEffect(() => {
    if (data && !videoData) {
      setVideoData(data);
    } else if (videoData && data.id !== videoData.id) {
      setVideoData(data);
    }
  }, [data, videoData]);

  useEffect(() => {
    if (videoRef.current) {
      const track = videoRef.current.addTextTrack('captions', 'English', 'en');

      track.mode = 'showing';
      track.addCue(new VTTCue(0, data.duration, data.user.name));
    }
  }, [videoRef, data]);

  return videoData ? (
    <video
      ref={videoRef}
      key={videoData.id}
      muted
      autoPlay
      width="320"
      height="240"
      style={{ objectFit: 'cover' }}
      poster={videoData.video_pictures[0].picture}
      onCanPlay={handleCanPlay}
    >
      <source src={videoData.video_files[0].link} type={videoData.video_files[0].file_type} />
      Sorry, your browser doesn&apos;t support embedded videos.
    </video>
  ) : null;
};

export default Video;
