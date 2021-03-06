import React from 'react';
import styled from 'styled-components';

import { Video as VideoType } from 'src/api/pexels';

const StyledVideo = styled.video`
  object-fit: cover;
  width: 640px;
  height: 360px;
`;

interface Props {
  data: VideoType;
  maxPlayTime: number;
  handlePlayNext: () => void;
}

const Video: React.FC<Props> = ({ data, maxPlayTime, handlePlayNext }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const currentRef = videoRef.current;

    // Prepare captions
    if (currentRef) {
      const track = currentRef.addTextTrack('captions', 'English', 'en');

      track.mode = 'showing';
      track.addCue(new VTTCue(0, data.duration, data.user.name));
    }

    // Cleanup to stop buffering unmounted videos
    return () => {
      if (currentRef) {
        currentRef.src = '';
        currentRef.pause();
      }
    };
  });

  return (
    <StyledVideo
      ref={videoRef}
      data-testid={data.id}
      key={`${data.id}-${Date.now()}`} // To force rerender if playing only one video
      muted
      autoPlay
      poster={data.image}
      onTimeUpdate={(e: any) => {
        if (e.target.currentTime >= maxPlayTime) {
          handlePlayNext();
        }
      }}
      onEnded={() => {
        handlePlayNext();
      }}
    >
      {data.video_files.map(({ id, link, file_type }) => (
        <source key={id} data-testid={`${id}-source`} src={link} type={file_type} />
      ))}
      Sorry, your browser doesn&apos;t support embedded videos.
    </StyledVideo>
  );
};

export default Video;
