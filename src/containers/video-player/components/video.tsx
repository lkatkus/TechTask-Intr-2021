import React from 'react';
import styled from 'styled-components';

import { Video as VideoType } from 'src/api/pexels';

const StyledVideo = styled.video`
  object-fit: cover;
  width: 100%;
  height: auto;
`;

interface Props {
  data: VideoType;
  handleCanPlay: () => void;
}

const Video = React.forwardRef<HTMLVideoElement, Props>(({ data, handleCanPlay }, ref: any) => {
  const videoFile = data?.video_files[0];

  React.useEffect(() => {
    const currentRef = ref.current;

    // Cleanup to stop buffering unmounted videos
    return () => {
      currentRef.src = '';
      currentRef.pause();
    };
  });

  return (
    <StyledVideo
      ref={ref}
      data-testid={data.id}
      key={`${data.id}-${Date.now()}`} // To force rerender if playing only one video
      muted
      autoPlay
      poster={data.image}
      onCanPlayThrough={handleCanPlay}
    >
      <source
        data-testid={`${videoFile.id}-source`}
        src={videoFile.link}
        type={videoFile.file_type}
      />
      Sorry, your browser doesn&apos;t support embedded videos.
    </StyledVideo>
  );
});

Video.displayName = 'Video';

export default Video;
